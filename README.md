# ScrollStory

Scroll-driven product landing page for a fictional gaming mouse. 240 video frames rendered on canvas, synchronized to scroll position. Text sections fade in and out as you scroll. Cursor trail, specs comparison, testimonials, and CTA.

**Stack:** `Next.js 14 · TypeScript · Framer Motion · Canvas API · Tailwind CSS`

**Live:** https://scrollstory-bitcoineo.vercel.app

---

## Why I built this

I wanted to understand how Apple-style scroll animations work: pre-rendered frames played back through a canvas element driven by scroll progress, with text overlays timed to match. A pure design and animation exercise.

## Features

- **Frame-by-frame canvas animation** 240 JPEG frames preloaded and drawn to canvas as the user scrolls
- **Scroll-synced text** Sections fade in and out at specific scroll progress values via Framer Motion
- **Cursor trail** Custom cursor effect following mouse movement
- **Loading screen** Preloads all frames before revealing the page
- **Specs comparison** Interactive table comparing product tiers
- **Testimonials** Customer review section
- **Sticky nav** Navigation that persists across scroll sections

## Run Locally

    pnpm install
    pnpm dev

Open http://localhost:3000

## GitHub Topics

`nextjs` `typescript` `framer-motion` `canvas` `scroll-animation` `landing-page` `design` `tailwind`
