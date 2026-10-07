import fs from "node:fs";
import path from "node:path";

/**
 * Blog posts are plain Markdown files in content/blog/. Each starts with a
 * short block of settings between "---" lines (title, description, date,
 * category, image, imageAlt, optional updated). The file name is the web
 * address: content/blog/my-post.md becomes /blog/my-post.
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  /** Last substantial update, YYYY-MM-DD. */
  updated?: string;
  category: string;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  body: string;
}

const DIR = path.join(process.cwd(), "content", "blog");

function parsePost(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Blog post ${file} is missing its settings block`);

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  for (const key of ["title", "description", "date", "category", "image", "imageAlt"]) {
    if (!meta[key]) throw new Error(`Blog post ${file} is missing "${key}"`);
  }

  const body = match[2].trim();
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    description: meta.description,
    date: meta.date,
    updated: meta.updated,
    category: meta.category,
    image: meta.image,
    imageAlt: meta.imageAlt,
    readingMinutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 200)),
    body,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
