import { storage } from '@/config/firebase';
import { 
  ref, 
  getDownloadURL, 
  deleteObject,
  listAll
} from 'firebase/storage';
import { 
  uploadToCloudinary, 
  getPageFolder, 
  getCaseStudyFolder,
  getCaseStudyThumbnailFolder,
  getCaseStudyImagesFolder,
  getUploadFolder,
  CLOUDINARY_FOLDERS 
} from './cloudinary';

// ==========================================
// STORAGE OPERATIONS (CLOUDINARY BACKED)
// ==========================================

/**
 * Upload a file to Cloudinary with smart folder organization
 * 
 * Usage examples:
 * - uploadFile(file, 'landing/bg.jpg') → goes to portfolio/pages/landing/
 * - uploadFile(file, 'about/profile.jpg') → goes to portfolio/pages/about/
 * - uploadFile(file, 'case-wedoura/hero.jpg') → goes to portfolio/case-studies/wedoura/
 */
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    // Validate file size (10MB limit for Cloudinary Free Tier)
    const validation = validateFile(file, { maxSizeMB: 10 });
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Smart folder detection from path
    const folder = detectFolderFromPath(path);
    
    console.log(`📂 Smart upload detected: "${path}" → Cloudinary folder: "${folder}"`);
    
    // Upload to Cloudinary with organized folder structure
    const url = await uploadToCloudinary(file, folder, onProgress);
    return url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
}

/**
 * Detect Cloudinary folder from upload path
 * Intelligently maps paths to clean organized folders
 */
function detectFolderFromPath(path: string): string {
  const pathLower = path.toLowerCase();
  
  // Extract the first part of the path (before the first /)
  const firstPart = pathLower.split('/')[0];
  
  // Page-specific uploads → pages/[page-name]
  if (firstPart === 'landing' || firstPart.includes('hero')) {
    return CLOUDINARY_FOLDERS.PAGES.LANDING;
  }
  if (firstPart === 'about') {
    return CLOUDINARY_FOLDERS.PAGES.ABOUT;
  }
  if (firstPart === 'footer') {
    return CLOUDINARY_FOLDERS.PAGES.FOOTER;
  }
  if (firstPart === 'contact') {
    return CLOUDINARY_FOLDERS.PAGES.CONTACT;
  }
  
  // Case study uploads → case-studies/[clean-name]
  if (firstPart === 'projects' || firstPart === 'casestudies' || firstPart === 'cases') {
    // Extract project name from path: projects/wedoura/image.jpg
    const parts = pathLower.split('/');
    if (parts.length >= 2 && parts[1] !== 'content') {
      const projectName = parts[1];
      return getCaseStudyFolder(projectName);
    }
    // Fallback to general case-studies folder
    return CLOUDINARY_FOLDERS.CASE_STUDIES.ROOT;
  }
  
  // Case study uploads (pattern: case-{name})
  if (firstPart.startsWith('case-') || firstPart.startsWith('casestudy-')) {
    const caseName = firstPart.replace(/^case[-_]?(?:study)?[-_]?/, '');
    return getCaseStudyFolder(caseName);
  }
  
  // Fallback to assets folder
  console.log(`📁 [Storage] Using assets folder for: ${path}`);
  return CLOUDINARY_FOLDERS.ASSETS;
}

/**
 * Upload file to specific page folder
 * Cleaner API for page-specific uploads
 */
export async function uploadPageFile(
  file: File,
  page: 'landing' | 'about' | 'footer' | 'contact',
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const validation = validateFile(file, { maxSizeMB: 10 });
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const folder = getPageFolder(page);
    console.log(`📄 Uploading to ${page} page folder: ${folder}`);
    
    const url = await uploadToCloudinary(file, folder, onProgress);
    return url;
  } catch (error) {
    console.error(`Error uploading ${page} file:`, error);
    throw error;
  }
}

/**
 * Upload file to specific case study folder
 * Each case study gets its own organized folder
 */
export async function uploadCaseStudyFile(
  file: File,
  caseStudyId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const validation = validateFile(file, { maxSizeMB: 10 });
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const folder = getCaseStudyFolder(caseStudyId);
    console.log(`📁 Uploading to case study "${caseStudyId}" folder: ${folder}`);
    
    const url = await uploadToCloudinary(file, folder, onProgress);
    return url;
  } catch (error) {
    console.error(`Error uploading case study file for ${caseStudyId}:`, error);
    throw error;
  }
}

/**
 * Upload multiple files (batch upload)
 */
export async function uploadMultipleFiles(
  files: File[],
  pathPrefix: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> {
  const uploadPromises = files.map((file, index) => {
    return uploadFile(
      file,
      `${pathPrefix}/${file.name}`,
      (progress) => onProgress?.(index, progress)
    );
  });

  return Promise.all(uploadPromises);
}

// ==========================================
// FILE VALIDATION
// ==========================================

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSizeMB = 10, allowedTypes } = options;

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds ${maxSizeMB}MB limit`
    };
  }

  // Check file type if specified
  if (allowedTypes && allowedTypes.length > 0) {
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    const isValidType = allowedTypes.some(type => {
      if (type.includes('*')) {
        // Wildcard type like 'image/*'
        return fileType.startsWith(type.replace('*', ''));
      }
      return fileType === type || fileExtension === type;
    });

    if (!isValidType) {
      return {
        valid: false,
        error: `File type not allowed. Allowed: ${allowedTypes.join(', ')}`
      };
    }
  }

  return { valid: true };
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Check if file is a PDF
 */
export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf';
}

// ==========================================
// LEGACY FIREBASE STORAGE (FALLBACK)
// ==========================================

/**
 * Delete a file 
 * Note: Cloudinary delete requires server-side Admin API
 * This only works for Firebase Storage (legacy)
 */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    console.warn('⚠️ Delete requested for:', filePath);
    console.warn('⚠️ Cloudinary deletion requires Admin API (not implemented in client)');
    console.warn('   Files remain on Cloudinary. Delete manually from dashboard if needed.');
    
    // If it's a Firebase Storage path, try to delete from Firebase
    if (filePath.includes('firebasestorage')) {
      try {
        const storageRef = ref(storage, filePath);
        await deleteObject(storageRef);
        console.log('✅ Deleted from Firebase Storage');
      } catch (err) {
        console.log('File not in Firebase Storage');
      }
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

/**
 * Get file download URL
 * For Cloudinary URLs, just return as-is
 * For Firebase paths, get download URL
 */
export async function getFileURL(filePathOrUrl: string): Promise<string> {
  // If it's already a full URL (Cloudinary), return it
  if (filePathOrUrl.startsWith('http://') || filePathOrUrl.startsWith('https://')) {
    return filePathOrUrl;
  }

  // Otherwise, try to get Firebase download URL
  try {
    const storageRef = ref(storage, filePathOrUrl);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting file URL:', error);
    return filePathOrUrl;
  }
}

/**
 * List all files in a directory
 * Note: This only works for Firebase Storage
 */
export async function listFiles(path: string): Promise<string[]> {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    const urls = await Promise.all(
      result.items.map(item => getDownloadURL(item))
    );
    return urls;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}