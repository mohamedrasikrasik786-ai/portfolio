#!/usr/bin/env node

/**
 * Automated Sitemap Generator
 * - Runs during build
 * - Fetches published case studies from Firebase
 * - Generates sitemap.xml safely for Netlify (Vite)
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ===============================
   CONFIGURATION
================================ */

const BASE_URL =
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://yourdomain.com";

const FIREBASE_CONFIG = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Netlify publishes `dist`
const OUTPUT_DIR = join(__dirname, "..", "dist");
const SITEMAP_PATH = join(OUTPUT_DIR, "sitemap.xml");

console.log("🗺️  Starting automated sitemap generation...");
console.log(`📍 Base URL: ${BASE_URL}`);

/* ===============================
   FETCH CASE STUDIES
================================ */

async function fetchCaseStudies() {
  try {
    const { initializeApp } = await import("firebase/app");
    const {
      getFirestore,
      collection,
      query,
      where,
      getDocs,
    } = await import("firebase/firestore");

    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);

    console.log("🔥 Connected to Firebase");

    const caseStudiesRef = collection(db, "caseStudies");
    const q = query(caseStudiesRef, where("status", "==", "published"));
    const snapshot = await getDocs(q);

    const caseStudies = [];

    snapshot.forEach((doc) => {
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
    console.warn("⚠️  Firebase fetch failed:", error.message);
    console.log("📝 Falling back to static pages only");
    return [];
  }
}

/* ===============================
   GENERATE XML
================================ */

function generateSitemapXML(caseStudies) {
  const today = new Date().toISOString().split("T")[0];

  // ⚠️ Anchors removed (SEO correct)
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "weekly", lastmod: today },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Case study pages
  caseStudies.forEach((study) => {
    let lastmod = today;

    if (study.updatedAt?.toDate) {
      lastmod = study.updatedAt.toDate().toISOString().split("T")[0];
    }

    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/case-study/${study.slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

/* ===============================
   WRITE FILE SAFELY
================================ */

function writeSitemap(xml) {
  // ✅ Ensure dist/ exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // ✅ Write sitemap
  writeFileSync(SITEMAP_PATH, xml, "utf-8");

  return SITEMAP_PATH;
}

/* ===============================
   MAIN
================================ */

async function main() {
  try {
    const caseStudies = await fetchCaseStudies();
    const xml = generateSitemapXML(caseStudies);
    const path = writeSitemap(xml);

    console.log("✅ Sitemap generated successfully!");
    console.log(`📄 Location: ${path}`);
    console.log(`🔗 URL: ${BASE_URL}/sitemap.xml`);
    console.log(
      `📊 Total URLs: ${1 + caseStudies.length} (1 static + ${caseStudies.length} case studies)`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Sitemap generation failed:", error);

    // Absolute fallback (never fail build)
    const xml = generateSitemapXML([]);
    writeSitemap(xml);

    console.log("✅ Minimal sitemap generated as fallback");
    process.exit(0);
  }
}

main();
