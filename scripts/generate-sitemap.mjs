#!/usr/bin/env node

/**
 * Automated Sitemap Generator for Digital Flux Portfolio
 * Runs automatically during build process
 * Fetches published case studies from Firebase and generates sitemap.xml
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BASE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://yourdomain.com';
const FIREBASE_CONFIG = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

console.log('🗺️  Starting automated sitemap generation...');
console.log(`📍 Base URL: ${BASE_URL}`);

/**
 * Fetch published case studies from Firebase
 */
async function fetchCaseStudies() {
  try {
    // Dynamic import of Firebase (ESM)
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, collection, query, where, getDocs } = await import('firebase/firestore');

    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);

    console.log('🔥 Connected to Firebase');

    // Query published case studies
    const caseStudiesRef = collection(db, 'caseStudies');
    const q = query(caseStudiesRef, where('status', '==', 'published'));
    const querySnapshot = await getDocs(q);

    const caseStudies = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      caseStudies.push({
        id: doc.id,
        slug: data.slug || doc.id,
        updatedAt: data.updatedAt,
        publishedAt: data.publishedAt,
      });
    });

    console.log(`✅ Found ${caseStudies.length} published case studies`);
    return caseStudies;

  } catch (error) {
    console.warn('⚠️  Could not fetch from Firebase:', error.message);
    console.log('📝 Generating sitemap with static pages only');
    return [];
  }
}

/**
 * Generate sitemap XML
 */
function generateSitemapXML(caseStudies) {
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { url: '#work', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { url: '#about', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: '#contact', priority: '0.8', changefreq: 'monthly', lastmod: today },
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add case study pages
  caseStudies.forEach(study => {
    let lastmod = today;
    
    // Try to get lastmod from updatedAt or publishedAt
    if (study.updatedAt) {
      try {
        const date = study.updatedAt.toDate ? study.updatedAt.toDate() : new Date(study.updatedAt.seconds * 1000);
        lastmod = date.toISOString().split('T')[0];
      } catch (e) {
        // Use today as fallback
      }
    }

    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/case-study/${study.id}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

/**
 * Main execution
 */
async function main() {
  try {
    // Fetch case studies
    const caseStudies = await fetchCaseStudies();

    // Generate XML
    const xml = generateSitemapXML(caseStudies);

    // Write to public directory
    const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(sitemapPath, xml, 'utf-8');

    console.log('✅ Sitemap generated successfully!');
    console.log(`📄 Location: ${sitemapPath}`);
    console.log(`🔗 URL: ${BASE_URL}/sitemap.xml`);
    console.log(`📊 Total URLs: ${4 + caseStudies.length} (4 static + ${caseStudies.length} case studies)`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    
    // Generate minimal sitemap as fallback
    console.log('🔄 Generating minimal sitemap as fallback...');
    const xml = generateSitemapXML([]);
    const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(sitemapPath, xml, 'utf-8');
    console.log('✅ Minimal sitemap generated');
    
    process.exit(0); // Don't fail the build
  }
}

main();
