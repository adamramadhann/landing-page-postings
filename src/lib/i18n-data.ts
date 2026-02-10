// src/lib/i18n-data.ts
// Helper untuk multilanguage data
import translationsId from '../data/id.json?inline';
import translationsEn from '../data/en.json?inline';

export const LocaleSchema = z.enum(['id', 'en']);
export type Locale = z.infer<typeof LocaleSchema>;

// Import zodiac untuk validation
import { z } from 'astro:schema';

// Interface untuk data structure
export interface TranslationData {
  common: {
    siteName: string;
    siteDescription: string;
    language: string;
  };
  nav: {
    home: string;
    solutions: string;
    services: string;
    community: string;
    caseStudies: string;
    blog: string;
    contact: string;
    consultation: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    rights: string;
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    cta: {
      text: string;
      href: string;
    };
    detail: {
      consulting: ServiceDetail;
      development: ServiceDetail;
      design: ServiceDetail;
      marketing: ServiceDetail;
    };
    page: {
      title: string;
      subtitle: string;
      needHelp: string;
      needHelpDesc: string;
      contactUs: string;
    };
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  blog: {
    title: string;
    subtitle: string;
    viewAll: string;
    related: string;
    loadMore: string;
    readMore: string;
    publishedOn: string;
    readingTime: string;
  };
  contact: {
    title: string;
    subtitle: string;
    sendMessage: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
      placeholders: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
      success: string;
    };
    info: {
      email: string;
      phone: string;
      address: string;
      socialMedia: string;
      emailValue: string;
      phoneValue: string;
      addressValue: string;
    };
  };
}

interface ServiceDetail {
  title: string;
  description: string;
  features: string[];
}

// All translations loaded statically
const translations = {
  id: translationsId as TranslationData,
  en: translationsEn as TranslationData,
};

/**
 * Get translation data untuk locale tertentu
 * @param locale - Locale code (id atau en)
 * @returns Translation data
 */
export function getTranslations(locale: Locale): TranslationData {
  return translations[locale] || translations.id;
}

/**
 * Get current locale dari URL pathname
 * Updated untuk prefixDefaultLocale: true
 * @param pathname - URL pathname
 * @returns Current locale
 */
export function getLocaleFromPath(pathname: string): Locale {
  // Handle root
  if (pathname === '/' || pathname === '') {
    return 'id'; // Default locale
  }

  // Match /xx/ pattern untuk language prefix
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (match) {
    const locale = match[1] as Locale;
    if (locale === 'id' || locale === 'en') {
      return locale;
    }
  }
  return 'id'; // Default locale
}

/**
 * Get alternate URL untuk language switching
 * Updated untuk prefixDefaultLocale: true
 * @param currentPath - Current URL pathname
 * @param targetLocale - Target locale
 * @returns Alternate URL
 */
export function getAlternateUrl(currentPath: string, targetLocale: Locale): string {
  // Handle root paths
  if (currentPath === '/' || currentPath === '') {
    return targetLocale === 'id' ? '/id' : '/en';
  }

  // Normalize path - remove trailing slash for consistency
  const normalizedPath = currentPath.endsWith('/') && currentPath !== '/'
    ? currentPath.slice(0, -1)
    : currentPath;

  // Check if current path has locale prefix (/id/ or /en/)
  const localeMatch = normalizedPath.match(/^\/(en|id)(\/.*)?$/);

  if (localeMatch) {
    // Path has locale prefix - extract the path without locale
    const currentLocale = localeMatch[1] as Locale;
    const pathWithoutLocale = localeMatch[2] || '/';

    // If target locale is same as current, return as is
    if (currentLocale === targetLocale) {
      return normalizedPath;
    }

    // Switch to target locale with prefix
    return targetLocale === 'id'
      ? `/id${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
      : `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  }

  // Path has no locale prefix - add target locale prefix
  return targetLocale === 'id'
    ? `/id${normalizedPath === '/' ? '' : normalizedPath}`
    : `/en${normalizedPath === '/' ? '' : normalizedPath}`;
}

/**
 * Helper untuk get URL dengan locale
 * @param path - Path tanpa locale prefix
 * @param locale - Target locale
 * @returns Full path dengan locale
 */
export function withLocale(path: string, locale: Locale): string {
  if (locale === 'id') {
    return path;
  }
  return path.startsWith('/') ? `/en${path}` : `/en/${path}`;
}
