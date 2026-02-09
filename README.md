# Posthinks Elevate - Astro 5 Pure Architecture

Project website yang dibangun dengan **Astro 5** menggunakan arsitektur pure server-side rendering (tanpa React Islands) untuk performa maksimal dan SEO optimal.

## 🚀 Fitur Utama

- ✅ **Astro 5 Native i18n** - Multi bahasa (ID/EN) tanpa library pihak ketiga
- ✅ **Content Layer API** - Blog dengan type-safe Zod schema
- ✅ **Pure Astro** - Tanpa React runtime untuk performa maksimal
- ✅ **Tailwind CSS** - Styling dengan custom animations
- ✅ **SEO Optimal** - Server-side rendering, structured data, sitemap
- ✅ **View Transitions** - Smooth page navigation tanpa JavaScript library
- ✅ **Type-Safe** - TypeScript throughout

## 📁 Struktur Proyek

```
posthinks-elevate-astro/
├── src/
│   ├── components/          # Astro components (.astro)
│   │   ├── layout/          # Layout components
│   │   ├── blog/            # Blog components
│   │   ├── sections/        # Page sections
│   │   └── ui/              # UI components
│   ├── content/             # Content collections
│   │   └── blog/            # Blog posts (id/en)
│   ├── layouts/             # Page layouts
│   ├── pages/               # File-based routing
│   │   └── [lang]/          # i18n routing
│   └── lib/                 # Utilities
├── public/                  # Static assets
├── astro.config.mjs         # Astro config
└── tailwind.config.mjs      # Tailwind config
```

## 🌐 Cara Kerja i18n

Astro 5 menggunakan native i18n routing dengan konfigurasi berikut:

### Konfigurasi

```javascript
// astro.config.mjs
i18n: {
  defaultLocale: 'id',
  locales: ['id', 'en'],
  prefixDefaultLocale: false,  // / untuk id, /en untuk en
}
```

### Routing Structure

- `/` → Bahasa Indonesia (default)
- `/en` → English
- `/services` → Halaman layanan (Indonesia)
- `/en/services` → Halaman layanan (English)

### Language Switching

Language switcher di header menggunakan helper function:

```typescript
import { getAlternateUrl } from '../lib/i18n';

const idUrl = getAlternateUrl(currentPath, 'id');  // /en/services → /services
const enUrl = getAlternateUrl(currentPath, 'en');  // /services → /en/services
```

## 📝 Panduan Menambahkan Blog Post

### 1. Buat File Markdown Baru

Blog posts disimpan di `src/content/blog/{lang}/` dengan format:
```
YYYY-MM-DD-slug.md
```

### 2. Tambahkan Frontmatter

```markdown
---
title: "Judul Postingan"
description: "Deskripsi singkat untuk SEO"
pubDate: 2024-01-15
lang: id  # atau 'en'
category: "Technology"
tags: ["web", "astro", "tailwind"]
author: "Nama Penulis"
authorTitle: "Web Developer"
featured: false
draft: false

# Optional fields
heroImage: ./images/cover.jpg
seoTitle: "Custom SEO title"
seoDescription: "Custom SEO description"
readTime: 5
related: ["other-post-slug"]
---

# Konten postingan dalam format Markdown...

## Subheading

Konten **bold** dan *italic*...
```

### 3. Schema Validation

Semua frontmatter fields di-validasi menggunakan Zod schema di `src/content/config.ts`:

```typescript
schema: z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  pubDate: z.coerce.date(),
  lang: z.enum(['id', 'en']),
  slug: z.string().optional(),
  // ... more fields
})
```

### 4. Posting untuk Dua Bahasa

Untuk postingan bilingual, buat dua file terpisah:

**Indonesia:**
```
src/content/blog/id/2024-01-15-web-development.md
lang: id
title: "Pengembangan Web Modern"
```

**English:**
```
src/content/blog/en/2024-01-15-web-development.md
lang: en
title: "Modern Web Development"
```

## 🎨 Menggunakan .astro vs .tsx

### Kapan Menggunakan `.astro`

Gunakan `.astro` untuk **SEMUA** komponen kecuali:
- Layout components (Header, Footer, Layouts)
- Page components (routes)
- UI components (Card, Button, Badge, etc.)
- Blog components (BlogCard, BlogList, etc.)
- Section components (Hero, Stats, CTA, etc.)

**Keuntungan:**
- Full SEO (server-rendered HTML)
- No JavaScript runtime
- Faster initial load
- Better performance

**Contoh:**
```astro
---
// src/components/ui/Card.astro
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<div class="rounded-lg border bg-card p-6 shadow-sm
            transition-all hover:shadow-md hover:-translate-y-1">
  <h3 class="font-semibold">{title}</h3>
  <p class="mt-2 text-muted-foreground">{description}</p>
</div>
```

### Interaktivitas Tanpa React

Untuk interaktivitas, gunakan native web APIs:

**1. Dialog dengan `<dialog>` native:**
```astro
<dialog id="my-dialog" class="rounded-lg shadow-lg p-6">
  <h2>Modal Title</h2>
  <p>Modal content</p>
  <button onclick="document.getElementById('my-dialog').close()">
    Close
  </button>
</dialog>

<button onclick="document.getElementById('my-dialog').showModal()">
  Open Modal
</button>
```

**2. Accordion dengan `<details>` native:**
```astro
<details class="group">
  <summary class="cursor-pointer font-semibold">
    Click to expand
  </summary>
  <div class="mt-2 text-muted-foreground">
    Hidden content that appears when expanded
  </div>
</details>
```

**3. Form handling dengan JavaScript murni:**
```astro
<form onsubmit="event.preventDefault(); alert('Submitted!');">
  <input type="email" required placeholder="Email" />
  <button type="submit">Submit</button>
</form>
```

### Animasi dengan Tailwind

Gunakan Tailwind animation classes untuk semua animasi:

```astro
<!-- Fade in animation -->
<div class="animate-fade-in">
  Content appears with fade effect
</div>

<!-- Slide from bottom -->
<div class="animate-slide-in-from-bottom">
  Content slides from bottom
</div>

<!-- Hover effects -->
<div class="transition-all hover:scale-105 hover:shadow-lg">
  Content scales on hover
</div>
```

Custom animations didefinisikan di `tailwind.config.mjs`:
```javascript
keyframes: {
  'fade-in': {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  // ... more animations
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, atau pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Site akan tersedia di `http://localhost:4321`

### Build Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI directly |

## 📦 Dependencies Utama

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}
```

## 🔧 Konfigurasi

### astro.config.mjs

Konfigurasi utama Astro:
- i18n setup (id/en)
- Tailwind integration
- Sitemap generation
- View transitions
- Build settings

### tailwind.config.mjs

Konfigurasi Tailwind:
- Custom color scheme
- Animation keyframes
- Typography plugin
- Dark mode support

### tsconfig.json

Konfigurasi TypeScript:
- Path aliases (`@/` untuk `src/`)
- Strict mode enabled
- Astro type definitions

## 🎯 SEO Optimization

### Meta Tags

Setiap halaman memiliki proper meta tags:

```astro
<BaseLayout
  title="Page Title"
  description="Page description"
  image="/og-image.jpg"
  lang="id"
/>
```

### Structured Data

Blog posts menggunakan JSON-LD structured data:

```javascript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.data.title,
  datePublished: post.data.pubDate.toISOString(),
  author: { '@type': 'Person', name: post.data.author },
  // ...
};
```

### Sitemap

Sitemap otomatis generated oleh `@astrojs/sitemap`:
- Includes all pages
- Proper language alternates
- Auto-updates with new content

## 🚀 Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di Vercel
3. Deploy automatically

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Static Hosting

Build dan deploy folder `dist/` ke hosting manapun:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📚 Best Practices

### 1. Type-Safe Content Collections

Selalu gunakan Zod schema untuk validasi:

```typescript
// ✅ Good
schema: z.object({
  title: z.string().min(1),
  pubDate: z.coerce.date(),
})

// ❌ Bad
schema: z.object({
  title: z.string().optional(),  // Required field harus required
})
```

### 2. Use Native Web APIs

**❌ Jangan gunakan React untuk:**
- Modal → Gunakan `<dialog>`
- Accordion → Gunakan `<details>`
- Form → Gunakan native `<form>` validation
- Hover effects → Gunakan CSS `:hover`

### 3. Optimize Images

```astro
<!-- ✅ Good - Astro image optimization -->
<img
  src={image.src}
  alt={image.alt}
  loading="lazy"
  decoding="async"
  width={image.width}
  height={image.height}
/>
```

### 4. Semantic HTML

```astro
<!-- ✅ Good -->
<article>
  <header>
    <h1>{title}</h1>
    <time datetime={date}>{formatDate(date)}</time>
  </header>
  <div set:html={content} />
  <footer>
    <author>{author}</author>
  </footer>
</article>
```

### 5. Animation Performance

**Gunakan CSS transforms untuk animasi (GPU-accelerated):**

```css
/* ✅ Good - GPU accelerated */
transform: translateY(10px);
opacity: 0;

/* ❌ Bad - CPU intensive */
top: 10px;
left: 20px;
```

## 🐛 Troubleshooting

### Blog post tidak muncul

1. Cek `lang` field di frontmatter
2. Pastikan file ada di folder yang benar (`id/` atau `en/`)
3. Cek `draft: false` untuk published posts

### i18n tidak bekerja

1. Cek `astro.config.mjs` i18n config
2. Pastikan folder `pages/[lang]/` ada
3. Restart dev server setelah config change

### Styles tidak ter-load

1. Cek Tailwind integration di `astro.config.mjs`
2. Pastikan `global.css` di-import di layout
3. Clear cache: `rm -rf .astro && rm -rf node_modules/.vite`

## 📖 Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [i18n Routing](https://docs.astro.build/en/guides/internationalisation/)
- [View Transitions](https://docs.astro.build/en/guides/view-transitions/)

## 📄 License

MIT License - feel free to use this project as reference.

---

**Built with ❤️ using Astro 5**
