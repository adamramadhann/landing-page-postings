// src/content/config.ts
// Astro 5 Content Layer API Configuration
import { defineCollection, glob, z } from 'astro:content';

// Blog collection with glob loader (Astro 5)
const blog = defineCollection({
  // Use glob loader to load markdown files
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),

  // Zod schema for type-safe content
  schema: ({ image }) => z.object({
    // Required fields
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),

    // Publication date
    pubDate: z.coerce.date(),

    // Language: 'id' or 'en'
    lang: z.enum(['id', 'en'], {
      errorMap: () => ({ message: 'Lang must be either "id" or "en"' })
    }),

    // Optional fields
    // If not provided, will be generated from filename
    slug: z.string().optional(),

    // Featured image
    heroImage: image().optional(),

    // Author information
    author: z.string().optional(),
    authorTitle: z.string().optional(),

    // Category and tags
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    noindex: z.boolean().optional(),

    // Featured post (for highlighting)
    featured: z.boolean().default(false),

    // Related posts (slugs)
    related: z.array(z.string()).optional(),

    // Reading time (will be calculated if not provided)
    readTime: z.number().optional(),

    // Post status
    draft: z.boolean().default(false),

    // Custom data
    customData: z.record(z.any()).optional(),
  }),

  // Generate slug from filename if not provided
  // Format: YYYY-MM-DD-slug.md
  slugGeneration: {
    // Extract slug from filename
    // 2024-01-15-my-post.md → my-post
    regex: /^(\d{4}-\d{2}-\d{2}-)?(.+)\.md$/,
    replacement: '$2',
  },
});

// Export all collections
export const collections = {
  blog,
};

// Helper functions for content queries
// These can be used in pages to get content

// Example usage in pages:
// import { getCollection } from 'astro:content';
// const posts = await getCollection('blog');
// const idPosts = posts.filter(post => post.data.lang === 'id');

// Type definitions for blog posts
export type BlogPost = Awaited<ReturnType<typeof blog.get>>[number];
export type BlogPostData = z.infer<typeof blog.schema>;
