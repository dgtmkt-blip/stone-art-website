import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className={`flex flex-wrap items-center gap-2 ${dark ? "text-stone-300" : "text-stone-500"}`}>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-ember">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-stone-50" : "text-stone-900"}>
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
