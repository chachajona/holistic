# Image Optimization Guide

This guide explains our comprehensive approach to image optimization across the
application, covering all three types of image sources:

1. Static imports from `src/assets`
2. Public folder images
3. Sanity CMS images

Our approach ensures fast loading times, great user experience, and proper
accessibility.

## Table of Contents

- [Overview](#overview)
- [Static Images in src/assets](#static-images-in-srcassets)
- [Public Folder Images](#public-folder-images)
- [Sanity CMS Images](#sanity-cms-images)
- [Common Components](#common-components)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

We use different strategies based on the image source:

1. **Static imports**: Next.js built-in blur placeholders with automatic
   optimization
2. **Public folder images**: Server-side generated blur placeholders using Sharp
   or fallback SVGs
3. **Sanity CMS images**: Server components that process and optimize Sanity
   images

All approaches share a common goal: providing a smooth loading experience with
blur placeholders, proper sizing, and format optimization.

## Static Images in src/assets

When importing images directly from the assets folder, Next.js automatically
generates blur placeholders at build time.

```tsx
// 1. Import the image as a module
import heroImage from "@/assets/images/hero.jpg";

import { OptimizedImage } from "@/components/ui/optimized-image";

// 2. Use the imported image directly with the OptimizedImage component
<OptimizedImage
    image={heroImage} // Pass the entire imported object, not just heroImage.src
    alt="Hero image"
    fill
    sizes="100vw"
    priority={true} // For above-the-fold images
    className="object-cover"
/>;
```

**Key benefits**:

- Zero runtime overhead - blur placeholders are generated at build time
- Automatic format optimization (WebP, AVIF)
- Next.js handles responsive sizing

**Example**: See the `QuickLinks` component implementation.

## Public Folder Images

For images in the public folder, we generate blur placeholders on the server
side:

```tsx
// Server Component
import { getBlurDataUrl } from "@/lib/server/simple-blur";

async function PageWithHeroImage() {
    // Generate blur placeholder
    const blurDataURL = await getBlurDataUrl("/hero-image.jpg");

    // Pass to client component
    return <HeroSection heroBlurDataURL={blurDataURL} />;
}

// Client Component
function HeroSection({ heroBlurDataURL }) {
    return (
        <OptimizedImage
            image="/hero-image.jpg"
            alt="Hero"
            fill
            sizes="100vw"
            blurDataURL={heroBlurDataURL}
        />
    );
}
```

**Key benefits**:

- Reduced client-side JavaScript
- Works without Sharp if necessary (falls back to SVG placeholders)
- Server-side generation for better performance

**Example**: See the `Hero` component implementation.

## Sanity CMS Images

For Sanity CMS images, we use a specialized approach:

```tsx
import { SanityImageLoader } from "@/components/ui/sanity-image-loader";

// In a server component:
<SanityImageLoader
    image={post.mainImage} // Sanity image reference
    alt="Featured image"
    aspectRatio={16 / 9}
    priority={true}
/>;
```

Behind the scenes, this:

1. Processes the Sanity image on the server to generate optimized placeholder
2. Renders the image with the placeholder using Next.js Image component
3. Handles loading states with Suspense

**Key benefits**:

- Built specifically for Sanity's image model
- Server-side processing with client-side rendering
- Handles fallbacks gracefully

**Example**: See the blog post page implementation.

## Common Components

### OptimizedImage

The core component that handles all image types:

```tsx
<OptimizedImage
    image={imageSource} // Can be a static import, URL string, or Sanity reference
    alt="Description"
    width={800} // Optional if using fill
    height={600} // Optional if using fill
    fill={false} // Set to true to fill container
    sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes
    priority={false} // Set true for above-the-fold images
    className="object-cover rounded-lg" // Optional styling
    blurDataURL={blurDataURL} // Only needed for non-static imports
/>
```

### SanityImageLoader

A specialized component for Sanity images:

```tsx
<SanityImageLoader
    image={sanityImageReference}
    alt="Description"
    aspectRatio={16 / 9} // Optional aspect ratio
    priority={false}
    className="rounded-lg"
/>
```

## Best Practices

1. **Use Static Imports When Possible**: They provide the best performance with
   zero runtime cost.

2. **Set `priority` for Above-the-Fold Images**: Add `priority={true}` to
   critical images to improve LCP.

3. **Provide Accurate `alt` Text**: For accessibility and SEO.

4. **Specify `sizes` Attribute**: To help Next.js generate proper responsive
   sizes.

5. **Use `aspectRatio` When Possible**: To prevent layout shift during loading.

6. **Don't Oversize Images**: Use appropriate dimensions for your design.

7. **Set `fill` for Container-Sized Images**: When the image should expand to
   fill its container.

## Troubleshooting

### Sharp Installation Issues

If you encounter issues with Sharp:

1. Try reinstalling with platform-specific flags:

    ```bash
    npm uninstall sharp && npm install --platform=darwin --arch=arm64 sharp
    ```

2. If Sharp still fails, the system will fall back to SVG placeholders,
   maintaining functionality.

### SVG Fallback Mechanism

When Sharp is unavailable, we generate simple SVG-based placeholders:

```tsx
// Function that creates an SVG placeholder when Sharp isn't available
export function generateSvgPlaceholder(
    width: number = 700,
    height: number = 475,
): string {
    // Create a simple blurred rectangle SVG
    const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#CCCCCC" />
      <filter id="blur" x="0" y="0">
        <feGaussianBlur stdDeviation="20" />
      </filter>
      <rect width="${width}" height="${height}" fill="#CCCCCC" filter="url(#blur)" />
    </svg>
  `;

    // Convert SVG to base64
    const base64Svg = Buffer.from(svg).toString("base64");
    return `data:image/svg+xml;base64,${base64Svg}`;
}

// Example usage in the getBlurDataUrl function
export async function getBlurDataUrl(imagePath: string): Promise<string> {
    try {
        // Attempt to generate blur with Sharp
        return await generateSharpBlur(imagePath);
    } catch (error) {
        console.warn(`Sharp failed, using SVG fallback for ${imagePath}`);
        // Fall back to SVG placeholder
        return generateSvgPlaceholder();
    }
}
```

This fallback ensures your application remains functional even when Sharp
dependencies have issues, with minimal visual disruption to users.

### Image Quality Issues

- For Sanity images, adjust quality using the `urlFor` builder:

    ```tsx
    urlFor(image).width(800).quality(80).url();
    ```

- For static images, optimize them before import using tools like ImageOptim or
  TinyPNG.

### Layout Shift Issues

- If you see layout shifts during loading, ensure you're using either:
    - Fixed `width` and `height`
    - `fill` with a container that has a defined size
    - The `aspectRatio` prop with SanityImageLoader

## Performance Metrics

To measure the impact of your image optimizations, use these tools and metrics:

### Core Web Vitals

Monitor these key metrics before and after implementing optimizations:

1. **Largest Contentful Paint (LCP)**:

    - Target: < 2.5 seconds
    - Improved by: `priority` flag on hero images, proper sizing, and blur
      placeholders
    - Monitor in Chrome DevTools Performance tab or Web Vitals extension

2. **Cumulative Layout Shift (CLS)**:

    - Target: < 0.1
    - Improved by: proper `width`/`height`, `aspectRatio`, and placeholder
      dimensions
    - Visible in the Performance panel as layout shifts

3. **First Contentful Paint (FCP)**:
    - Target: < 1.8 seconds
    - Improved by: properly sized and optimized images

### Testing Tools

1. **Lighthouse**:

    ```bash
    # Using Lighthouse CLI
    npm install -g lighthouse
    lighthouse https://your-site.com --view
    ```

    Look for the "Properly size images" and "Serve images in next-gen formats"
    audits.

2. **WebPageTest**:

    - Provides filmstrip views showing visual loading progress
    - Measures Time to First Byte and fully loaded times
    - Shows image compression opportunities

3. **Next.js Analytics**:
    - Enable with `withWebVitals` in your Next.js config
    - Provides real user metrics for your production deployment

### Before/After Benchmarks

Document performance improvements by capturing these metrics:

| Metric    | Before Optimization | After Optimization | Improvement |
| --------- | ------------------- | ------------------ | ----------- |
| LCP       | 3.2s                | 1.8s               | 44%         |
| CLS       | 0.25                | 0.05               | 80%         |
| Page Size | 2.4MB               | 0.8MB              | 67%         |

## Caching Strategies

Generating blur placeholders on the server can impact performance for frequently
accessed images. Implement these caching strategies to minimize this overhead:

### In-Memory Caching

For high-traffic pages or frequently used images:

```tsx
// Simple in-memory cache for blur data URLs
const blurCache = new Map<string, string>();

export async function getCachedBlurDataUrl(imagePath: string): Promise<string> {
    // Check if the blur URL is already in cache
    if (blurCache.has(imagePath)) {
        return blurCache.get(imagePath)!;
    }

    // Generate the blur data URL
    const blurDataURL = await getBlurDataUrl(imagePath);

    // Store in cache for future requests
    blurCache.set(imagePath, blurDataURL);

    return blurDataURL;
}
```

### Persistent Caching with Redis

For distributed systems or serverless environments:

```tsx
// Example using Redis for blur data caching
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
});

export async function getPersistedBlurDataUrl(
    imagePath: string,
): Promise<string> {
    const cacheKey = `blur:${imagePath}`;

    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached) return cached as string;

    // Generate if not cached
    const blurDataURL = await getBlurDataUrl(imagePath);

    // Store with expiration (e.g., 7 days)
    await redis.set(cacheKey, blurDataURL, { ex: 60 * 60 * 24 * 7 });

    return blurDataURL;
}
```

### Build-time Generation

For static sites, pre-generate blur placeholders at build time:

```tsx
// In your build script or getStaticProps
export async function getStaticProps() {
    // Pre-compute blur placeholders for known images
    const heroBlur = await getBlurDataUrl("/hero.jpg");
    const featuredImagesBlur = await Promise.all(
        featuredImagePaths.map(path => getBlurDataUrl(path)),
    );

    return {
        props: {
            heroBlur,
            featuredImagesBlur,
            // other props
        },
        // Optional revalidation period
        revalidate: 3600,
    };
}
```

### CDN Caching

For production deployments:

1. Set appropriate cache headers for blur placeholder endpoints
2. Consider using Edge Functions (Vercel/Cloudflare) to cache blur generation
   closer to users
3. Implement a CDN like Cloudflare or Fastly in front of blur generation APIs

These caching strategies significantly reduce server load and improve response
times, especially for frequently viewed pages with multiple images.
