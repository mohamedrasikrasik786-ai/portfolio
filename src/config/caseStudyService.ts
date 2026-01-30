import { 
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  writeBatch,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import type { CaseStudy, CaseStudyListItem, CaseStudyFormData } from '../types/caseStudy';

const COLLECTION_NAME = 'caseStudies';
const SETTINGS_COLLECTION = 'settings';
const CATEGORIES_DOC_ID = 'categories';

const DEFAULT_CATEGORIES = [
  'Product Design',
  'Motion Graphics',
  'Secondary Case Study',
  'Graphic Design'
];

/**
 * Check if Firestore is initialized
 */
function checkFirestoreInitialized() {
  if (!db) {
    throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
  }
}

/**
 * Generate a URL-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get project categories
 */
export async function getProjectCategories(): Promise<string[]> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, SETTINGS_COLLECTION, CATEGORIES_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().items) {
      return docSnap.data().items as string[];
    }
    
    // If not exists, initialize with defaults
    if (import.meta.env?.DEV) {
      console.log('📁 Categories not found, using defaults');
    }
    return DEFAULT_CATEGORIES;
  } catch (error: any) {
    // Only log in development mode
    if (import.meta.env?.DEV) {
      if (error?.code === 'unavailable' || error?.message?.includes('offline')) {
        console.log('⚠️ Firestore initializing, using default categories');
      } else {
        console.error('Error getting categories:', error);
      }
    }
    // Return defaults on error so app doesn't crash
    return DEFAULT_CATEGORIES;
  }
}

/**
 * Update project categories
 */
export async function updateProjectCategories(categories: string[]): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, SETTINGS_COLLECTION, CATEGORIES_DOC_ID);
    await setDoc(docRef, { items: categories }, { merge: true });
  } catch (error) {
    console.error('Error updating categories:', error);
    throw error;
  }
}

/**
 * Rename a category and update all associated case studies
 */
export async function renameCategory(oldName: string, newName: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    
    // 1. Update categories list
    const categories = await getProjectCategories();
    const newCategories = categories.map(c => c === oldName ? newName : c);
    await updateProjectCategories(newCategories);
    
    // 2. Batch update all case studies with this category
    const collectionRef = collection(db, COLLECTION_NAME);
    const q = query(collectionRef, where('category', '==', oldName));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return;
    }
    
    const batch = writeBatch(db);
    querySnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { category: newName });
    });
    
    await batch.commit();
    console.log(`✅ Renamed category "${oldName}" to "${newName}" in ${querySnapshot.size} case studies`);
    
  } catch (error) {
    console.error('Error renaming category:', error);
    throw error;
  }
}

/**
 * Delete a category and optionally reassign its projects
 */
export async function deleteCategory(categoryName: string, newCategoryForProjects?: string): Promise<void> {
  try {
    checkFirestoreInitialized();

    // 1. Get all projects in this category
    const collectionRef = collection(db, COLLECTION_NAME);
    const q = query(collectionRef, where('category', '==', categoryName));
    const querySnapshot = await getDocs(q);

    // 2. Reassign projects if needed
    if (!querySnapshot.empty) {
      if (newCategoryForProjects) {
        const batch = writeBatch(db);
        querySnapshot.docs.forEach(doc => {
          batch.update(doc.ref, { category: newCategoryForProjects });
        });
        await batch.commit();
        console.log(`✅ Moved ${querySnapshot.size} projects from "${categoryName}" to "${newCategoryForProjects}"`);
      } else {
        // If we have projects but no new category, we technically leave them with the old string
        // or we could throw an error. The UI should handle ensuring a new category is picked.
        console.warn(`⚠️ Deleting category "${categoryName}" but it has ${querySnapshot.size} projects that were not reassigned.`);
      }
    }

    // 3. Remove from categories list
    const categories = await getProjectCategories();
    const newCategories = categories.filter(c => c !== categoryName);
    await updateProjectCategories(newCategories);
    
    console.log(`✅ Deleted category "${categoryName}"`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

/**
 * Subscribe to all case studies (real-time)
 */
export function subscribeToAllCaseStudies(callback: (projects: CaseStudyListItem[]) => void): () => void {
  checkFirestoreInitialized();
  const collectionRef = collection(db, COLLECTION_NAME);
  const q = query(collectionRef, orderBy('updatedAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => {
      const data = doc.data() as CaseStudy;
      const sectionCount = data.sections?.length || 0;
      const blockCount = data.sections?.reduce((acc, section) => acc + (section.blocks?.length || 0), 0) || 0;
      
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail,
        status: data.status,
        category: data.category,
        createdAt: data.createdAt || Timestamp.now(),
        updatedAt: data.updatedAt || Timestamp.now(),
        sectionCount,
        blockCount,
        featured: data.featured || false,
        comingSoon: data.comingSoon || false,
        views: data.views || 0
      } as CaseStudyListItem;
    });
    callback(projects);
  }, (error) => {
    console.error('Error subscribing to case studies:', error);
  });
}

/**
 * Subscribe to a single case study
 */
export function subscribeToCaseStudy(id: string, callback: (project: CaseStudy | null) => void): () => void {
  checkFirestoreInitialized();
  const docRef = doc(db, COLLECTION_NAME, id);

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      // Deserialize personas when loading
      callback(deserializeFromFirestore(data) as CaseStudy);
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error subscribing to case study:', error);
  });
}

/**
 * Get all case studies (admin view)
 */
export async function getAllCaseStudies(): Promise<CaseStudyListItem[]> {
  try {
    checkFirestoreInitialized();
    
    const collectionRef = collection(db, COLLECTION_NAME);
    const q = query(collectionRef, orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as CaseStudy;
      const sectionCount = data.sections?.length || 0;
      const blockCount = data.sections?.reduce((acc, section) => acc + (section.blocks?.length || 0), 0) || 0;
      
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail,
        status: data.status,
        category: data.category,
        createdAt: data.createdAt || Timestamp.now(),
        updatedAt: data.updatedAt || Timestamp.now(),
        sectionCount,
        blockCount,
        featured: data.featured || false,
        comingSoon: data.comingSoon || false,
        views: data.views || 0
      } as CaseStudyListItem;
    });
  } catch (error: any) {
    // If it's just an index error, log it but don't fail completely
    if (error?.code === 'failed-precondition' && error?.message?.includes('index')) {
      console.warn('⚠️ Firestore index needed. Using alternative query...');
      // Fallback: get all documents without ordering
      try {
        const collectionRef = collection(db, COLLECTION_NAME);
        const querySnapshot = await getDocs(collectionRef);
        const results = querySnapshot.docs.map(doc => {
          const data = doc.data() as CaseStudy;
          const sectionCount = data.sections?.length || 0;
          const blockCount = data.sections?.reduce((acc, section) => acc + (section.blocks?.length || 0), 0) || 0;
          
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            description: data.description,
            thumbnail: data.thumbnail,
            status: data.status,
            category: data.category,
            createdAt: data.createdAt || Timestamp.now(),
            updatedAt: data.updatedAt || Timestamp.now(),
            sectionCount,
            blockCount,
            featured: data.featured || false,
            comingSoon: data.comingSoon || false,
            views: data.views || 0
          } as CaseStudyListItem;
        });
        
        // Sort client-side
        return results.sort((a, b) => {
          const aTime = (a.updatedAt as any).toMillis ? (a.updatedAt as any).toMillis() : new Date(a.updatedAt).getTime();
          const bTime = (b.updatedAt as any).toMillis ? (b.updatedAt as any).toMillis() : new Date(b.updatedAt).getTime();
          return bTime - aTime;
        });
      } catch (fallbackError) {
        console.error('Error in fallback query:', fallbackError);
        throw fallbackError;
      }
    }
    
    console.error('Error getting all case studies:', error);
    throw error;
  }
}

/**
 * Get published case studies only (public view)
 */
export async function getPublishedCaseStudies(): Promise<CaseStudyListItem[]> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, COLLECTION_NAME);
    const q = query(
      collectionRef, 
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as CaseStudy;
      const sectionCount = data.sections?.length || 0;
      const blockCount = data.sections?.reduce((acc, section) => acc + (section.blocks?.length || 0), 0) || 0;
      
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail,
        status: data.status,
        category: data.category,
        createdAt: data.createdAt || Timestamp.now(),
        updatedAt: data.updatedAt || Timestamp.now(),
        sectionCount,
        blockCount,
        featured: data.featured || false,
        comingSoon: data.comingSoon || false,
        views: data.views || 0
      } as CaseStudyListItem;
    });
  } catch (error) {
    console.error('Error getting published case studies:', error);
    throw error;
  }
}

/**
 * Get a single case study by ID
 */
export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      // Deserialize personas when loading
      return deserializeFromFirestore(data) as CaseStudy;
    }
    return null;
  } catch (error) {
    console.error('Error getting case study:', error);
    throw error;
  }
}

/**
 * Get a case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, COLLECTION_NAME);
    const q = query(collectionRef, where('slug', '==', slug), where('status', '==', 'published'));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = { id: doc.id, ...doc.data() };
      // Deserialize personas when loading
      return deserializeFromFirestore(data) as CaseStudy;
    }
    return null;
  } catch (error) {
    console.error('Error getting case study by slug:', error);
    throw error;
  }
}

/**
 * Serialize case study data for Firestore (convert blocks to JSON to avoid nested entity issues)
 */
function serializeForFirestore(data: any): any {
  if (!data.sections || !Array.isArray(data.sections)) return data;
  
  // Convert blocks arrays to JSON strings to avoid Firestore nested entity limits
  return {
    ...data,
    sections: data.sections.map((section: any) => {
      if (!section.blocks || !Array.isArray(section.blocks)) {
        return section;
      }
      
      // Clean blocks before serialization - ensure no base64 images
      const cleanedBlocks = section.blocks.map((block: any) => {
        const cleanBlock = { ...block };
        
        // For image blocks, ensure URL is not base64
        if (cleanBlock.type === 'image' && cleanBlock.content && cleanBlock.content.startsWith('data:')) {
          console.warn('⚠️ Base64 image found in block, this should be uploaded to Cloudinary first');
          cleanBlock.content = ''; // Remove base64 to prevent size issues
        }
        
        // For users blocks with personas, ensure images are not base64
        if (cleanBlock.personas && Array.isArray(cleanBlock.personas)) {
          cleanBlock.personas = cleanBlock.personas.map((persona: any) => {
            if (persona.image && persona.image.startsWith('data:')) {
              console.warn('⚠️ Base64 image found in persona, this should be uploaded to Cloudinary first');
              return { ...persona, image: '' }; // Remove base64
            }
            return persona;
          });
        }
        
        return cleanBlock;
      });
      
      const { blocks, ...sectionWithoutBlocks } = section;
      const blocksJsonString = JSON.stringify(cleanedBlocks);
      
      // Log if JSON is getting large (Firestore limit is ~1MB per field)
      const sizeInBytes = new Blob([blocksJsonString]).size;
      if (sizeInBytes > 500000) {
        console.warn(`⚠️ Section blocksJson is large: ${(sizeInBytes / 1024).toFixed(2)} KB`);
      }
      
      return {
        ...sectionWithoutBlocks,
        blocksJson: blocksJsonString
      };
    })
  };
}

/**
 * Deserialize case study data from Firestore (convert JSON back to blocks arrays)
 */
function deserializeFromFirestore(data: any): any {
  if (!data.sections || !Array.isArray(data.sections)) return data;
  
  return {
    ...data,
    sections: data.sections.map((section: any) => {
      if (section.blocksJson) {
        try {
          const { blocksJson, ...sectionWithoutJson } = section;
          return {
            ...sectionWithoutJson,
            blocks: JSON.parse(blocksJson)
          };
        } catch (e) {
          console.error('Error parsing blocks:', e);
          return section;
        }
      }
      return section;
    })
  };
}

/**
 * Create a new case study
 */
export async function createCaseStudy(data: CaseStudyFormData): Promise<string> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, COLLECTION_NAME);
    
    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.title);
    
    // Serialize sections before saving
    const serializedData = serializeForFirestore(data);
    
    const docData = {
      ...serializedData,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(data.status === 'published' ? { publishedAt: serverTimestamp() } : {})
    };
    
    const docRef = await addDoc(collectionRef, docData);
    console.log('✅ Case study created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating case study:', error);
    throw error;
  }
}

/**
 * Update an existing case study
 */
export async function updateCaseStudy(id: string, data: Partial<CaseStudyFormData>): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, COLLECTION_NAME, id);
    
    // Serialize sections before saving
    const serializedData = serializeForFirestore(data);
    
    // Update slug if title changed
    const updates: any = {
      ...serializedData,
      updatedAt: serverTimestamp()
    };
    
    if (data.title) {
      updates.slug = data.slug || generateSlug(data.title);
    }
    
    // Update publishedAt if publishing for the first time
    if (data.status === 'published') {
      const existingDoc = await getDoc(docRef);
      if (existingDoc.exists() && existingDoc.data().status !== 'published') {
        updates.publishedAt = serverTimestamp();
      }
    }
    
    await updateDoc(docRef, updates);
    console.log('✅ Case study updated:', id);
  } catch (error) {
    console.error('Error updating case study:', error);
    throw error;
  }
}

/**
 * Delete a case study
 */
export async function deleteCaseStudy(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log('✅ Case study deleted:', id);
  } catch (error) {
    console.error('Error deleting case study:', error);
    throw error;
  }
}

/**
 * Toggle case study publish status
 */
export async function toggleCaseStudyStatus(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Case study not found');
    }
    
    const currentStatus = docSnap.data().status;
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    const updates: any = {
      status: newStatus,
      updatedAt: serverTimestamp()
    };
    
    // Set publishedAt when publishing
    if (newStatus === 'published' && !docSnap.data().publishedAt) {
      updates.publishedAt = serverTimestamp();
    }
    
    await updateDoc(docRef, updates);
    console.log('✅ Case study status toggled:', id, newStatus);
  } catch (error) {
    console.error('Error toggling case study status:', error);
    throw error;
  }
}

/**
 * Toggle case study coming soon status
 */
export async function toggleCaseStudyComingSoon(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Case study not found');
    }
    
    const currentComingSoon = docSnap.data().comingSoon || false;
    const newComingSoon = !currentComingSoon;
    
    const updates: any = {
      comingSoon: newComingSoon,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, updates);
    console.log('✅ Case study coming soon toggled:', id, newComingSoon);
  } catch (error) {
    console.error('Error toggling case study coming soon:', error);
    throw error;
  }
}

/**
 * Duplicate a case study
 */
export async function duplicateCaseStudy(id: string): Promise<string> {
  try {
    checkFirestoreInitialized();
    const original = await getCaseStudyById(id);
    if (!original) {
      throw new Error('Case study not found');
    }
    
    const duplicate: CaseStudyFormData = {
      ...original,
      title: `${original.title} (Copy)`,
      slug: generateSlug(`${original.title} copy ${Date.now()}`),
      status: 'draft'
    };
    
    // Remove Firebase-specific fields
    delete (duplicate as any).id;
    delete (duplicate as any).createdAt;
    delete (duplicate as any).updatedAt;
    delete (duplicate as any).publishedAt;
    
    return await createCaseStudy(duplicate);
  } catch (error) {
    console.error('Error duplicating case study:', error);
    throw error;
  }
}

/**
 * Increment view count for a case study
 * This function is optimized to avoid race conditions using Firestore's increment()
 */
export async function incrementCaseStudyView(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, COLLECTION_NAME, id);
    
    // Use Firestore's increment to safely update the counter
    await updateDoc(docRef, {
      views: increment(1)
    });
    
    if (import.meta.env?.DEV) {
      console.log('👁️ View tracked for case study:', id);
    }
  } catch (error) {
    // Silently fail to not interrupt user experience
    // Only log in development
    if (import.meta.env?.DEV) {
      console.error('Error incrementing view count:', error);
    }
  }
}
