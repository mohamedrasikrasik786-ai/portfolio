// Cloudinary configuration from environment variables
// Default fallback values for Figma Make environment
const DEFAULT_CLOUDINARY_CONFIG = {
  cloudName: '',  // Empty means no default - user must configure
  uploadPreset: '' // Empty means no default - user must configure
};

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CONFIG.cloudName;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || DEFAULT_CLOUDINARY_CONFIG.uploadPreset;

// Check if Cloudinary is properly configured
export const isCloudinaryConfigured = () => {
  return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
};

// Log config source in development
if (import.meta.env?.DEV) {
  const isConfigured = isCloudinaryConfigured();
  if (isConfigured) {
    console.log(`🖼️ Cloudinary: CONFIGURED (using ${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ? '.env variables' : 'defaults'})`);
  } else {
    console.log(`⚠️ Cloudinary: NOT CONFIGURED - Image uploads will be disabled`);
    console.log(`   💡 Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env to enable uploads`);
  }
}

// Note: For signed uploads in production, move API secret to backend
// For now, using unsigned uploads with upload preset

/**
 * 📁 CLEAN & ORGANIZED CLOUDINARY FOLDER STRUCTURE
 * 
 * Each case study gets its own main folder with organized subfolders:
 * 
 * Home/
 * ├── pages/              ← Website pages
 * │   ├── landing/
 * │   ├── about/
 * │   └── footer/
 * │
 * ├── wedoura/           ← Case Study Main Folder
 * │   ├── case-study-images/    ← Content images
 * │   └── thumbnail/            ← Thumbnail image
 * │
 * ├── mobile-app/        ← Another Case Study
 * │   ├── case-study-images/
 * │   └── thumbnail/
 * │
 * └── assets/           ← General assets
 */
export const CLOUDINARY_FOLDERS = {
  // Page-specific folders
  PAGES: {
    LANDING: 'pages/landing',
    ABOUT: 'pages/about',
    FOOTER: 'pages/footer',
    CONTACT: 'pages/contact',
  },
  
  // General assets
  ASSETS: 'assets',
} as const;

/**
 * Get the Cloudinary folder path for a specific page
 */
export function getPageFolder(page: 'landing' | 'about' | 'footer' | 'contact'): string {
  const map = {
    landing: CLOUDINARY_FOLDERS.PAGES.LANDING,
    about: CLOUDINARY_FOLDERS.PAGES.ABOUT,
    footer: CLOUDINARY_FOLDERS.PAGES.FOOTER,
    contact: CLOUDINARY_FOLDERS.PAGES.CONTACT,
  };
  return map[page] || CLOUDINARY_FOLDERS.ASSETS;
}

/**
 * Clean case study name for folder
 * 
 * Examples:
 *   "WEDoura Platform" → "wedoura-platform"
 *   "Untitled Case Study" → "untitled"
 *   "Mobile App Redesign 2024" → "mobile-app-redesign-2024"
 */
function cleanCaseStudyName(caseTitle: string): string {
  let cleanName = caseTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Remove duplicate hyphens
    .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
  
  // Handle "Untitled" cases
  if (cleanName.includes('untitled')) {
    cleanName = 'untitled';
  }
  
  // Limit length for cleaner URLs
  cleanName = cleanName.substring(0, 50);
  
  return cleanName;
}

/**
 * Get the Cloudinary folder path for case study thumbnails
 * 
 * Structure: {case-name}/thumbnail/
 * Example: "wedoura/thumbnail/"
 */
export function getCaseStudyThumbnailFolder(caseTitle: string): string {
  const cleanName = cleanCaseStudyName(caseTitle);
  return `${cleanName}/thumbnail`;
}

/**
 * Get the Cloudinary folder path for case study content images
 * 
 * Structure: {case-name}/case-study-images/
 * Example: "wedoura/case-study-images/"
 */
export function getCaseStudyImagesFolder(caseTitle: string): string {
  const cleanName = cleanCaseStudyName(caseTitle);
  return `${cleanName}/case-study-images`;
}

/**
 * Get the main case study folder (for general use)
 * 
 * Structure: {case-name}/
 * Example: "wedoura/"
 */
export function getCaseStudyFolder(caseTitle: string): string {
  return cleanCaseStudyName(caseTitle);
}

/**
 * Get folder path by upload context
 */
export function getUploadFolder(context: {
  type: 'page' | 'case-thumbnail' | 'case-images' | 'asset';
  pageName?: string;
  caseStudyTitle?: string;
}): string {
  switch (context.type) {
    case 'page':
      if (context.pageName) {
        return getPageFolder(context.pageName as any);
      }
      return CLOUDINARY_FOLDERS.ASSETS;
      
    case 'case-thumbnail':
      if (context.caseStudyTitle) {
        return getCaseStudyThumbnailFolder(context.caseStudyTitle);
      }
      return CLOUDINARY_FOLDERS.ASSETS;
      
    case 'case-images':
      if (context.caseStudyTitle) {
        return getCaseStudyImagesFolder(context.caseStudyTitle);
      }
      return CLOUDINARY_FOLDERS.ASSETS;
      
    case 'asset':
    default:
      return CLOUDINARY_FOLDERS.ASSETS;
  }
}

/**
 * Upload a file to Cloudinary with clean folder structure
 * Uses unsigned upload preset (configure in Cloudinary settings)
 * 
 * @param file - The file to upload
 * @param folder - The folder path (use helper functions above)
 * @param onProgress - Optional progress callback
 * @returns Promise<string> - The uploaded file's secure URL
 */
export async function uploadToCloudinary(
  file: File, 
  folder: string = CLOUDINARY_FOLDERS.ASSETS,
  onProgress?: (progress: number) => void
): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration missing. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.');
  }

  const filename = generateUniqueFileName(file.name);
  
  console.log(`📤 [CLOUDINARY] Uploading to organized folder...`);
  console.log(`   📁 Folder: "${folder}"`);
  console.log(`   📄 File: "${filename}"`);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

    xhr.open("POST", url, true);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        console.log(`✅ [CLOUDINARY] Upload successful!`);
        console.log(`   🔗 URL: ${response.secure_url}`);
        console.log(`   📁 Stored in: ${response.public_id}`);
        resolve(response.secure_url);
      } else {
        try {
          const response = JSON.parse(xhr.responseText);
          const msg = response.error?.message || "Upload failed";
          console.error(`❌ [CLOUDINARY] Upload failed: ${msg}`);
          reject(new Error(msg));
        } catch (e) {
          console.error(`❌ [CLOUDINARY] Upload failed with unknown error`);
          reject(new Error("Upload failed"));
        }
      }
    };

    xhr.onerror = () => {
      console.error(`❌ [CLOUDINARY] Network error during upload`);
      reject(new Error("Network error"));
    };
    
    xhr.send(formData);
  });
}

/**
 * 🗑️ DELETE FILE FROM CLOUDINARY
 * 
 * Note: Deletion requires API secret, which should be handled server-side in production.
 * For development, we'll log a warning and skip deletion.
 */
export async function deleteFromCloudinary(imageUrl: string): Promise<boolean> {
  console.warn('⚠️ [CLOUDINARY] Image deletion requires server-side API. Skipping deletion.');
  console.log('   💡 Tip: In production, implement a server endpoint for deleting images.');
  
  // In a production environment, call your backend API:
  // const response = await fetch('/api/cloudinary/delete', {
  //   method: 'POST',
  //   body: JSON.stringify({ imageUrl })
  // });
  
  return true; // Return success to not block UI
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Generate unique, clean filename
 * 
 * Examples:
 *   "My Photo.jpg" → "my-photo_1768805123_abc123.jpg"
 *   "Screenshot 2024.png" → "screenshot-2024_1768805123_abc123.png"
 */
function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 9);
  const extension = originalName.split('.').pop();
  const nameWithoutExtension = originalName.replace(`.${extension}`, '');
  
  // Clean the name (lowercase, alphanumeric and hyphens only)
  const cleanName = nameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')  // Replace special chars with hyphens
    .replace(/-+/g, '-')           // Remove duplicate hyphens
    .replace(/^-+|-+$/g, '')       // Remove leading/trailing hyphens
    .substring(0, 30);             // Limit length
  
  return `${cleanName}_${timestamp}_${randomString}.${extension}`;
}