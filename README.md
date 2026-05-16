# Hartwell SEO — Premium Dark Agency Template

A high-end, dark-themed agency website template built with **Next.js 16**, **React Three Fiber**, and **Framer Motion**. Designed for SEO consultancies, digital agencies, and creative studios that want to stand out with immersive 3D visuals and buttery-smooth animations.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=flat-square&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

[![Live Preview](https://img.shields.io/badge/Live_Preview-Visit_Site-C8A567?style=for-the-badge&logo=vercel&logoColor=white)](https://hartwell-seo-template.vercel.app/)

---

## Features

### 3D Visualizations
- **Interactive Globe** — Draggable 3D globe with world map, service city markers, animated connection arcs, and pulsing nodes
- **Architecture Tower** — Layered 3D tower representing technical SEO layers
- **Link Graph** — Network graph visualization showing link relationships
- **Metric Sphere** — Animated sphere for data/metrics display
- **Content Flow** — 3D content pipeline visualization
- **Envelope Scene** — Contact page 3D envelope animation
- **Particle Field** — Ambient floating particles background

### UI & Animation
- Page transition system with labeled route overlays
- Custom cursor with magnetic hover effects
- Scroll-triggered reveal animations
- Framer Motion page transitions via `template.tsx`
- Initial loader with progress counter
- Responsive fluid typography (clamp-based)
- Marquee scrolling bands
- Smooth scroll progress indicator

### Architecture
- **Next.js 16 App Router** with static generation
- **React 19** with latest features
- **SVG fallbacks** for every 3D scene (accessibility + performance)
- **`prefers-reduced-motion`** support throughout
- **Conditional 3D rendering** — detects device capability
- **Design token system** via CSS custom properties
- **Component-driven** — 50+ reusable components

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero with globe, service pillars, case showcase, testimonials |
| `/services` | Service offerings with 3D architecture & content flow scenes |
| `/about` | Team grid, timeline, company story |
| `/case-studies` | Portfolio with metric sphere visualization |
| `/engagements` | Engagement models and pricing plans |
| `/insights` | Blog/articles preview |
| `/contact` | Contact form with 3D envelope scene |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [React 19](https://react.dev) | UI library |
| [Three.js](https://threejs.org) | 3D graphics engine |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | React renderer for Three.js |
| [Drei](https://github.com/pmndrs/drei) | R3F helpers and abstractions |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |

---

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Mr-Mudassar/hartwell-seo.git
cd hartwell-seo/nextjs-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, providers, nav)
│   │   ├── template.tsx        # Page transition wrapper
│   │   ├── globals.css         # Design tokens & global styles
│   │   ├── page.tsx            # Home page
│   │   ├── about/
│   │   ├── case-studies/
│   │   ├── contact/
│   │   ├── engagements/
│   │   ├── insights/
│   │   └── services/
│   ├── components/
│   │   ├── layout/             # Nav, Footer, Loader, Transitions
│   │   ├── scenes/             # 3D Three.js scenes + SVG fallbacks
│   │   ├── sections/           # Page content sections
│   │   └── ui/                 # Reusable UI primitives
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Constants & utilities
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0E1014` | Primary background |
| `--color-text` | `#F2EFE9` | Primary text |
| `--color-gold` | `#C8A567` | Accent / brand color |
| `--color-border` | `#2A2F38` | Borders & dividers |
| `--color-muted` | `#6B7280` | Secondary text |

### Typography

| Font | Variable | Usage |
|------|----------|-------|
| Fraunces | `--font-display` | Headings & display text |
| Inter | `--font-sans` | Body text |
| JetBrains Mono | `--font-mono` | Code & technical elements |

---

## Customization

### Replacing Content

1. **Brand colors** — Edit CSS variables in `src/app/globals.css`
2. **Service cities on globe** — Edit `SERVICE_CITIES` array in `src/components/scenes/Globe.tsx`
3. **Navigation links** — Edit `src/components/layout/Nav.tsx`
4. **Page content** — Each page is a standalone file in `src/app/`
5. **Fonts** — Swap Google Fonts in `src/app/layout.tsx`

### Adding a New Page

```bash
# Create the route
mkdir src/app/your-page
touch src/app/your-page/page.tsx
```

Add the route label in `src/lib/constants.ts` for the page transition overlay.

### Disabling 3D

Each 3D scene has an SVG fallback. The `useShouldRender3D` hook automatically falls back on low-end devices. To disable 3D globally, modify the hook in `src/hooks/useShouldRender3D.ts`.

---

## Performance

- **Static generation** — All pages pre-rendered at build time
- **Conditional 3D** — Three.js only loads on capable devices
- **SVG fallbacks** — Lightweight alternatives for every scene
- **Font optimization** — `next/font` with display swap
- **Code splitting** — Dynamic imports for heavy 3D components
- **Reduced motion** — Respects system accessibility preferences

---

## Contributing

Contributions are welcome! Whether it's bug fixes, new features, performance improvements, or documentation.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Ideas

- Additional 3D scene components
- More page templates (blog post, pricing, landing)
- Internationalization (i18n) support
- Dark/light theme toggle
- CMS integration (Sanity, Contentful, etc.)
- E2E tests with Playwright
- Storybook for component documentation
- Docker configuration
- CI/CD pipeline templates

### Code Style

- TypeScript strict mode
- ESLint with Next.js recommended rules
- Functional components with hooks
- CSS custom properties for theming

---

## Deployment

Deploy instantly to any platform that supports Next.js:

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mr-Mudassar/hartwell-seo)

### Other Platforms

- **Netlify** — Supports Next.js with `@netlify/plugin-nextjs`
- **AWS Amplify** — Full Next.js support
- **Docker** — Use the official [Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | Full |
| Firefox 90+ | Full |
| Safari 15+ | Full |
| Edge 90+ | Full |
| Mobile Safari | Full (3D conditional) |
| Chrome Android | Full (3D conditional) |

---

## Author

**Muhammad Mudassar**

- GitHub: [@Mr-Mudassar](https://github.com/Mr-Mudassar)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- [Three.js](https://threejs.org) — 3D graphics
- [Poimandres](https://github.com/pmndrs) — React Three Fiber & Drei
- [Vercel](https://vercel.com) — Next.js framework
- [Framer](https://www.framer.com) — Motion library

---

## Keywords

`nextjs template`, `react three fiber`, `3d website template`, `dark theme website`, `agency template`, `seo agency website`, `next.js 16`, `react 19`, `three.js website`, `framer motion`, `animated website template`, `premium website template`, `dark mode template`, `interactive 3d globe`, `typescript template`, `tailwind css template`, `modern web template`, `creative agency template`

---

<p align="center">
  Built with precision. Engineered for performance.
</p>

Screenshots 
<br/>
<img width="1902" height="870" alt="image" src="https://github.com/user-attachments/assets/a9409217-9dc4-4f18-99c4-b644c8304804" />
<br/>
<br/>
<img width="1901" height="878" alt="image" src="https://github.com/user-attachments/assets/ced0c990-7e1b-4ec5-b936-6642445f37d3" />
<br/>
<br/>
<img width="1899" height="877" alt="image" src="https://github.com/user-attachments/assets/f3bd6b72-b7dc-4edf-8c33-99ded91d201e" />


