# 🎬 Animation System Guide
## Accessible & Performant Animations for Posthinks Landing Page

### 🎯 Goals
- ✅ **Accessibility (a11y)**: WCAG 2.1 AA compliant
- ✅ **Performance**: 100 Lighthouse score capable
- ✅ **Consistency**: Reusable across all sections
- ✅ **User Control**: Respect user preferences

---

## 📦 Component: AnimateOnScroll

### Usage:
```astro
---
import AnimateOnScroll from '../components/ui/AnimateOnScroll.astro';
---

<AnimateOnScroll animation="fade-up" delay={100} class="p-8">
  <h2>Title</h2>
  <p>Content</p>
</AnimateOnScroll>
```

### Props:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | string | `'fade-up'` | Animation type |
| `delay` | number | `0` | Delay in ms |
| `duration` | number | `800` | Duration in ms |
| `threshold` | number | `0.1` | Visibility threshold (0-1) |
| `once` | boolean | `true` | Animate only once? |
| `as` | string | `'div'` | HTML tag to render |

### Animation Types:
- `fade-up` - Fade in + slide up (default)
- `fade-in` - Fade in + scale up
- `fade-left` - Fade in + slide from left
- `fade-right` - Fade in + slide from right
- `scale-up` - Scale up from 0.8 to 1
- `slide-up` - Slide up from below
- `slide-down` - Slide down from above
- `none` - No animation (visible immediately)

---

## 🎨 Implementation Examples

### Example 1: Section Header
```astro
<section>
  <AnimateOnScroll animation="fade-up" delay={0}>
    <div class="text-center mb-20">
      <h2 class="text-5xl font-bold">Title</h2>
      <p class="text-xl">Description</p>
    </div>
  </AnimateOnScroll>

  <AnimateOnScroll animation="fade-up" delay={100}>
    <div class="grid grid-cols-3 gap-8">
      <!-- Cards -->
    </div>
  </AnimateOnScroll>
</section>
```

### Example 2: Staggered Cards
```astro
<div class="grid grid-cols-3 gap-8">
  {items.map((item, index) => (
    <AnimateOnScroll
      key={item.id}
      animation="fade-up"
      delay={index * 100}
    >
      <div class="card">
        {item.content}
      </div>
    </AnimateOnScroll>
  ))}
</div>
```

### Example 3: Hero Section (Immediate)
```astro
<!-- For hero/above-fold content, trigger immediately -->
<section class="min-h-screen">
  <AnimateOnScroll
    animation="fade-in"
    delay={0}
    threshold={1.0}
    once={true}
  >
    <h1>Hero Title</h1>
  </AnimateOnScroll>
</section>
```

---

## ♿ Accessibility Best Practices

### 1. **Respect Prefers-Reduced-Motion**
✅ **Already implemented** in AnimateOnScroll component
```css
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
    transition: opacity 0.3s ease !important;
  }
}
```

### 2. **Focus States**
```html
<!-- Interactive elements need focus indicators -->
<a href="#" class="focus-visible:outline-none focus:ring-2">
  Click me
</a>
```

### 3. **ARIA Labels**
```html
<!-- Animated content should be properly labeled -->
<div role="region" aria-label="Case Studies">
  <AnimateOnScroll animation="fade-up">
    <!-- Content -->
  </AnimateOnScroll>
</div>
```

### 4. **Semantic HTML**
```html
<!-- ✅ Good - Semantic -->
<section>
  <h2>Title</h2>
  <p>Description</p>
</section>

<!-- ❌ Bad - Non-semantic -->
<div class="section">
  <div class="title">Title</div>
  <div class="description">Description</div>
</div>
```

### 5. **Keyboard Navigation**
- All interactive elements must be keyboard accessible
- No keyboard traps
- Tab order should be logical

---

## ⚡ Performance Best Practices

### 1. **Use IntersectionObserver**
✅ **Already implemented** - Only animate when visible
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isInterstituting) {
      // Trigger animation
    }
  });
}, { rootMargin: '0px 0px -50px 0px' });
```

### 2. **Web Animations API**
✅ **Already implemented** - More performant than CSS
```javascript
element.animate(keyframes, {
  duration: 800,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  fill: 'forwards'
});
```

### 3. **will-change Property**
✅ **Already implemented** - Hint browser for optimization
```css
[data-animate] {
  will-change: opacity, transform;
}

[data-animate].animated {
  will-change: auto; /* Remove after animation */
}
```

### 4. **Avoid Layout Thrashing**
```javascript
// ✅ Good - Batch DOM reads
const elements = document.querySelectorAll('.animate');
elements.forEach(el => {
  const rect = el.getBoundingClientRect();
});

// ❌ Bad - Causes reflow in loop
elements.forEach(el => {
  el.style.top = el.offsetTop + 'px'; // Triggers reflow!
});
```

### 5. **Passive Event Listeners**
```javascript
// ✅ Good
window.addEventListener('scroll', handler, { passive: true });

// ❌ Bad - Blocks scroll
window.addEventListener('scroll', handler);
```

### 6. **Cleanup Observers**
✅ **Already implemented** - Prevent memory leaks
```javascript
// Cleanup on navigation
window.addEventListener('beforeunload', cleanup);
```

---

## 🎯 Animation Principles

### DO's ✅
- ✅ Use IntersectionObserver for scroll-triggered animations
- ✅ Respect `prefers-reduced-motion`
- ✅ Keep animations short (600-800ms)
- ✅ Use easing functions (cubic-bezier)
- ✅ Clean up observers and animations
- ✅ Use semantic HTML
- ✅ Add focus states for interactive elements
- ✅ Provide alternatives for motion-sensitive users
- ✅ Test with keyboard navigation
- ✅ Test with screen readers

### DON'Ts ❌
- ❌ Don't animate every element (too chaotic)
- ❌ Don't use long animations (>1000ms)
- ❌ Don't use linear easing (feels robotic)
- ❌ Don't animate the same property twice (performance killer)
- ❌ Don't use !important (except for a11y overrides)
- ❌ Don't create keyboard traps
- ❌ Don't forget to test with screen readers
- ❌ Don't autoplay videos with sound

---

## 📊 Performance Optimization Checklist

### Lighthouse 100 Score Target:

#### Accessibility (100):
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] ARIA labels on interactive elements
- [ ] Skip links provided
- [ ] Reduced motion support

#### Performance (100):
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Speed Index < 3.4s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] No render-blocking resources

#### Best Practices:
- [ ] Lazy load images
- [ ] Defer non-critical JavaScript
- [ ] Minimize main-thread work
- [ ] Minimize critical request depth
- [ ] Use efficient animations (IntersectionObserver)
- [ ] Optimize images (WebP, compressed)
- [ ] Use modern image formats (AVIF)

---

## 🔧 Troubleshooting

### Problem: Animations not playing
**Solution**: Check if element is in viewport, verify threshold

### Problem: Animations too slow
**Solution**: Reduce duration (aim for 600-800ms)

### Problem: Janky animations
**Solution**: Use CSS transforms only (opacity, transform, scale)

### Problem: Animations not working on mobile
**Solution**: Check if element has `will-change` conflict

---

## 📈 Measuring Performance

### Tools:
1. **Lighthouse** - Chrome DevTools
2. **PageSpeed Insights** - web.dev
3. **Chrome DevTools Performance Tab**
4. **Web Vitals Extension**

### Key Metrics to Monitor:
- **LCP** (Largest Contentful Paint) - < 2.5s
- **FID** (First Input Delay) - < 100ms
- **CLS** (Cumulative Layout Shift) - < 0.1
- **FCP** (First Contentful Paint) - < 1.8s
- **TTI** (Time to Interactive) - < 3.8s

---

## 🎓 Quick Reference: Animation Types

| Animation | Best For | Duration |
|-----------|----------|----------|
| `fade-up` | Hero sections, cards, headers | 600-800ms |
| `fade-in` | Modals, overlays | 400-600ms |
| `fade-left` | Side panels | 500-700ms |
| `fade-right` | Side panels | 500-700ms |
| `scale-up` | CTAs, buttons | 400-600ms |
| `slide-up` | Lists, grids | 600-800ms |
| `slide-down` | Dropdowns | 400-600ms |

---

## 🚀 Migration Guide

### From Old CSS Animations:

**Before:**
```css
.animate-fade-up {
  opacity: 0;
  animation: fade-up 1s ease-out forwards;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**After (with AnimateOnScroll):**
```astro
<AnimateOnScroll animation="fade-up" delay={100}>
  <!-- Content -->
</AnimateOnScroll>
```

---

## 💡 Pro Tips

1. **Stagger animations** - Use `delay={index * 100}` for sequential reveals
2. **Above-fold content** - Use `threshold={1.0}` for immediate animation
3. **Repeated elements** - Use `once={false}` for re-trigger on scroll
4. **Hero sections** - Use `fade-in` for scale effect (more impactful)
5. **CTAs** - Use `scale-up` to draw attention
6. **Test often** - Test on different devices and connection speeds

---

## 📞 Support

For questions or issues, refer to:
- Astro docs: https://docs.astro.build
- Web Animations API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- Intersection Observer: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Web Vitals: https://web.dev/vitals/
