import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { PostCard } from "@/components/PostCard";
import { ProductMedia } from "@/components/ProductMedia";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      siteName: "Stoneart",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const more = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      <section className="bg-stone-900 pb-6 pt-32 md:pt-36">
        <Container wide>
          <Breadcrumbs items={breadcrumbItems} dark />
        </Container>
      </section>

      <article>
        <header className="pb-10 pt-12 md:pb-14 md:pt-16">
          <Container wide className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ember">{post.category}</p>
            <h1 className="mt-3 font-display text-[clamp(32px,5vw,52px)] leading-[1.1] text-stone-900">
              {post.title}
            </h1>
            <p className="mt-5 text-[14px] text-stone-500">
              By Stoneart · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
              {post.updated && (
                <>
                  {" "}· Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                </>
              )}
            </p>
          </Container>
        </header>

        <Container wide>
          <ProductMedia
            src={post.image}
            tone="slate"
            alt={post.imageAlt}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="aspect-[16/9] rounded-[var(--radius-sm)] bg-stone-200 md:aspect-[21/9]"
          />
        </Container>

        <Container wide className="max-w-[720px] pb-20 pt-10 md:pb-28 md:pt-14">
          <Markdown source={post.body} />
        </Container>
      </article>

      {more.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-100 py-20">
          <Container wide>
            <h2 className="font-display text-[28px] text-stone-900">More guides</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        eyebrow="Talk to Stoneart"
        title="See the stone in person"
        description="Request samples or talk through your project with our team in Kolkata."
        tone="slate"
        actions={[
          { label: "Contact Us", href: "/contact", variant: "primary" },
          { label: "Browse Products", href: "/products", variant: "outline-light" },
        ]}
      />
    </>
  );
}
