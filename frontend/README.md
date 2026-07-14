# Ladang Lima — Landing Page

Landing page untuk **Ladang Lima**, brand pangan berbasis singkong (cassava) gluten-free asal Indonesia sejak 2012. Halaman ini menampilkan produk, keunggulan, cerita brand, testimoni, dan call-to-action dengan desain *Agriculture-Luxe* yang elegan dan minimalis.

## Tech Stack

| Kategori | Teknologi | Versi |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org) (App Router) | 16.2.9 |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org) | ^5 |
| **UI Library** | [React](https://react.dev) | 19.2.4 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | ^4 |
| **Animation** | [Framer Motion](https://www.framer.com/motion) | ^12.40 |
| **Animation** | [GSAP](https://gsap.com) + `@gsap/react` | ^3.15 / ^2.1.2 |
| **Icons** | [Lucide React](https://lucide.dev) | ^1.21 |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | ^5.101 |
| **Utilities** | `clsx` + `tailwind-merge` | — |
| **Linter** | ESLint (`eslint-config-next`) | ^9 |

## Design System

Desain mengusung tema **Agriculture-Luxe** — perpaduan minimalisme premium dengan nuansa alam yang hangat. Detail lengkap ada di [`../DESIGN.md`](../DESIGN.md).

### Color Palette

| Nama | Hex | Penggunaan |
|---|---|---|
| Earth Canvas | `#FDFCFB` | Background utama |
| Pure Surface | `#FFFFFF` | Container/floating cards |
| Forest Ink | `#052e16` | Text utama |
| Muted Silt | `#64748b` | Text sekunder, deskripsi |
| Sunlit Amber | `#B45309` | Accent, CTA, highlight |

### Typography

| Role | Font | Penggunaan |
|---|---|---|
| Display | **Instrument Serif** | Heading, hero title |
| Body | **Plus Jakarta Sans** | Paragraph, UI text |
| Mono | **JetBrains Mono** | Metadata, data points |

### Prinsip Desain

- **Balanced Minimalism** — elegan tapi restraint, density menengah
- **Rounded corners** — 0.75rem untuk button, 1.5rem untuk card
- **Soft shadows** — gaya Apple-style, wide & subtle
- **Section padding** — `py-24` sampai `py-32`
- **Icons** — thin stroke 1.5px, ukuran konsisten 24px
- **Mobile** — clean stack dengan 2rem horizontal padding

## Struktur Project

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, metadata, global styles)
│   │   ├── page.tsx          # Homepage (menyusun semua section)
│   │   ├── globals.css       # Global CSS + Tailwind
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Navbar.tsx           # Navigasi atas
│   │   ├── Hero.tsx             # Hero section
│   │   ├── IntroSection.tsx     # Intro / brand overview
│   │   ├── Features.tsx         # Fitur unggulan
│   │   ├── FeatureGrid.tsx      # Grid fitur
│   │   ├── InteractiveCards.tsx # Kartu interaktif
│   │   ├── Products.tsx         # Section produk
│   │   ├── ProductGrid.tsx      # Grid produk
│   │   ├── ProductCarousel.tsx  # Carousel produk
│   │   ├── CassavaSection.tsx   # Section singkong
│   │   ├── GlutenFreeBenefits.tsx
│   │   ├── WhyGlutenFree.tsx
│   │   ├── PremiumBenefits.tsx
│   │   ├── FloatingGallery.tsx  # Galeri floating image
│   │   ├── Story.tsx            # Cerita brand
│   │   ├── Testimonials.tsx     # Testimoni pelanggan
│   │   ├── Recipes.tsx          # Section resep
│   │   ├── PremiumRecipes.tsx
│   │   ├── CTA.tsx              # Call-to-action
│   │   ├── FactoryCTA.tsx
│   │   ├── Footer.tsx
│   │   └── ...                  # Komponen pendukung lainnya
│   └── lib/
│       └── utils.ts             # Utility functions (cn, dll)
├── public/                      # Static assets (SVG, images)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.mjs
└── eslint.config.mjs
```

## Getting Started

### Prasyarat

- **Node.js** >= 18.18.0
- **npm** / **yarn** / **pnpm** / **bun** (pilih salah satu)

### Instalasi & Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Scripts

| Command | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build untuk production |
| `npm run start` | Menjalankan production server |
| `npm run lint` | Cek linting dengan ESLint |

## Roadmap

Project ini adalah bagian dari SaaS landing page generator dengan CMS terintegrasi. Lihat [`../prd.md`](../prd.md) untuk detail lengkap Product Requirements Document.

- [x] **Phase 1** — Planning & Design (design system, PRD, struktur)
- [ ] **Phase 2** — Core Development (Laravel backend, CMS, API integration)
- [ ] **Phase 3** — Testing & Deployment
- [ ] **Phase 4** — Post-Launch & Iteration

## Deployment

Frontend di-host di **Vercel**. Backend (Laravel) akan di-host di **cPanel**.

```bash
# Build production
npm run build

# Jalankan production server
npm run start
```

Atau deploy langsung via [Vercel Dashboard](https://vercel.com/new).

## Repository

- **GitHub:** [https://github.com/roofi-dev/landing_page](https://github.com/roofi-dev/landing_page)
