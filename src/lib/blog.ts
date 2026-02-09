// src/lib/blog.ts
// Blog helper functions

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Get all published blog posts for a specific language
 * @param locale - 'id' or 'en'
 * @returns Array of published blog posts
 */
export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const allPosts = await getCollection('blog');

  return allPosts
    .filter(post => post.data.lang === locale && !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Get related blog posts
 * @param currentPost - Current blog post
 * @param limit - Maximum number of posts (default: 3)
 * @returns Array of related blog posts
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const locale = currentPost.data.lang;
  const allPosts = await getBlogPosts(locale);

  // Filter out current post
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);

  // Jika ada related posts yang ditentukan
  if (currentPost.data.related && currentPost.data.related.length > 0) {
    const related = otherPosts.filter(post =>
      currentPost.data.related?.includes(post.slug)
    );
    if (related.length > 0) {
      return related.slice(0, limit);
    }
  }

  // Fallback: cari posts dengan category yang sama
  if (currentPost.data.category) {
    const sameCategory = otherPosts.filter(
      post => post.data.category === currentPost.data.category
    );
    if (sameCategory.length > 0) {
      return sameCategory.slice(0, limit);
    }
  }

  // Fallback terakhir: return posts terbaru
  return otherPosts.slice(0, limit);
}
