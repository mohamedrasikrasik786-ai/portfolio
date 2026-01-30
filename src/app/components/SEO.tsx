import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1646021780609-9c908307edc5?q=80&w=1200&auto=format&fit=crop'; // Default OG image
const SITE_NAME = 'Mohamed Rasik';
const LINKEDIN_HANDLE = 'mohamedrasika'; // Update with your LinkedIn username (e.g., "rasik-designer")

export function SEO({ 
  title, 
  description, 
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  keywords = [],
  noIndex = false
}: SEOProps) {
  useEffect(() => {
    const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
    
    // Helper to set meta tag
    const setMetaTag = (property: string, content: string, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}='${property}']`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // ===== BASIC META TAGS =====
    document.title = title;
    
    setMetaTag('description', description, false);
    
    if (keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '), false);
    }

    if (author) {
      setMetaTag('author', author, false);
    }

    // Robots meta
    if (noIndex) {
      setMetaTag('robots', 'noindex, nofollow', false);
    } else {
      setMetaTag('robots', 'index, follow', false);
    }

    // ===== OPEN GRAPH TAGS =====
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:type', type);
    setMetaTag('og:url', currentUrl);
    setMetaTag('og:image', image);
    setMetaTag('og:image:width', '1200');
    setMetaTag('og:image:height', '630');
    setMetaTag('og:site_name', SITE_NAME);
    setMetaTag('og:locale', 'en_US');

    // Article-specific OG tags
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('article:published_time', publishedTime);
      }
      if (modifiedTime) {
        setMetaTag('article:modified_time', modifiedTime);
      }
      if (author) {
        setMetaTag('article:author', author);
      }
    }

    // ===== TWITTER CARD TAGS =====
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:site', LINKEDIN_HANDLE, false);
    setMetaTag('twitter:creator', LINKEDIN_HANDLE, false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', description, false);
    setMetaTag('twitter:image', image, false);
    setMetaTag('twitter:image:alt', title, false);

    // ===== CANONICAL URL =====
    if (canonical) {
      let linkCanonical = document.querySelector("link[rel='canonical']");
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonical);
    }

    // ===== ADDITIONAL META TAGS =====
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0', false);
    setMetaTag('theme-color', '#0E0E0E', false);
    setMetaTag('format-detection', 'telephone=no', false);
    
  }, [title, description, canonical, image, type, author, publishedTime, modifiedTime, keywords, noIndex]);

  return null;
}