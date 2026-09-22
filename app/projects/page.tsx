import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ProjectFilterGrid } from "@/components/ProjectFilterGrid";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A gallery of architectural projects specifying Stoneart natural stone and poly stone surfaces.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Projects"
        description="A selection of residential, hospitality, commercial, retail and furniture projects."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        tone="silver"
      />
      <section className="py-20 md:py-28">
        <Container wide>
          <ProjectFilterGrid projects={projects} />
        </Container>
      </section>
    </>
  );
}
