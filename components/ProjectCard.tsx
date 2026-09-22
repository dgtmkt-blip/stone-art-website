import Link from "next/link";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-[var(--radius-sm)]">
        <StoneSwatch
          tone={project.coverTone}
          alt={`${project.title} project`}
          className={`${size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]"} transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.05]`}
        />
      </div>
      <div className="mt-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ember">
          {project.category}
        </p>
        <h3 className="mt-2 font-display text-[22px] text-stone-900">{project.title}</h3>
        {project.location && <p className="mt-1 text-[14px] text-stone-500">{project.location}</p>}
      </div>
    </Link>
  );
}
