// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Site configuration for SEO
  site: 'https://posthinks.com',
  base: '/',
  trailingSlash: 'never',

  // Integrations
  integrations: [
    tailwind({
      // Apply Tailwind to all files
      applyPolyfills: true,
    }),
    sitemap(),
  ],

  // Astro 5 Native i18n Configuration
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    // Don't prefix default locale (id)
    // / → id, /en → en
    prefixDefaultLocale: false,
  },

  // Build configuration
  build: {
    format: 'directory',
    assets: '_assets',
  },

  // Server configuration
  output: 'static',

  // Prefetch configuration for better UX
  prefetch: {
    default: 'hover',
    prefetchAll: false,
  },

  // View Transitions untuk smooth page transitions
  // Animasi antar halaman tanpa JavaScript library
  viewTransitions: {
    enabled: true,
  },
});
