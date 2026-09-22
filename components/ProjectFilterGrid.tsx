"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/lib/types";

export function ProjectFilterGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<ProjectCategory | "">("");

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects]
  );

  const filtered = useMemo(
    () => (category ? projects.filter((p) => p.category === category) : projects),
    [projects, category]
  );

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3">
        <FilterChip active={category === ""} onClick={() => setCategory("")}>
          All
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </FilterChip>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-5 py-2 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors ${
        active
          ? "border-stone-900 bg-stone-900 text-stone-50"
          : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
      }`}
    >
      {children}
    </button>
  );
}
