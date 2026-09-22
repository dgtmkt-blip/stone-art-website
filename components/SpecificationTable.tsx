import type { TechnicalDataRow } from "@/lib/types";

export function SpecificationTable({ rows }: { rows: TechnicalDataRow[] }) {
  return (
    <dl className="divide-y divide-stone-200 border-y border-stone-200">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-2 gap-4 py-4 text-[15px]">
          <dt className="text-stone-500">{row.label}</dt>
          <dd className="text-stone-900">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
