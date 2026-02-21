export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  publishedAt: string;
  publishedDateLabel: string;
  readingTime: string;
  tags: readonly string[];
  markdown: string;
};

type FrontMatter = {
  title?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  readingTime?: string;
  tags?: string;
};

function parseFrontMatter(raw: string): { frontMatter: FrontMatter; body: string } {
  const trimmed = raw.trimStart();

  if (!trimmed.startsWith("---\n")) {
    return { frontMatter: {}, body: raw.trim() };
  }

  const end = trimmed.indexOf("\n---\n", 4);

  if (end === -1) {
    return { frontMatter: {}, body: raw.trim() };
  }

  const block = trimmed.slice(4, end);
  const body = trimmed.slice(end + 5).trim();
  const frontMatter: FrontMatter = {};

  block.split("\n").forEach((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (!key) return;

    frontMatter[key as keyof FrontMatter] = value;
  });

  return { frontMatter, body };
}

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? "untitled.md";
  return filename.replace(/\.md$/, "");
}

function formatPublishedDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

const postFiles = import.meta.glob<string>("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts: readonly BlogPost[] = Object.entries(postFiles)
  .map(([path, raw]) => {
    const { frontMatter, body } = parseFrontMatter(raw);
    const slug = slugFromPath(path);
    const publishedAt = frontMatter.publishedAt ?? "1970-01-01";

    return {
      slug,
      title: frontMatter.title ?? slug,
      excerpt: frontMatter.excerpt ?? "",
      authorName: frontMatter.author ?? "Unknown",
      publishedAt,
      publishedDateLabel: formatPublishedDate(publishedAt),
      readingTime: frontMatter.readingTime ?? "5 min read",
      tags: (frontMatter.tags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      markdown: body,
    } satisfies BlogPost;
  })
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
