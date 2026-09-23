"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CountryFlag } from "@/components/CountryFlag";
import { countries, type Country } from "@/lib/data/countries";

interface CountrySelectProps {
  id?: string;
  value: Country | null;
  onChange: (country: Country) => void;
  placeholder?: string;
  hasError?: boolean;
}

/** Searchable country combobox — type to filter, click or Enter to select. */
export function CountrySelect({ id, value, onChange, placeholder = "Search country…", hasError }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Reset the highlighted row whenever the query changes. Adjusted during
  // render (React's recommended pattern) rather than in an effect, which
  // avoids an extra cascading render.
  const [lastQuery, setLastQuery] = useState(query);
  if (query !== lastQuery) {
    setLastQuery(query);
    setHighlighted(0);
  }

  function selectCountry(country: Country) {
    onChange(country);
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const country = filtered[highlighted];
      if (country) selectCountry(country);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`flex w-full items-center gap-2 border bg-white px-4 py-3 transition-colors focus-within:border-stone-900 ${
          hasError ? "border-error" : "border-stone-300"
        }`}
      >
        {value && !open && <CountryFlag iso2={value.iso2} className="h-3.5 w-5 shrink-0 rounded-[1px]" />}
        <input
          id={id}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={id ? `${id}-listbox` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          value={open ? query : (value?.name ?? "")}
          placeholder={value ? undefined : placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full text-[15px] text-stone-900 outline-none placeholder:text-stone-400"
        />
      </div>

      {open && (
        <ul
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto border border-stone-300 bg-white shadow-[0_16px_40px_rgba(23,19,16,0.14)]"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-[14px] text-stone-500">No countries match &ldquo;{query}&rdquo;</li>
          )}
          {filtered.map((country, i) => (
            <li key={country.iso2} role="option" aria-selected={value?.iso2 === country.iso2}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectCountry(country)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] transition-colors ${
                  i === highlighted ? "bg-stone-100" : ""
                } ${value?.iso2 === country.iso2 ? "font-semibold text-ember" : "text-stone-800"}`}
              >
                <CountryFlag iso2={country.iso2} className="h-3.5 w-5 shrink-0 rounded-[1px]" />
                {country.name}
                <span className="ml-auto text-[12px] text-stone-400">+{country.dialCode}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
