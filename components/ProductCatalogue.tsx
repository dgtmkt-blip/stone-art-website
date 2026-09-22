"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import type { Product } from "@/lib/types";

type SortKey = "name-asc" | "name-desc" | "code-asc";

function uniqueSorted(values: (string | undefined)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => Boolean(v)))).sort();
}

export function ProductCatalogue({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [colourFamily, setColourFamily] = useState("");
  const [finish, setFinish] = useState("");
  const [application, setApplication] = useState("");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters only ever show options that actually exist in this category's dataset.
  const colourFamilies = useMemo(() => uniqueSorted(products.map((p) => p.colourFamily)), [products]);
  const finishes = useMemo(() => uniqueSorted(products.map((p) => p.finish)), [products]);
  const applications = useMemo(
    () => uniqueSorted(products.flatMap((p) => p.applications)),
    [products]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.productCode, p.collection].some((f) => f.toLowerCase().includes(q));
      const matchesColour = !colourFamily || p.colourFamily === colourFamily;
      const matchesFinish = !finish || p.finish === finish;
      const matchesApplication = !application || p.applications.includes(application);
      return matchesQuery && matchesColour && matchesFinish && matchesApplication;
    });

    list = [...list].sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return a.productCode.localeCompare(b.productCode);
    });

    return list;
  }, [products, query, colourFamily, finish, application, sort]);

  const activeFilterCount = [colourFamily, finish, application].filter(Boolean).length;

  function resetFilters() {
    setColourFamily("");
    setFinish("");
    setApplication("");
  }

  const filterControls = (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label htmlFor="filter-colour" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
          Colour Family
        </label>
        <select
          id="filter-colour"
          value={colourFamily}
          onChange={(e) => setColourFamily(e.target.value)}
          className="w-full border border-stone-300 bg-transparent px-3 py-2.5 text-[14px] text-stone-900 focus:border-stone-900"
        >
          <option value="">All colours</option>
          {colourFamilies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-finish" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
          Finish
        </label>
        <select
          id="filter-finish"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
          className="w-full border border-stone-300 bg-transparent px-3 py-2.5 text-[14px] text-stone-900 focus:border-stone-900"
        >
          <option value="">All finishes</option>
          {finishes.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-application" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
          Application
        </label>
        <select
          id="filter-application"
          value={application}
          onChange={(e) => setApplication(e.target.value)}
          className="w-full border border-stone-300 bg-transparent px-3 py-2.5 text-[14px] text-stone-900 focus:border-stone-900"
        >
          <option value="">All applications</option>
          {applications.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-sort" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
          Sort By
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="w-full border border-stone-300 bg-transparent px-3 py-2.5 text-[14px] text-stone-900 focus:border-stone-900"
        >
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="code-asc">Product Code</option>
        </select>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-stone-200 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md flex-1">
          <label htmlFor="product-search" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Search
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, code or collection…"
            className="w-full border border-stone-300 bg-transparent px-3 py-2.5 text-[15px] text-stone-900 placeholder:text-stone-400 focus:border-stone-900"
          />
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex items-center gap-2 self-start border border-stone-400 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900 md:self-auto"
          aria-expanded={filtersOpen}
          aria-controls="product-filter-panel"
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {/* Desktop: inline panel. Mobile: collapsible drawer, same markup. */}
      <div
        id="product-filter-panel"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[var(--ease-editorial)] ${
          filtersOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100"
        }`}
      >
        <div className="py-8">
          {filterControls}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-[13px] font-medium text-ember hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="mb-8 mt-2 text-[14px] text-stone-500" role="status">
        {results.length} {results.length === 1 ? "product" : "products"}
      </p>

      <ProductGrid products={results} />
    </div>
  );
}
