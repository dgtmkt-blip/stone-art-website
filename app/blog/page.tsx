import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Stone Veneer Guides and Ideas",
  description:
    "Plain-English guides to flexible stone veneer: how it works, how it compares with tiles and slab, and how to choose the right stone.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Stone veneer guides and ideas"
        description="Plain-English guides to flexible stone veneer: how it works, how it compares, and how to choose."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        tone="slate"
        image="/images/site/banners/about-why-stoneart.webp"
      />

      <section className="py-20 md:py-28">
        <Container wide>
          {posts.length === 0 ? (
            <p className="text-stone-500">Articles are on their way. Please check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="Talk to Stoneart"
        title="Questions about your project?"
        description="Tell us what you are building and our team will help you choose the right surface and request samples."
        tone="slate"
        actions={[
          { label: "Contact Us", href: "/contact", variant: "primary" },
          { label: "Browse Products", href: "/products", variant: "outline-light" },
        ]}
      />
    </>
  );
}
