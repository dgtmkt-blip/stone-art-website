import Link from "next/link";
import { ProductMedia } from "@/components/ProductMedia";
import { formatPostDate, type BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-[var(--radius-sm)]">
        <ProductMedia
          src={post.image}
          tone="slate"
          alt={post.imageAlt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] bg-stone-200 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
        />
      </div>
      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-ember">{post.category}</p>
      <h2 className="mt-2 font-display text-[23px] leading-snug text-stone-900">{post.title}</h2>
      <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-stone-600">{post.description}</p>
      <p className="mt-3 text-[13px] text-stone-500">
        {formatPostDate(post.date)} · {post.readingMinutes} min read
      </p>
    </Link>
  );
}
