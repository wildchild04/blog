import {
  BlogListingPage,
  Button,
  Icon,
  Link,
  Stack,
  Typography,
  type BlogListingPageProps,
} from "@wildchild/design-system";
import { posts } from "../lib/posts";

type BlogHomePageProps = {
  mode: "light" | "dark";
  onToggleTheme: () => void;
};

const topNav = (
  <Stack direction="row" spacing={2}>
    <Link href="#/">Home</Link>
    <Link href="#/about">About</Link>
  </Stack>
);

export function BlogHomePage({ mode, onToggleTheme }: BlogHomePageProps) {
  const [featuredPost, ...rest] = posts;

  const pageProps: BlogListingPageProps = {
    appBarTitle: <Typography variant="body1">Wildchild Blog</Typography>,
    appBarNavigation: topNav,
    appBarActions: (
      <Button size="small" onClick={onToggleTheme}>
        <Icon name={mode === "light" ? "moon" : "sun"} size="small" />
      </Button>
    ),
    hero: (
      <Stack spacing={1}>
        <Typography variant="h3">Engineering Notes, Design Systems, and Product Craft</Typography>
        <Typography variant="body1">Markdown-driven posts with React page routing.</Typography>
      </Stack>
    ),
    featuredPost: featuredPost
      ? {
          title: featuredPost.title,
          excerpt: featuredPost.excerpt,
          href: `#/post/${featuredPost.slug}`,
          authorName: featuredPost.authorName,
          publishedDate: featuredPost.publishedDateLabel,
          readingTime: featuredPost.readingTime,
          tags: featuredPost.tags,
          variant: "featured",
        }
      : undefined,
    postsTitle: "Latest Posts",
    posts: rest.map((post) => ({
      id: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      href: `#/post/${post.slug}`,
      authorName: post.authorName,
      publishedDate: post.publishedDateLabel,
      readingTime: post.readingTime,
      tags: post.tags,
    })),
    searchSection: {
      title: "Search Archive",
      items: posts.map((post) => ({
        id: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        href: `#/post/${post.slug}`,
        tags: post.tags,
        publishedDate: post.publishedAt,
      })),
      showFilters: true,
    },
    pagination: {
      count: 1,
      page: 1,
    },
  };

  return <BlogListingPage {...pageProps} />;
}
