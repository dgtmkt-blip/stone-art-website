"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CountryFlag } from "@/components/CountryFlag";
import { countries, type Country } from "@/lib/data/countries";

interface PhoneCountryPickerProps {
  value: Country | null;
  onChange: (country: Country) => void;
}

/**
 * Compact flag + dial-code dropdown for the Phone field. Independent of the
 * main Country field — it starts synced to it (see EnquiryForm), but once
 * someone picks a different code here, it stops following.
 */
export function PhoneCountryPicker({ value, onChange }: PhoneCountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q));
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

  function toggleOpen() {
    setOpen((v) => {
      const next = !v;
      if (next) {
        // Focus the search box once it exists in the DOM.
        requestAnimationFrame(() => searchRef.current?.focus());
      }
      return next;
    });
  }

  function select(country: Country) {
    onChange(country);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={value ? `Phone country code, currently ${value.name} +${value.dialCode}` : "Choose phone country code"}
        className="flex items-center gap-1.5 py-1 pr-1 text-[15px] text-stone-900"
      >
        {value ? (
          <>
            <CountryFlag iso2={value.iso2} className="h-3.5 w-5 shrink-0 rounded-[1px]" />
            <span>+{value.dialCode}</span>
          </>
        ) : (
          <span className="text-stone-400">Code</span>
        )}
        <span aria-hidden className="text-[9px] opacity-60">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 border border-stone-300 bg-white shadow-[0_16px_40px_rgba(23,19,16,0.14)]">
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country or code…"
            className="w-full border-b border-stone-200 px-3 py-2.5 text-[14px] text-stone-900 outline-none"
          />
          <ul role="listbox" className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-[14px] text-stone-500">No matches</li>
            )}
            {filtered.map((c) => (
              <li key={c.iso2} role="option" aria-selected={value?.iso2 === c.iso2}>
                <button
                  type="button"
                  onClick={() => select(c)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-[14px] transition-colors hover:bg-stone-100 ${
                    value?.iso2 === c.iso2 ? "font-semibold text-ember" : "text-stone-800"
                  }`}
                >
                  <CountryFlag iso2={c.iso2} className="h-3.5 w-5 shrink-0 rounded-[1px]" />
                  {c.name}
                  <span className="ml-auto text-[12px] text-stone-400">+{c.dialCode}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
