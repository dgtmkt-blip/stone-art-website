import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { MaterialDisclaimer } from "@/components/MaterialDisclaimer";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { SpecificationTable } from "@/components/SpecificationTable";
import { StoneSwatch } from "@/components/StoneSwatch";
import {
  CATEGORY_META,
  allProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/data/products";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import type { ProductCategorySlug } from "@/lib/types";

function isCategory(value: string): value is ProductCategorySlug {
  return value === "natural-stone" || value === "poly-stone";
}

export function generateStaticParams() {
  return allProducts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[category]/[slug]">
): Promise<Metadata> {
  const { category, slug } = await props.params;
  if (!isCategory(category)) return {};
  const product = getProductBySlug(category, slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.productCode})`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage(props: PageProps<"/products/[category]/[slug]">) {
  const { category, slug } = await props.params;
  if (!isCategory(category)) notFound();

  const product = getProductBySlug(category, slug);
  if (!product) notFound();

  const categoryMeta = CATEGORY_META[category];
  const related = getRelatedProducts(product);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: categoryMeta.label, href: `/products/${category}` },
    { label: product.name },
  ];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      <section className="bg-stone-50 pb-4 pt-32 md:pt-40">
        <Container wide>
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </section>

      <section className="py-10 md:py-16">
        <Container wide className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ember">
              {categoryMeta.label} · {product.collection}
            </p>
            <h1 className="mt-3 font-display text-[clamp(32px,4vw,46px)] text-stone-900">
              {product.name}
            </h1>
            <p className="mt-1 text-[14px] uppercase tracking-[0.08em] text-stone-500">
              {product.productCode}
            </p>
            <p className="mt-6 text-[16px] leading-relaxed text-stone-600">{product.description}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="#enquire">Enquire About This Product</Button>
              {product.downloads.find((d) => d.href) ? (
                <Button href={product.downloads.find((d) => d.href)!.href!} variant="secondary">
                  Download Technical Data
                </Button>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center justify-center border border-stone-200 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-400"
                  title="Technical data sheet not yet available"
                >
                  Technical Data Sheet — Coming Soon
                </span>
              )}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-y-4 border-t border-stone-200 pt-8 text-[14px]">
              <div>
                <dt className="text-stone-500">Colour Family</dt>
                <dd className="mt-0.5 text-stone-900">{product.colourFamily}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Finish</dt>
                <dd className="mt-0.5 text-stone-900">{product.finish}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Sheet Size</dt>
                <dd className="mt-0.5 text-stone-900">{product.sheetSizes.join(", ")}</dd>
              </div>
              {product.backing && (
                <div>
                  <dt className="text-stone-500">Backing</dt>
                  <dd className="mt-0.5 text-stone-900">{product.backing}</dd>
                </div>
              )}
            </dl>
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="border-t border-stone-200 py-20">
        <Container wide className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[26px] text-stone-900">Features</h2>
            <ul className="mt-6 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] text-stone-700">
                  <span aria-hidden className="mt-1 text-ember">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[26px] text-stone-900">Specification</h2>
            <div className="mt-6">
              <SpecificationTable rows={product.technicalData} />
            </div>
          </div>
        </Container>
      </section>

      {/* APPLICATIONS */}
      <section className="bg-stone-100 py-20">
        <Container wide>
          <h2 className="font-display text-[26px] text-stone-900">Applications</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {product.applications.map((application) => (
              <div key={application} className="relative overflow-hidden rounded-[var(--radius-sm)]">
                <StoneSwatch
                  tone={product.thumbnailTone}
                  alt={`${product.name} used for ${application}`}
                  className="aspect-square"
                />
                <span className="absolute bottom-3 left-3 text-[13px] font-medium text-stone-50 drop-shadow">
                  {application}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* DOWNLOADS */}
      <section className="py-20">
        <Container wide className="max-w-2xl">
          <h2 className="font-display text-[26px] text-stone-900">Downloads</h2>
          <ul className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
            {product.downloads.map((d) => (
              <li key={d.label} className="flex items-center justify-between py-4">
                <span className="text-[15px] text-stone-800">{d.label}</span>
                {d.href ? (
                  <a href={d.href} className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember hover:underline">
                    Download
                  </a>
                ) : (
                  <span className="text-[13px] uppercase tracking-[0.08em] text-stone-400">Coming Soon</span>
                )}
              </li>
            ))}
          </ul>
          <MaterialDisclaimer className="mt-8" />
        </Container>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="bg-stone-100 py-20">
          <Container wide>
            <h2 className="font-display text-[26px] text-stone-900">Related Surfaces</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </Container>
        </section>
      )}

      {/* ENQUIRY CTA */}
      <section id="enquire" className="scroll-mt-28 py-24">
        <Container wide className="max-w-xl">
          <h2 className="font-display text-[28px] text-stone-900">Interested in this surface?</h2>
          <p className="mt-3 text-[15px] text-stone-600">
            Send an enquiry and our team will get back to you with samples, pricing and lead times.
          </p>
          <div className="mt-8">
            <EnquiryForm
              variant="product"
              source={`product-enquiry:${product.productCode}`}
              product={{ name: product.name, productCode: product.productCode }}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
