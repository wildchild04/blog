---
title: Jekyll + React without losing GitHub Pages simplicity
excerpt: Bundle once with Vite, commit no JS artifacts, and keep static hosting predictable via CI.
author: Wildchild
publishedAt: 2026-02-21
readingTime: 5 min read
tags: jekyll, react, vite
---

## Hybrid model

Jekyll owns static publishing while React owns dynamic composition and routing.

## Delivery

- Build React to `/assets/js/blog-app.js`
- Publish static output from `_site`
- Route client-side with `HashRouter`

## Why this works

You preserve the stability of static hosting while getting modern React ergonomics for UI and page composition.
