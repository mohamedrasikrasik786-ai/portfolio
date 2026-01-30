import { useEffect } from 'react';

/**
 * Prefetch images in the background to improve loading performance
 * @param urls Array of image URLs to prefetch
 * @param enabled Whether prefetching is enabled (default: true)
 * @param delay Delay before starting prefetch in ms (default: 1000)
 */
export function usePrefetchImages(
  urls: string[],
  enabled: boolean = true,
  delay: number = 1000
) {
  useEffect(() => {
    if (!enabled || !urls.length) return;

    const timer = setTimeout(() => {
      // Use requestIdleCallback if available for better performance
      const prefetchImages = () => {
        urls.forEach((url) => {
          if (url) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image';
            link.href = url;
            document.head.appendChild(link);
          }
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(prefetchImages);
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(prefetchImages, 0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [urls, enabled, delay]);
}
