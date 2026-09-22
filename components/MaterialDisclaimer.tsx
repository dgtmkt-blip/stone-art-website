import { siteSettings } from "@/lib/data/site-settings";

export function MaterialDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-stone-500 ${className}`}>
      {siteSettings.materialDisclaimer}
    </p>
  );
}
