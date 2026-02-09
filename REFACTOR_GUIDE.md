# Refactoring Guide: posthinks-elevate ke Astro 5

## D. Contoh Refactoring React ke Astro

Berikut adalah contoh bagaimana komponen React di posthinks-elevate di-refactor menjadi komponen Astro.

### Contoh 1: Card Component

#### Before (React - Card.tsx)
```tsx
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export function Card({ title, description, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm",
        className
      )}
      onMouseEnter={() => console.log('hover')}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
```

#### After (Astro - Card.astro)
```astro
---
// src/components/ui/Card.astro
import { cn } from '../../lib/utils';

interface Props {
  title: string;
  description: string;
  class?: string;
}

const { title, description, class: className } = Astro.props;
---

<div
  class={cn(
    "rounded-lg border bg-card p-6 shadow-sm",
    "transition-all hover:shadow-md hover:-translate-y-1",
    className
  )}
  role="article"
>
  <h3 class="font-semibold">{title}</h3>
  <p class="mt-2 text-muted-foreground">{description}</p>
</div>
```

**Perubahan:**
1. Props menjadi `Astro.props` dengan `interface Props`
2. `className` menjadi `class` (HTML standard)
3. `onMouseEnter` diganti dengan Tailwind `hover:`
4. Tidak perlu `React.HTMLAttributes`
5. Lebih SEO-friendly (dengan `role="article"`)

### Contoh 2: Hero Section dengan Animasi

#### Before (React - HeroSection.tsx dengan Framer Motion)
```tsx
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Transformasi Digital
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img src="/hero.jpg" alt="Hero" />
      </motion.div>
    </section>
  );
}
```

#### After (Astro - HeroSection.astro dengan Tailwind)
```astro
---
// src/components/sections/HeroSection.astro
interface Props {
  lang: 'id' | 'en';
}

const { lang } = Astro.props;
---

<section class="relative overflow-hidden">
  <h1 class="animate-fade-in">
    Transformasi Digital
  </h1>

  <div class="animate-scale-in" style="animation-delay: 200ms">
    <img src="/hero.jpg" alt="Hero" loading="eager" />
  </div>
</section>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scale-in {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }

  .animate-scale-in {
    animation: scale-in 0.5s ease-out forwards;
  }
</style>
```

**Perubahan:**
1. Framer Motion → CSS keyframes
2. `initial/animate/transition` → Tailwind classes + `animation-delay`
3. Animasi GPU-accelerated (CSS transforms)
4. Tidak perlu JavaScript library
5. Lebih performa

### Contoh 3: Accordion Component

#### Before (React - Accordion.tsx dengan Radix UI)
```tsx
import * as Accordion from "@radix-ui/react-accordion";

export function AccordionItem({ title, content }: AccordionProps) {
  return (
    <Accordion.Root>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger>{title}</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>{content}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
```

#### After (Astro - Accordion.astro dengan Native HTML)
```astro
---
// src/components/ui/Accordion.astro
interface Props {
  title: string;
  content: string;
}

const { title, content } = Astro.props;
---

<details class="group">
  <summary class="flex cursor-pointer items-center justify-between
                  rounded-lg bg-muted px-4 py-3 font-semibold
                  transition-colors hover:bg-muted/80
                  open:rounded-b-none open:bg-accent">
    {title}
    <svg
      class="h-4 w-4 transition-transform group-open:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2}
            d="M19 9l-7 7-7-7" />
    </svg>
  </summary>

  <div class="rounded-b-lg border-t bg-background px-4 py-3
                  animate-slide-down">
    {content}
  </div>
</details>

<style>
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }
</style>
```

**Perubahan:**
1. Radix UI Accordion → Native `<details>` element
2. `Accordion.Trigger` → `<summary>` dengan CSS styling
3. State management otomatis oleh browser
4. `group-open:` modifier untuk animasi arrow
5. Full accessibility tanpa JavaScript

### Contoh 4: Blog Card dengan Hover Effects

#### Before (React - BlogCard.tsx)
```tsx
import { useState } from "react";
import { motion } from "framer-motion";

export function BlogCard({ post }: { post: Post }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      animate={{ scale: isHovered ? 1.02 : 1 }}
    >
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
    </motion.div>
  );
}
```

#### After (Astro - BlogCard.astro)
```astro
---
// src/components/blog/BlogCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
---

<a
  href={`/blog/${post.slug}`}
  class="group block overflow-hidden rounded-lg border bg-card
         transition-all duration-300 hover:shadow-lg hover:-translate-y-2
         hover:scale-[1.02]"
>
  <div class="aspect-[16/9] overflow-hidden">
    <img
      src={post.data.heroImage.src}
      alt={post.data.title}
      class="h-full w-full object-cover
             transition-transform duration-300
             group-hover:scale-110"
      loading="lazy"
      decoding="async"
    />
  </div>

  <h3 class="p-4 font-semibold transition-colors group-hover:text-primary">
    {post.data.title}
  </h3>
</a>
```

**Perubahan:**
1. `useState` dihapus → gunakan CSS `:hover` dan `.group`
2. Framer Motion `whileHover` → Tailwind `hover:-translate-y-2`
3. `onHoverStart/End` → CSS `group-hover:`
4. Animasi lebih smooth dengan GPU acceleration
5. Zero JavaScript runtime

### Perbandingan Ukuran Bundle

| Komponen | React + Framer Motion | Astro + Tailwind | Pengurangan |
|----------|----------------------|------------------|-------------|
| Card | ~15 KB | ~2 KB | -87% |
| Hero | ~45 KB | ~3 KB | -93% |
| Accordion | ~35 KB | ~1 KB | -97% |
| BlogCard | ~25 KB | ~4 KB | -84% |

**Total Pengurangan: ~90% JavaScript bundle size**

## Mapping Komponen posthinks-elevate ke Astro

| React Component | Astro Component | Notes |
|----------------|----------------|-------|
| `Layout.tsx` | `BaseLayout.astro` | Layout utama dengan View Transitions |
| `Navbar.tsx` | `Header.astro` | Static header dengan language switcher |
| `Footer.tsx` | `Footer.astro` | Static footer |
| `HeroSection.tsx` | `HeroSection.astro` | Tailwind animations |
| `StatsSection.tsx` | `StatsSection.astro` | CSS counters |
| `GlassCard.tsx` | `Card.astro` | Tailwind backdrop blur |
| `AnimatedCounter.tsx` | Inline CSS | CSS `@property` for animated numbers |
| `Dialog.tsx` | `Dialog.astro` | Native `<dialog>` |
| `Accordion.tsx` | `Accordion.astro` | Native `<details>` |
| `MagneticButton.tsx` | `Button.astro` | CSS hover effects |
| Framer Motion | Tailwind `animate-*` | GPU-accelerated CSS animations |

## Tips Refactoring

1. **Mulai dari yang static**:
   - Pindahkan komponen yang tidak butuh interaktivitas dulu
   - Layout, Footer, Header, Cards, etc.

2. **Ganti Framer Motion dengan Tailwind**:
   - `motion.div` → `<div class="animate-*">`
   - `whileHover` → `hover:*`
   - `initial/animate` → `style="animation-delay: Nms"`

3. **Gunakan Native Web APIs**:
   - Modal → `<dialog>`
   - Accordion → `<details>`
   - Form validation → `required`, `pattern` attributes

4. **CSS untuk animasi complex**:
   - Gunakan CSS keyframes
   - `transition-all duration-*` untuk smooth transitions
   - `group` dan `peer` modifiers untuk parent/child states

5. **Performance**:
   - Use `loading="lazy"` untuk images
   - Use `decoding="async"` untuk off-main-thread decoding
   - Minimize inline styles, gunakan classes
