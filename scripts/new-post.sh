#!/usr/bin/env bash
set -euo pipefail

POSTS_DIR="src/content/posts"

if [ "${1:-}" = "" ]; then
  echo "Usage: scripts/new-post.sh <slug> [title]"
  echo "Example: scripts/new-post.sh state-machines-in-ui \"State Machines in UI\""
  exit 1
fi

slug="$1"
shift || true

if [ "${1:-}" != "" ]; then
  title="$*"
else
  title="$(printf '%s' "$slug" | tr '-' ' ' | sed -E 's/(^|[[:space:]])([[:alpha:]])/\1\U\2/g')"
fi

if ! printf '%s' "$slug" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*$'; then
  echo "Error: slug must match ^[a-z0-9]+(-[a-z0-9]+)*$"
  exit 1
fi

mkdir -p "$POSTS_DIR"
file_path="$POSTS_DIR/$slug.md"

if [ -e "$file_path" ]; then
  echo "Error: post already exists: $file_path"
  exit 1
fi

published_at="$(date +%Y-%m-%d)"

cat > "$file_path" <<TEMPLATE
---
title: $title
excerpt: TODO
author: Wildchild
publishedAt: $published_at
readingTime: 5 min read
tags: TODO
---

## Summary

TODO

## Details

TODO
TEMPLATE

echo "Created $file_path"
