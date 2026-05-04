# Linqoria Landing Blueprint

## Conversion Flow

1. Immediate promise: Linqoria is positioned as event control, not generic planning software.
2. Proof band: budgets, roles, and entry operations answer the first trust objections.
3. Kinetic marquee: reinforces the operating verbs without adding another static feature grid.
4. Device story: scroll and hover swap real app screens so the product becomes the evidence.
5. Conversion spine: commitment, financial proof, and arrival are shown as compact decision moments with small product fragments.
6. Final CTA: every path resolves to the Google Play download button.

## Design System

Typography:
- Display: Instrument Serif for editorial scale, confidence, and contrast.
- UI/body: Inter for legible product copy and precise CTA rendering.
- No viewport-scaled body text. Display type uses clamp only for hero and major section heads.

Color:
- Ink `#101422` anchors authority.
- Paper `#fffdf7` and `#f7f5ef` keep the page warm without beige dominance.
- Gold `#f3b900` carries the Linqoria identity and CTA memory.
- Moss `#374b4f` and clay `#be5b34` are reserved accents for future image or detail expansion.

Spacing and shape:
- Page width: 1180px max with 18px mobile gutters.
- Radius: 8px for premium restraint.
- Cards use borders and shallow translucency rather than heavy SaaS shadows.

## Motion Guide

Easing:
- Primary curve: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Reveals: 700ms opacity plus 26px vertical travel.
- Screen swaps: 260ms fade with 420ms scale recovery.

Trigger logic:
- Navigation glass appears after 18px scroll.
- Narrative lines activate when they enter the central reading band.
- Device screen changes on story card hover, focus, click, and scroll visibility.
- Hero device parallax uses requestAnimationFrame and respects reduced motion.

## Stack Recommendation

Current implementation:
- Static HTML/CSS/JS for fast deployment and no build dependency.
- Native IntersectionObserver and requestAnimationFrame for 60fps-friendly behavior.

If migrating into a React app:
- Next.js or Vite + React for component structure.
- Framer Motion for section reveals and shared layout transitions.
- GSAP ScrollTrigger only for the pinned device sequence if the story becomes more complex.
- Image CDN with AVIF/WebP variants for screenshots and marketing art.

## Section Execution Notes

Hero:
- Keep one dominant claim, one product preview, and one Play Store CTA.
- The preview uses real app UI inside a physical phone frame to avoid generic mockups.

Marquee:
- Use duplicated text inside one flex track.
- Animate `transform` only; do not animate left or width.

Interactive device:
- Each `.story-card` owns a `data-screen` URL.
- The script swaps the pinned phone image based on hover/focus/click and scroll intersection.
- Add new features by adding a card and screenshot, not by changing JS.

Conversion spine:
- Use compact `.arc-step` rows instead of oversized screenshots.
- Pair each decision moment with one small phone crop and one metric chip.
- On mobile, the visual drops below the copy and remains intentionally small so the copy remains the persuasive center.

Scroll-highlight narrative:
- Each sentence is a `.line-highlight`.
- IntersectionObserver toggles `.active`, shifting color from quiet grey to ink.
