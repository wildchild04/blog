import { BlogPageComposition, Link, Stack, Typography, type BlogPageCompositionProps } from "@wildchild/design-system";
import { Navigate, useParams } from "react-router-dom";
import { getPostBySlug, posts } from "../lib/posts";

const topNav = (
  <Stack direction="row" spacing={2}>
    <Link href="#/">Home</Link>
    <Link href="#/about">About</Link>
  </Stack>
);

export function BlogPostPage() {
  const { slug } = useParams();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const currentPost = getPostBySlug(slug);

  if (!currentPost) {
    return <Navigate to="/" replace />;
  }

  const currentTags = new Set(currentPost.tags.map((tag) => tag.toLowerCase()));
  const candidates = posts.filter((post) => post.slug !== currentPost.slug);

  const relatedByTags = candidates
    .map((post) => {
      const overlap = post.tags.reduce((score, tag) => {
        return currentTags.has(tag.toLowerCase()) ? score + 1 : score;
      }, 0);

      return { post, overlap };
    })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.post);
  const relatedPosts = relatedByTags.slice(0, 2);

  const pageProps: BlogPageCompositionProps = {
    appBarTitle: <Typography variant="body1">Wildchild Blog</Typography>,
    appBarNavigation: topNav,
    header: {
      title: currentPost.title,
      authorName: currentPost.authorName,
      publishedDate: `Published ${currentPost.publishedDateLabel}`,
      readingTime: currentPost.readingTime,
      tags: currentPost.tags,
    },
    content: {
      markdown: currentPost.markdown,
      showTableOfContents: true,
    },
    relatedPosts:
      relatedPosts.length > 0
        ? {
            title: "Related",
            posts: relatedPosts.map((post) => ({
              id: post.slug,
              title: post.title,
              href: `#/post/${post.slug}`,
              excerpt: post.excerpt,
              authorName: post.authorName,
              publishedDate: post.publishedDateLabel,
              readingTime: post.readingTime,
              tags: post.tags,
            })),
          }
        : {
            title: "No related post available yet",
            posts: [],
          },
  };

  return <BlogPageComposition {...pageProps} />;
}
