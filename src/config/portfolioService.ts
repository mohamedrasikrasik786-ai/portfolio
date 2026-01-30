import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/config/firebase';
import type {
  Project,
  ProjectFormData,
  ProjectListItem,
  Category,
  AboutPage,
  ContactPage,
  SiteSettings,
  PendingImage
} from '@/types/portfolio';

// ========================================
// HELPER FUNCTIONS
// ========================================

function checkFirestoreInitialized() {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ========================================
// IMAGE COMPRESSION & UPLOAD
// ========================================

export async function compressImage(file: File, maxWidth: number = 2400, maxHeight: number = 2400, quality: number = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export async function uploadImage(pendingImage: PendingImage): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  try {
    // Compress image
    const compressedBlob = await compressImage(pendingImage.file);
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, pendingImage.path);
    await uploadBytes(storageRef, compressedBlob);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function deleteImage(url: string): Promise<void> {
  if (!storage || !url) return;
  
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.warn('Error deleting image:', error);
  }
}

// ========================================
// PROJECTS / WORKS
// ========================================

export async function getAllProjects(): Promise<ProjectListItem[]> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, 'works');
    const q = query(collectionRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Project;
      return {
        id: doc.id,
        name: data.name,
        cardTitle: data.cardTitle,
        cardSubtitle: data.cardSubtitle,
        cardImageUrl: data.cardImageUrl,
        category: data.category,
        isDraft: data.isDraft,
        isFeatured: data.isFeatured,
        isArchived: data.isArchived,
        order: data.order || 999,
        updatedAt: data.updatedAt || Timestamp.now()
      } as ProjectListItem;
    });
  } catch (error: any) {
    // Fallback if orderBy fails
    if (error?.code === 'failed-precondition') {
      const collectionRef = collection(db, 'works');
      const querySnapshot = await getDocs(collectionRef);
      const results = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Project;
        return {
          id: doc.id,
          name: data.name,
          cardTitle: data.cardTitle,
          cardSubtitle: data.cardSubtitle,
          cardImageUrl: data.cardImageUrl,
          category: data.category,
          isDraft: data.isDraft,
          isFeatured: data.isFeatured,
          isArchived: data.isArchived,
          order: data.order || 999,
          updatedAt: data.updatedAt || Timestamp.now()
        } as ProjectListItem;
      });
      return results.sort((a, b) => a.order - b.order);
    }
    throw error;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'works', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    return null;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
}

export async function createProject(data: ProjectFormData): Promise<string> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, 'works');

    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collectionRef, docData);
    console.log('✅ Project created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'works', id);

    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, updates);
    console.log('✅ Project updated:', id);
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'works', id);
    await deleteDoc(docRef);
    console.log('✅ Project deleted:', id);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

export async function toggleProjectFeatured(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'works', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Project not found');
    }

    const currentFeatured = docSnap.data().isFeatured || false;
    await updateDoc(docRef, {
      isFeatured: !currentFeatured,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error toggling featured:', error);
    throw error;
  }
}

export async function updateProjectOrder(id: string, newOrder: number): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'works', id);
    await updateDoc(docRef, {
      order: newOrder,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// ========================================
// CATEGORIES
// ========================================

export async function getAllCategories(): Promise<Category[]> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    checkFirestoreInitialized();
    const collectionRef = collection(db, 'categories');

    const docData = {
      ...data,
      slug: generateSlug(data.name),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collectionRef, docData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'categories', id);

    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (data.name) {
      updates.slug = generateSlug(data.name);
    }

    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'categories', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

// ========================================
// ABOUT PAGE
// ========================================

const ABOUT_DOC_ID = 'main';

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'about', ABOUT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as AboutPage;
    }
    return null;
  } catch (error) {
    console.error('Error getting about page:', error);
    throw error;
  }
}

export async function saveAboutPage(data: Omit<AboutPage, 'id' | 'updatedAt'>): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'about', ABOUT_DOC_ID);

    const docData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, docData, { merge: true });
    console.log('✅ About page saved');
  } catch (error) {
    console.error('Error saving about page:', error);
    throw error;
  }
}

// ========================================
// CONTACT PAGE
// ========================================

const CONTACT_DOC_ID = 'main';

export async function getContactPage(): Promise<ContactPage | null> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'contact', CONTACT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ContactPage;
    }
    return null;
  } catch (error) {
    console.error('Error getting contact page:', error);
    throw error;
  }
}

export async function saveContactPage(data: Omit<ContactPage, 'id' | 'updatedAt'>): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'contact', CONTACT_DOC_ID);

    const docData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, docData, { merge: true });
    console.log('✅ Contact page saved');
  } catch (error) {
    console.error('Error saving contact page:', error);
    throw error;
  }
}

// ========================================
// SITE SETTINGS
// ========================================

const SETTINGS_DOC_ID = 'main';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error('Error getting site settings:', error);
    throw error;
  }
}

export async function saveSiteSettings(data: Omit<SiteSettings, 'id' | 'updatedAt'>): Promise<void> {
  try {
    checkFirestoreInitialized();
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);

    const docData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, docData, { merge: true });
    console.log('✅ Site settings saved');
  } catch (error) {
    console.error('Error saving site settings:', error);
    throw error;
  }
}
