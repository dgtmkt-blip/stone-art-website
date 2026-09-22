import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { ProjectCard } from "@/components/ProjectCard";
import { StoneSwatch } from "@/components/StoneSwatch";
import { getProjectBySlug, getRelatedProjects, projects } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <>
      <section className="relative overflow-hidden bg-stone-900 pb-16 pt-40 text-stone-50 md:pb-24 md:pt-48">
        <StoneSwatch tone={project.coverTone} alt="" className="absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-900/70 to-stone-900/90" />
        <Container wide className="relative">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember-light">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h1 className="max-w-2xl text-[clamp(34px,5vw,58px)] font-normal">{project.title}</h1>
          {project.location && <p className="mt-3 text-[15px] text-stone-300">{project.location}</p>}
          <div className="mt-8">
            <Breadcrumbs
              dark
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container wide className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-[24px] text-stone-900">Project Narrative</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-stone-600">{project.description}</p>
          </div>
          <div className="space-y-6 border-t border-stone-200 pt-8 text-[14px] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <p className="text-stone-500">Category</p>
              <p className="mt-0.5 text-stone-900">{project.category}</p>
            </div>
            {project.location && (
              <div>
                <p className="text-stone-500">Location</p>
                <p className="mt-0.5 text-stone-900">{project.location}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="text-stone-500">Year</p>
                <p className="mt-0.5 text-stone-900">{project.year}</p>
              </div>
            )}
            {project.architect && (
              <div>
                <p className="text-stone-500">Architect</p>
                <p className="mt-0.5 text-stone-900">{project.architect}</p>
              </div>
            )}
            <div>
              <p className="text-stone-500">Products Used</p>
              <p className="mt-0.5 text-stone-900">{project.productsUsed.join(", ")}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-stone-100 py-20">
        <Container wide>
          <h2 className="mb-8 font-display text-[24px] text-stone-900">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {project.gallery.map((img, i) => (
              <StoneSwatch
                key={i}
                tone={img.tone}
                alt={img.alt}
                className={`aspect-square rounded-[var(--radius-sm)] ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : ""}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <Container wide>
            <h2 className="mb-8 font-display text-[24px] text-stone-900">Related Projects</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        eyebrow="Start Your Project"
        title="Let's build something remarkable."
        tone={project.coverTone}
        actions={[
          { label: "Contact Us", href: "/contact" },
          { label: "Book / Enquire", href: "/booking", variant: "outline-light" },
        ]}
      />
    </>
  );
}
