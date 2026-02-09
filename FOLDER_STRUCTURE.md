# Astro 5 Pure Architecture - Struktur Folder Manual (Tanpa React)

## A. Struktur Folder Utama

```
posthinks-elevate-astro/
├── public/                          # Static assets
│   ├── fonts/                       # Custom fonts
│   ├── images/                      # Images, icons
│   └── favicon.svg
│
├── src/
│   ├── components/                  # Astro components (server-side only)
│   │   ├── layout/                  # Layout components
│   │   │   ├── Header.astro         # Header dengan nav dan language switcher
│   │   │   ├── Footer.astro         # Footer statis
│   │   │   └── Navbar.astro         # Navigation component
│   │   │
│   │   ├── blog/                    # Blog-related components
│   │   │   ├── BlogCard.astro       # Card blog dengan Tailwind animate
│   │   │   ├── BlogList.astro       # List blog dengan pagination
│   │   │   ├── BlogMeta.astro       # Meta tags untuk blog
│   │   │   └── BlogPagination.astro # Pagination dengan Tailwind
│   │   │
│   │   ├── sections/                # Page sections (static)
│   │   │   ├── HeroSection.astro    # Hero dengan Tailwind animate
│   │   │   ├── StatsSection.astro   # Stats dengan Tailwind counter
│   │   │   ├── ServicesPreview.astro
│   │   │   ├── TrustBar.astro
│   │   │   └── CTASection.astro
│   │   │
│   │   └── ui/                      # Static UI components
│   │       ├── Card.astro
│   │       ├── Button.astro
│   │       ├── Badge.astro
│   │       ├── Separator.astro
│   │       ├── Dialog.astro         # Menggunakan <dialog> native
│   │       └── Accordion.astro      # Menggunakan <details> native
│   │
│   ├── content/                     # Content Layer API
│   │   ├── blog/                    # Blog posts
│   │   │   ├── id/                  # Bahasa Indonesia
│   │   │   │   ├── 2024-01-15-post-1.md
│   │   │   │   └── 2024-02-20-post-2.md
│   │   │   └── en/                  # English
│   │   │       ├── 2024-01-15-post-1.md
│   │   │       └── 2024-02-20-post-2.md
│   │   └── config.ts                # Content collection schema
│   │
│   ├── layouts/                     # Astro layouts
│   │   ├── BaseLayout.astro         # Base layout
│   │   └── BlogLayout.astro         # Blog-specific layout
│   │
│   ├── pages/                       # File-based routing
│   │   ├── [lang]/                  # i18n routing
│   │   │   ├── index.astro          # Homepage (/ dan /en)
│   │   │   ├── services.astro       # Services page
│   │   │   ├── case-studies.astro   # Case studies page
│   │   │   ├── contact.astro        # Contact page
│   │   │   └── blog/
│   │   │       ├── index.astro      # Blog listing
│   │   │       └── [...slug].astro  # Blog detail
│   │   └── 404.astro                # 404 page
│   │
│   ├── lib/                         # Utilities
│   │   ├── utils.ts                 # Helper functions (cn, dates, format)
│   │   ├── i18n.ts                  # i18n utilities (translations)
│   │   └── blog.ts                  # Blog helper functions
│   │
│   ├── styles/                      # Global styles
│   │   └── global.css               # Global CSS dengan Tailwind directives
│   │
│   └── env.d.ts                     # Astro type definitions
│
├── astro.config.mjs                 # Astro configuration
├── tailwind.config.mjs              # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
└── README.md                        # Project documentation
```

## B. Penjelasan Struktur

### 1. **Pure Astro (Server-Side Rendering)**

- **Semua komponen `.astro`**: Di-render di server
  - SEO optimal (full HTML di kirim ke klien)
  - Tidak perlu JavaScript untuk interaksi dasar
  - Performa maksimal dengan partial hydration

### 2. **Animasi dengan Tailwind CSS**

- **Tailwind Animate**: Untuk animasi sederhana
  - `animate-fade-in`, `animate-slide-up`, dll
  - CSS-based animations (GPU accelerated)
  - Tidak perlu JavaScript library

- **Native Web APIs**: Untuk interaksi
  - `<dialog>` untuk modal
  - `<details>` untuk accordion
  - CSS `:has()` untuk state management
  - CSS Scroll-driven animations

### 3. **Content Layer API untuk Blog**

- **`src/content/blog/[lang]/`**: Content collection dengan i18n
  - Setiap bahasa memiliki folder terpisah
  - Menggunakan `loader: glob` dari Astro 5
  - Schema Zod untuk type-safety

### 4. **i18n Routing**

- **`src/pages/[lang]/`**: Routing berbasis bahasa
  - `id` = bahasa Indonesia (default)
  - `en` = English
  - Dikonfigurasi dengan `prefixDefaultLocale: false`

## C. Mapping dari posthinks-elevate

| posthinks-elevate (React) | Astro 5 Structure |
|---------------------------|-------------------|
| `src/pages/Index.tsx` | `src/pages/[lang]/index.astro` |
| `src/components/home/HeroSection.tsx` | `src/components/sections/HeroSection.astro` |
| `src/components/layout/Layout.tsx` | `src/layouts/BaseLayout.astro` |
| `src/components/ui/Card.tsx` | `src/components/ui/Card.astro` |
| Framer Motion animations | Tailwind `animate-*` classes |
| React hooks | Astro directives & native APIs |
| - | `src/content/blog/[lang]/` |

## D. Keuntungan Arsitektur Ini

1. **Performa Maksimal**: Tidak ada React runtime overhead
2. **SEO Optimal**: Semua konten di-render di server
3. **Type-Safe**: Zod schema untuk content collections
4. **Simple**: Tidak perlu manage React state
5. **Maintainable**: Struktur folder yang jelas

## E. File Konfigurasi Penting

Files yang perlu dibuat manual:

1. `astro.config.mjs` - Konfigurasi Astro + Tailwind + i18n
2. `src/content/config.ts` - Content collection schema
3. `src/lib/i18n.ts` - i18n utilities
4. `src/lib/utils.ts` - Helper functions
5. `src/layouts/BaseLayout.astro` - Layout utama
6. `src/pages/[lang]/index.astro` - Homepage
7. `src/pages/[lang]/blog/[...slug].astro` - Blog detail
8. `package.json` - Dependencies
9. `tailwind.config.mjs` - Tailwind config
10. `tsconfig.json` - TypeScript config
