"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { mainNav } from "@/lib/data/navigation";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const pathname = usePathname();

  // Close the mobile drawer on navigation. Adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") rather than
  // in an effect, which avoids an extra cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-400 ease-[var(--ease-editorial)] ${
        solid ? "bg-stone-50/97 py-3 shadow-[0_4px_24px_rgba(23,19,16,0.08)] backdrop-blur" : "bg-transparent py-6"
      }`}
    >
      <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 md:px-10">
        <Link href="/" className="shrink-0" aria-label="Stoneart — Home">
          <Logo variant={solid ? "color" : "white"} className="h-9 md:h-11" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors ${
                  solid ? "text-stone-700 hover:text-ember" : "text-stone-50/90 hover:text-stone-50"
                }`}
              >
                {item.label}
                {item.children && (
                  <span aria-hidden className="text-[10px] opacity-60">▾</span>
                )}
              </Link>

              {item.children && (
                <div
                  className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-250 ease-[var(--ease-editorial)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                >
                  <div className="rounded-[var(--radius-sm)] border border-stone-200 bg-stone-50 p-3 shadow-[0_16px_40px_rgba(23,19,16,0.14)]">
                    {item.children.map((child) => (
                      <div key={child.label}>
                        <Link
                          href={child.href}
                          className="block rounded-[var(--radius-xs)] px-4 py-2.5 text-[14px] font-medium text-stone-800 transition-colors hover:bg-stone-100 hover:text-ember"
                        >
                          {child.label}
                          {child.description && (
                            <span className="mt-0.5 block text-[12px] font-normal text-stone-500">
                              {child.description}
                            </span>
                          )}
                        </Link>
                        {child.children && (
                          <div className="ml-4 border-l border-stone-200 pl-3">
                            {child.children.map((grandchild) => (
                              <Link
                                key={grandchild.label}
                                href={grandchild.href}
                                className="block px-2 py-1.5 text-[13px] text-stone-600 hover:text-ember"
                              >
                                {grandchild.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-[1.5px] w-6 transition-all duration-300 ${solid ? "bg-stone-900" : "bg-stone-50"} ${
              mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 transition-all duration-300 ${solid ? "bg-stone-900" : "bg-stone-50"} ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 transition-all duration-300 ${solid ? "bg-stone-900" : "bg-stone-50"} ${
              mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-0 h-dvh bg-stone-50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24">
          {mainNav.map((item) => (
            <div key={item.label} className="border-b border-stone-200 py-2">
              <div className="flex items-center justify-between">
                <Link href={item.href} className="py-3 text-[17px] font-medium text-stone-900">
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-expanded={mobileGroup === item.label}
                    aria-label={`Toggle ${item.label} submenu`}
                    onClick={() => setMobileGroup((g) => (g === item.label ? null : item.label))}
                    className="p-3 text-stone-500"
                  >
                    <span className={`inline-block transition-transform ${mobileGroup === item.label ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </button>
                )}
              </div>
              {item.children && mobileGroup === item.label && (
                <div className="ml-2 flex flex-col gap-1 pb-3">
                  {item.children.map((child) => (
                    <div key={child.label}>
                      <Link href={child.href} className="block py-2 text-[15px] text-stone-700">
                        {child.label}
                      </Link>
                      {child.children && (
                        <div className="ml-3 border-l border-stone-200 pl-3">
                          {child.children.map((grandchild) => (
                            <Link
                              key={grandchild.label}
                              href={grandchild.href}
                              className="block py-1.5 text-[13px] text-stone-500"
                            >
                              {grandchild.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/booking"
            className="mt-8 inline-flex items-center justify-center bg-stone-900 px-7 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-50"
          >
            Book / Enquire
          </Link>
        </div>
      </div>
    </header>
  );
}
