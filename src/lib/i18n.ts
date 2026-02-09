// src/lib/i18n.ts
// i18n utilities untuk Astro 5 (tanpa library pihak ketiga)

export type Locale = 'id' | 'en';

export interface Translations {
  [key: string]: {
    [key in Locale]: string;
  };
}

// Translation dictionary
// Tambahkan translations di sini sesuai kebutuhan
export const t: Translations = {
  // Navigation
  'nav.home': { id: 'Beranda', en: 'Home' },
  'nav.services': { id: 'Layanan', en: 'Services' },
  'nav.caseStudies': { id: 'Studi Kasus', en: 'Case Studies' },
  'nav.blog': { id: 'Blog', en: 'Blog' },
  'nav.contact': { id: 'Kontak', en: 'Contact' },

  // Hero
  'hero.title': {
    id: 'Transformasi Digital untuk Bisnis Anda',
    en: 'Digital Transformation for Your Business',
  },
  'hero.subtitle': {
    id: 'Kami membantu bisnis berkembang dengan solusi digital yang inovatif',
    en: 'We help businesses grow with innovative digital solutions',
  },
  'hero.cta': { id: 'Mulai Sekarang', en: 'Get Started' },

  // Stats
  'stats.clients': { id: 'Klien Puas', en: 'Happy Clients' },
  'stats.projects': { id: 'Proyek Selesai', en: 'Projects Completed' },
  'stats.years': { id: 'Tahun Pengalaman', en: 'Years Experience' },
  'stats.team': { id: 'Tim Ahli', en: 'Expert Team' },

  // Blog
  'blog.readMore': { id: 'Baca Selengkapnya', en: 'Read More' },
  'blog.publishedOn': { id: 'Diterbitkan pada', en: 'Published on' },
  'blog.readingTime': { id: 'menit baca', en: 'min read' },
  'blog.allPosts': { id: 'Semua Postingan', en: 'All Posts' },
  'blog.relatedPosts': { id: 'Postingan Terkait', en: 'Related Posts' },
  'blog.loadMore': { id: 'Muat Lebih Banyak', en: 'Load More' },

  // Pagination
  'pagination.previous': { id: 'Sebelumnya', en: 'Previous' },
  'pagination.next': { id: 'Selanjutnya', en: 'Next' },
  'pagination.page': { id: 'Halaman', en: 'Page' },

  // Form
  'form.name': { id: 'Nama', en: 'Name' },
  'form.email': { id: 'Email', en: 'Email' },
  'form.message': { id: 'Pesan', en: 'Message' },
  'form.submit': { id: 'Kirim', en: 'Submit' },
  'form.required': { id: 'Wajib diisi', en: 'Required' },

  // Footer
  'footer.rights': { id: 'Semua hak dilindungi.', en: 'All rights reserved.' },
};

/**
 * Get translation for a key
 * @param key - Translation key (e.g., 'nav.home')
 * @param locale - Target locale ('id' or 'en')
 * @returns Translated string or key if not found
 */
export function getTranslation(key: string, locale: Locale): string {
  return t[key]?.[locale] || key;
}

/**
 * Translation helper untuk Astro components
 * Usage in .astro:
 * import { t } from '../lib/i18n';
 * const title = t('nav.home', currentLang);
 */
export function trans(key: string, locale: Locale): string {
  return getTranslation(key, locale);
}

/**
 * Format date based on locale
 * @param date - Date to format
 * @param locale - Target locale
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
}

/**
 * Format number based on locale
 * @param num - Number to format
 * @param locale - Target locale
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: Locale): string {
  return num.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US');
}

/**
 * Calculate reading time for blog posts
 * @param content - Post content (markdown or plain text)
 * @param locale - Target locale
 * @returns Reading time string
 */
export function calculateReadingTime(
  content: string,
  locale: Locale
): string {
  const wordsPerMinute = locale === 'id' ? 200 : 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} ${trans('blog.readingTime', locale)}`;
}

/**
 * Get alternate URL for language switching
 * @param currentPath - Current URL pathname
 * @param targetLocale - Target locale
 * @returns Alternate URL
 */
export function getAlternateUrl(
  currentPath: string,
  targetLocale: Locale
): string {
  if (targetLocale === 'id') {
    // Dari en ke id
    return currentPath.replace('/en', '') || '/';
  } else {
    // Dari id ke en
    if (currentPath === '/') return '/en';
    return '/en' + currentPath;
  }
}

/**
 * Get current locale from URL pathname
 * @param pathname - URL pathname
 * @returns Current locale
 */
export function getCurrentLocale(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'id';
}

/**
 * URL builder dengan locale
 * @param path - Path without locale
 * @param locale - Target locale
 * @returns Full path with locale
 */
export function withLocale(path: string, locale: Locale): string {
  if (locale === 'id') {
    return path;
  }
  return '/en' + (path.startsWith('/') ? path : '/' + path);
}
