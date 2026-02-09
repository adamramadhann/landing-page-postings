# Quick Start Guide - Posthinks Landing Page

**Date:** 2026-02-08
**Project:** Posthinks Elevate Astro Landing Page

---

## 🚀 Quick Start

### Installation & Setup

```bash
# Navigate to project
cd posthinks-elevate-astro

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

**Access at:** http://localhost:4321

---

## 📁 Key Files to Edit

### Content Updates

#### 1. Change Page Content
```bash
# Solusi page (ID)
src/pages/[lang]/solusi.astro

# Community page (ID)
src/pages/[lang]/community.astro

# Home page sections
src/components/sections/ImpactMetrics.astro
src/components/sections/ProcessSection.astro
```

#### 2. Update Translations
```bash
src/data/id.json    # Indonesian content
src/data/en.json    # English content
```

#### 3. Update Navigation
```bash
src/components/layout/Header.astro
```

---

## 🎨 Design Customization

### Change Colors

**File:** `src/styles/global.css`

```css
:root {
  --primary: 178 100% 41%; /* Change primary color */
}

/* Or in Tailwind config */
/* tailwind.config.mjs */
colors: {
  primary: '#00D1D1', /* Your color */
}
```

### Update Images

**Replace Unsplash URLs in:**

1. **Solusi Page:**
   ```astro
   const images = {
     buzz: 'YOUR_IMAGE_URL',
     media: 'YOUR_IMAGE_URL',
     // ...
   };
   ```

2. **Community Page:**
   ```astro
   const images = {
     hero: 'YOUR_IMAGE_URL',
     talents: 'YOUR_IMAGE_URL',
     // ...
   };
   ```

### Adjust Animations

**Animation speeds:** Modify `animation-duration` in CSS
```css
.animate-float {
  animation: float 6s ease-in-out infinite; /* Change 6s to desired speed */
}
```

**Disable animations:** Remove animation classes or set duration to 0.01ms

---

## 📝 Content Updates

### Change Statistics/Metrics

**File:** `src/components/sections/ImpactMetrics.astro`

Find and replace:
```astro
const metricsData = {
  id: {
    metrics: [
      { value: '500+', label: 'Proyek Sukses' },
      { value: '98%', label: 'Kepuasan Klien' },
      // Change these values
    ]
  }
}
```

### Update Service Descriptions

**File:** `src/pages/[lang]/solusi.astro`

Find the `solusiData` object and update:
```javascript
solutions: [
  {
    title: 'YOUR NEW TITLE',
    description: 'YOUR NEW DESCRIPTION',
    features: [...],
  }
]
```

### Update Pricing

**File:** `src/pages/[lang]/solusi.astro`

Find `pricing` object and update tiers:
```javascript
pricing: {
  tiers: [
    {
      name: 'Starter',
      price: 'YOUR PRICE',
      features: [...]
    }
  ]
}
```

---

## 🔧 Common Tasks

### Add a New Page

1. Create file: `src/pages/[lang]/yourpage.astro`
2. Copy structure from existing page
3. Update content
4. Add to navigation in Header.astro

```bash
# Example: Create About page
touch src/pages/[lang]/about.astro
```

### Add a New Section

1. Create: `src/components/sections/YourSection.astro`
2. Add props interface
3. Implement component
4. Import and use in page

```astro
// In page
import YourSection from '../../components/sections/YourSection.astro;

<YourSection currentLang={locale} />
```

### Update Navigation

**File:** `src/components/layout/Header.astro`

```javascript
const navLinks = [
  { href: currentLang === 'id' ? '/' : '/en', label: t.nav.home },
  { href: currentLang === 'id' ? '/yourpage' : '/en/yourpage', label: 'Your Page' },
  // ...
];
```

### Add New Language

1. Update `src/lib/i18n-data.ts` - Add new locale
2. Create data file: `src/data/newlang.json`
3. Update `getStaticPaths()` in pages
4. Update Header.astro language switcher

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Check for errors
npm run build

# Common fixes:
npm install           # Reinstall dependencies
rm -rf dist          # Clean build folder
npm run build        # Rebuild
```

### Styles Not Applying

```bash
# Check Tailwind config
cat tailwind.config.mjs

# Verify global.css is imported
# Check src/pages/index.astro or layout files
```

### Images Not Loading

1. Check URL is correct (including ?w=1200&q=80)
2. Test URL in browser directly
3. Check for CORS issues
4. Verify internet connection

### Scroll Animations Not Working

1. Check browser console for errors
2. Verify `<script>` tag is present
3. Check element has correct class name
4. Verify Intersection Observer is supported

### Page Not Found (404)

1. Check file name matches URL pattern
2. Verify `[lang]` dynamic parameter
3. Check `getStaticPaths()` includes route
4. Try rebuilding: `npm run build`

---

## 📊 Performance Tips

### Improve Load Time

1. **Optimize Images**
   - Use WebP format
   - Compress before uploading
   - Use appropriate sizes (?w=800 for smaller images)

2. **Reduce JavaScript**
   - Minimize inline scripts
   - Use CSS animations instead of JS when possible
   - Lazy load images

3. **Enable Compression**
   - Configure server for gzip/brotli
   - Use CDN for static assets

### Improve Lighthouse Score

1. **Add Meta Tags**
   ```astro
   <title>Page Title</title>
   <meta name="description" content="Page description">
   <meta property="og:title" content="OG Title">
   ```

2. **Add Structured Data**
   ```javascript
   const structuredData = {
     '@context': 'https://schema.org',
     '@type': 'Organization',
     name: 'Posthinks',
     // ...
   };
   ```

3. **Optimize Fonts**
   - Use system fonts (already configured)
   - Preload critical fonts if needed

---

## 🧪 Testing

### Run Development Server

```bash
npm run dev
```

**Build for Production**

```bash
npm run build
```

**Preview Production Build**

```bash
npm run preview
```

### Check Generated Files

```bash
# List all generated pages
find dist -name "*.html" | sort

# Check specific page
cat dist/id/index.html
cat dist/en/solusi/index.html
```

---

## 📚 Documentation Files

All documentation is in: `docs/2025-02-08/`

1. **01-PROJECT-SUMMARY.md** - Complete overview
2. **02-SOLUSI-PAGE-CONTENT.md** - Solusi page details
3. **03-COMMUNITY-PAGE-CONTENT.md** - Community page details
4. **04-SECTIONS-CONTENT.md** - ImpactMetrics & ProcessSection
5. **05-TECHNICAL-GUIDE.md** - Technical implementation
6. **06-QUICK-START.md** - This file

---

## 🎯 Page URLs

### Development
- Home: http://localhost:4321/
- Home (ID): http://localhost:4321/
- Home (EN): http://localhost:4321/en
- Solusi: http://localhost:4321/solusi
- Solusi (EN): http://localhost:4321/en/solusi
- Community: http://localhost:4321/community
- Community (EN): http://localhost:4321/en/community

### Production
After `npm run build`, preview with `npm run preview`

---

## 📞 Support

### For Issues
1. Check documentation files above
2. Review Astro docs: https://docs.astro.build
3. Check Tailwind docs: https://tailwindcss.com/docs
4. Review code comments in source files

### Common Questions

**Q: How do I add a new blog post?**
A: Create markdown file in `src/content/blog/` with frontmatter

**Q: How do I change the primary color?**
A: Edit `--primary` in `src/styles/global.css` or `colors.primary` in `tailwind.config.mjs`

**Q: How do I update statistics?**
A: Edit values in `src/components/sections/ImpactMetrics.astro`

**Q: How do I add a new language?**
A: Follow steps in "Add New Language" section above

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Update all placeholder content
- [ ] Replace test images with production images
- [ ] Test all forms and CTAs
- [ ] Verify all links work
- [ ] Test in multiple browsers
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Set up analytics (if needed)
- [ ] Configure domain DNS
- [ ] Set up SSL/HTTPS
- [ ] Test build locally: `npm run build && npm run preview`

---

## 🎓 Learning Resources

### Astro
- [Astro Docs](https://docs.astro.build)
- [Astro GitHub](https://github.com/withastro/astro)
- [Astro Discord](https://astro.build/chat)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com/)
- [Tailwind GitHub](https://github.com/tailwindlabs/tailwindcss)

### TypeScript
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## 📈 Next Steps

### Recommended Improvements
1. Add actual blog content
2. Implement contact form
3. Add analytics (Google Analytics, Plausible)
4. Set up CI/CD pipeline
5. Add error monitoring (Sentry)
6. Implement search functionality
7. Add sitemap to robots.txt
8. Configure CDN

### Content Tasks
1. Replace Unsplash images with custom/branded images
2. Add real testimonials from clients
3. Update with actual event dates
4. Add case studies with real data
5. Update statistics quarterly
6. Add team member profiles
7. Create blog content strategy

---

**Happy Coding! 🚀**

For questions or issues, refer to the documentation files in `docs/2025-02-08/`.

**Last Updated:** 2026-02-08
**Version:** 1.0.0
