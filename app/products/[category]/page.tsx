import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MaterialDisclaimer } from "@/components/MaterialDisclaimer";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { CATEGORY_META, getProductsByCategory } from "@/lib/data/products";
import type { ProductCategorySlug } from "@/lib/types";

function isCategory(value: string): value is ProductCategorySlug {
  return value === "natural-stone" || value === "poly-stone";
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata(props: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await props.params;
  if (!isCategory(category)) return {};
  const meta = CATEGORY_META[category];
  return { title: meta.label, description: meta.description };
}

export default async function ProductCategoryPage(props: PageProps<"/products/[category]">) {
  const { category } = await props.params;
  if (!isCategory(category)) notFound();

  const meta = CATEGORY_META[category];
  const products = getProductsByCategory(category);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={meta.label}
        description={meta.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: meta.label },
        ]}
        tone={meta.tone}
      />
      <section className="py-20 md:py-28">
        <Container wide>
          <ProductCatalogue products={products} />
          <MaterialDisclaimer className="mt-16 border-t border-stone-200 pt-8" />
        </Container>
      </section>
    </>
  );
}
