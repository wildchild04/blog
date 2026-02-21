import { Link, Stack, Typography } from "@wildchild/design-system";

export function AboutPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "840px", margin: "0 auto" }}>
      <Stack spacing={3}>
        <Typography variant="h3">About This Blog</Typography>
        <Typography variant="body1">
          This blog is powered by Jekyll for static publishing and React for application-level routing and rich page
          composition.
        </Typography>
        <Typography variant="body1">
          Post pages are sourced from markdown files in <code>src/content/posts</code>, then rendered with
          design-system composites.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link href="#/">Back to Home</Link>
          <Link href="https://github.com/wildchild04/Wildchild-Design-System">Design System Repo</Link>
        </Stack>
      </Stack>
    </div>
  );
}
