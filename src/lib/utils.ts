// src/lib/utils.ts
// Utility functions untuk Astro project

/**
 * Site configuration
 */
export const SITE = {
  name: 'Posthinks Elevate',
  url: 'https://posthinks.com',
  description: {
    id: 'Mitra transformasi digital terpercaya untuk bisnis Anda',
    en: 'Trusted digital transformation partner for your business',
  },
  author: 'Posthinks Team',
  ogImage: '/images/og-default.jpg',
};

/**
 * Class names merger untuk Tailwind
 * Menggabungkan multiple class names dengan proper deduplication
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format tanggal ke format Indonesia atau English
 * @param date - Date object or string
 * @param locale - 'id' atau 'en'
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: 'id' | 'en' = 'id'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString(
    locale === 'id' ? 'id-ID' : 'en-US',
    options
  );
}

/**
 * Hitung reading time untuk konten
 * @param content - Konten markdown atau text
 * @param locale - 'id' atau 'en' (default: 'id')
 * @returns Reading time dalam menit
 */
export function calculateReadingTime(
  content: string,
  locale: 'id' | 'en' = 'id'
): number {
  // Rata-rata reading speed:
  // - Indonesia: ~200 kata/menit
  // - English: ~225 kata/menit
  const wordsPerMinute = locale === 'id' ? 200 : 225;

  // Hapus markdown syntax
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/\*\*|\*/g, '') // Bold/italic
    .replace(/\[.+\]\(.+\)/g, '') // Links
    .replace(/`{1,3}/g, '') // Code
    .trim();

  const words = plainText.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}

/**
 * Slugify string untuk URL
 * @param str - String yang akan di-slugify
 * @returns Slug string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text dengan ellipsis
 * @param str - String yang akan di-truncate
 * @param length - Maximum length
 * @returns Truncated string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}
