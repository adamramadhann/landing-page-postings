# 📁 Astro Folder Structure Guide

Struktur folder Astro yang umum dipakai senior developer dan rekomendasi untuk project Posthinks.

---

## 🎯 Pendekatan Struktur Folder (Senior Astro Patterns)

Ada **4 pendekatan utama** yang dipakai senior Astro developer:

### 1. **Route-Centric** (Simple Projects)
```
src/
├── pages/
├── components/
└── layouts/
```
**Cocok untuk:** Landing page, blog sederhana, portfolio

---

### 2. **Feature-Based** (Scalable Teams)
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/
│   └── billing/
│       ├── components/
│       ├── pages/
│       └── lib/
├── shared/
│   ├── components/
│   └── layouts/
└── lib/
```
**Cocok untuk:** Large teams, complex apps dengan banyak features

---

### 3. **Hybrid Layered** (Recommended - Most Flexible) ⭐
```
src/
├── pages/           # Routes
├── components/      # Organized by type & domain
│   ├── layout/      # Layout components
│   ├── ui/          # Generic/reusable UI
│   ├── features/    # Feature-specific components
│   └── blog/        # Domain-specific components
├── lib/             # Utilities, helpers
├── styles/          # Global styles
├── data/            # Static data (JSON, configs)
└── content/         # Markdown/MDX content
```
**Cocok untuk:** Medium to large projects, flexible & scalable

---

### 4. **Domain-Driven** (Enterprise)
```
src/
├── domains/
│   ├── user/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── product/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── types/
├── shared/
│   ├── ui/
│   ├── layouts/
│   └── lib/
└── infrastructure/
    ├── api/
    ├── database/
    └── auth/
```
**Cocok untuk:** Enterprise apps dengan complex business logic

---

## 🏗️ Struktur Project Posthinks (Current)

```
src/
├── components/
│   ├── blog/              # Blog components
│   ├── layout/            # Header, Footer (single)
│   ├── layouts/           # BaseLayout (main layout)
│   ├── sections/          # Page sections (Hero, CTA, dll)
│   └── ui/                # Reusable UI (AnimateOnScroll)
├── content/               # Markdown blog posts
├── data/                  # Translations (id.json, en.json)
├── lib/                   # Utilities (i18n, blog helpers)
├── pages/
│   └── [lang]/            # Dynamic routing for i18n
│       ├── blog/
│       ├── case-studies.astro
│       ├── clients.astro
│       ├── community.astro
│       ├── contact.astro
│       ├── index.astro
│       ├── services.astro
│       └── solutions.astro
└── styles/
    └── global.css
```

---

## ⚠️ Masalah & Rekomendasi

### **Masalah Saat Ini:**

| Masalah | Dampak |
|---------|--------|
| `layout/` vs `layouts/` (duplikat) | Confusing, mana yang dipakai? |
| `sections/` terlalu banyak (30+ files) | Sulit maintain, tidak scalable |
| Tidak ada folder `features/` | Feature logic tersebar |
| Tidak ada folder `types/` | Types tidak terorganisir |

---

## ✅ Rekomendasi Struktur Posthinks (Hybrid Layered)

```
src/
├── pages/                    # Routes & pages
│   ├── index.astro           # Root redirect
│   └── [lang]/               # i18n routes
│       ├── index.astro       # Home
│       ├── about.astro       # About
│       ├── services/
│       │   └── index.astro   # Services page
│       ├── case-studies/
│       │   ├── index.astro   # Case studies listing
│       │   └── [id]/         # Dynamic case study detail
│       │       └── index.astro
│       ├── blog/
│       │   ├── index.astro   # Blog listing
│       │   ├── [slug]/       # Blog post detail
│       │   │   └── [...page]/ # Pagination
│       │   │       └── index.astro
│       │   ├── tag/
│       │   │   └── [tag]/     # Posts by tag
│       │   │       └── index.astro
│       │   └── rss.xml.js    # RSS feed
│       └── contact.astro     # Contact page
│
├── components/               # All components
│   ├── layouts/              # Layout components (SINGULAR!)
│   │   ├── BaseLayout.astro  # Main layout wrapper
│   │   ├── BlogLayout.astro  # Blog-specific layout
│   │   └── CaseStudyLayout.astro
│   │
│   ├── ui/                   # Generic, reusable UI
│   │   ├── AnimateOnScroll.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   ├── Modal.astro
│   │   └── forms/
│   │       ├── ContactForm.astro
│   │       └── NewsletterForm.astro
│   │
│   ├── features/             # Feature-specific components
│   │   ├── contact/
│   │   │   ├── ContactForm.astro
│   │   │   └── ContactInfo.astro
│   │   ├── case-studies/
│   │   │   ├── CaseStudyCard.astro
│   │   │   ├── CaseStudiesGrid.astro
│   │   │   └── CaseStudyHero.astro
│   │   ├── blog/
│   │   │   ├── BlogCard.astro
│   │   │   ├── BlogGrid.astro
│   │   │   ├── BlogMeta.astro
│   │   │   └── BlogPagination.astro
│   │   ├── testimonials/
│   │   │   ├── TestimonialsCarousel.astro
│   │   │   └── TestimonialCard.astro
│   │   └── services/
│   │       ├── ServiceCard.astro
│   │       └── ServicesGrid.astro
│   │
│   └── sections/             # Page sections (grouped by page/feature)
│       ├── home/
│       │   ├── Hero.astro
│       │   ├── ClientLogos.astro
│       │   ├── SpecializedServices.astro
│       │   ├── ServicesSection.astro
│       │   ├── ImpactCaseStudies.astro
│       │   ├── Testimonials.astro
│       │   └── CTA.astro
│       ├── about/
│       │   ├── AboutHero.astro
│       │   ├── TeamSection.astro
│       │   └── ValuesSection.astro
│       ├── contact/
│       │   ├── ContactHero.astro
│       │   ├── ContactFormSection.astro
│       │   └── MapSection.astro
│       └── shared/           # Reusable sections
│           ├── FAQ.astro
│           ├── Newsletter.astro
│           └── TrustedBy.astro
│
├── lib/                      # Utilities & helpers
│   ├── i18n/
│   │   ├── i18n-data.ts      # i18n utilities
│   │   └── translations.ts
│   ├── blog/
│   │   ├── helpers.ts        # Blog utilities
│   │   └── transformers.ts   # Data transformers
│   ├── api/
│   │   └── client.ts         # API client (if needed)
│   ├── db/
│   │   └── queries.ts        # Database queries (if needed)
│   ├── utils/
│   │   ├── date.ts           # Date formatting
│   │   ├── string.ts         # String manipulation
│   │   └── validation.ts     # Validation schemas
│   └── constants.ts          # App-wide constants
│
├── types/                    # TypeScript types
│   ├── blog.ts
│   ├── case-study.ts
│   ├── i18n.ts
│   └── index.ts              # Barrel export
│
├── data/                     # Static data
│   ├── i18n/
│   │   ├── id.json
│   │   └── en.json
│   ├── case-studies/
│   │   └── index.ts          # Case studies data
│   ├── services/
│   │   └── index.ts          # Services data
│   └── clients/
│       └── index.ts          # Clients data
│
├── content/                  # Markdown/MDX content
│   ├── blog/
│   │   ├── post-1.md
│   │   └── post-2.md
│   └── config.ts            # Content collection config
│
├── styles/                   # Global styles
│   ├── global.css
│   ├── animations.css        # Keyframes & animations
│   └── components.css        # Component-specific styles
│
├── public/                   # Static assets (not in src/)
│   ├── images/
│   │   ├── logo-posthinks.png
│   │   ├── favicon.svg
│   │   └── og-image.png
│   ├── fonts/
│   └── icons/
│
└── env.d.ts                  # TypeScript environment variables
```

---

## 📋 Best Practices dari Senior Astro

### **1. Component Organization**

```typescript
// ✅ GOOD - Grouped by feature
components/
  features/
    contact/
      ContactForm.astro
      ContactInfo.astro
    blog/
      BlogCard.astro
      BlogGrid.astro
  ui/
    Button.astro
    Card.astro
```

```typescript
// ❌ BAD - Flat structure
components/
  ContactForm.astro
  ContactInfo.astro
  BlogCard.astro
  BlogGrid.astro
  Button.astro
  Card.astro
```

---

### **2. Naming Conventions**

| Type | Convention | Example |
|------|------------|---------|
| **Pages** | kebab-case | `about-us.astro` |
| **Components** | PascalCase | `BlogCard.astro` |
| **Utilities** | kebab-case | `date-utils.ts` |
| **Types** | PascalCase | `BlogPost.ts` |
| **Constants** | SCREAMING_SNAKE_CASE | `API_BASE_URL` |

---

### **3. Index Files (Barrel Exports)**

```typescript
// components/ui/index.ts
export { default as Button } from './Button.astro';
export { default as Card } from './Card.astro';
export { default as Badge } from './Badge.astro';

// Usage
import { Button, Card, Badge } from '@/components/ui';
```

---

### **4. Path Aliases**

```typescript
// tsconfig.json or astro.config.mjs
{
  "aliases": {
    "@/*": "./src/*",
    "@/components/*": "./src/components/*",
    "@/lib/*": "./src/lib/*",
    "@/styles/*": "./src/styles/*"
  }
}

// Usage
import Button from '@/components/ui/Button.astro';
import { formatDate } from '@/lib/utils/date';
```

---

### **5. Separation of Concerns**

```typescript
// ✅ GOOD - Separated
components/features/blog/
  BlogCard.astro        # UI only
lib/blog/
  helpers.ts            # Business logic
  transformers.ts       # Data transformation
data/blog/
  index.ts              # Static data

// ❌ BAD - Mixed
components/blog/
  BlogCard.astro        # UI + logic + data
```

---

## 🚀 Migration Plan untuk Posthinks

### **Phase 1: Fix Layouts (Immediate)**
1. Hapus `components/layout/` (folder, bukan layouts)
2. Pindahkan ke `components/layouts/`
3. Update semua imports

### **Phase 2: Group Sections (Short-term)**
1. Buat folder `components/sections/home/`
2. Pindahkan section yang dipakai di home
3. Buat folder `components/sections/shared/`
4. Pindahkan section yang reusable (FAQ, CTA, dll)

### **Phase 3: Create Features (Medium-term)**
1. Buat `components/features/blog/`
2. Pindahkan blog components
3. Buat `components/features/case-studies/`
4. Pindahkan case studies components

### **Phase 4: Organize Lib & Types (Long-term)**
1. Buat `lib/utils/` untuk utilities
2. Buat `lib/i18n/` untuk i18n logic
3. Buat `types/` untuk TypeScript types
4. Update semua imports

---

## 📚 Resources

- [Astro Project Structure Docs](https://docs.astro.build/en/core-concepts/project-structure/)
- [File Structure Best Practices](https://docs.astro.build/en/best-practices/file-structure/)
- [TypeScript Configuration](https://docs.astro.build/en/guides/typescript/)

---

## 🎯 Quick Summary

| Pendekatan | Gunakan ketika... |
|------------|-------------------|
| **Route-Centric** | Project sederhana |
| **Feature-Based** | Large teams |
| **Hybrid Layered** ⭐ | **Recommended untuk Posthinks** |
| **Domain-Driven** | Enterprise apps |

**Kunci utama:** Scalability, maintainability, dan team collaboration!
