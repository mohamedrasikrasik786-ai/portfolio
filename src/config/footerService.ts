import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { FooterData, defaultFooterData } from '../types/footer';

const FOOTER_DOC_ID = 'footer-data';
const COLLECTION_NAME = 'siteConfig'; // Using a siteConfig collection for shared global elements

/**
 * Subscribe to Footer data changes
 */
export function subscribeToFooterData(callback: (data: FooterData) => void): () => void {
  console.log('🟢 [FooterService] Setting up subscription to siteConfig/footer-data');
  const docRef = doc(db, COLLECTION_NAME, FOOTER_DOC_ID);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = { ...defaultFooterData, ...docSnap.data() } as FooterData;
      console.log('🟢 [FooterService] Received update from Firebase:', data);
      callback(data);
    } else {
      console.log('⚠️ [FooterService] No Footer data found in subscription, returning defaults');
      callback(defaultFooterData);
    }
  }, (error) => {
    console.error('🔴 [FooterService] Error subscribing to Footer data:', error);
    callback(defaultFooterData);
  });
}

/**
 * Get Footer data from Firestore
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    const docRef = doc(db, COLLECTION_NAME, FOOTER_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...defaultFooterData, ...docSnap.data() } as FooterData;
    } else {
      // Return default data if document doesn't exist
      console.log('No Footer data found, returning defaults');
      return defaultFooterData;
    }
  } catch (error) {
    console.error('Error fetching Footer data:', error);
    return defaultFooterData;
  }
}

/**
 * Update Footer data in Firestore
 */
export async function updateFooterData(data: Partial<FooterData>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, FOOTER_DOC_ID);
    const docSnap = await getDoc(docRef);

    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(docRef, updateData);
      console.log('Footer data updated successfully');
    } else {
      // Create new document with createdAt timestamp
      await setDoc(docRef, {
        ...defaultFooterData,
        ...updateData,
        createdAt: serverTimestamp()
      });
      console.log('Footer data created successfully');
    }
  } catch (error) {
    console.error('Error updating Footer data:', error);
    throw error;
  }
}

/**
 * Initialize Footer data with defaults
 */
export async function initializeFooterData(): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, FOOTER_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        ...defaultFooterData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('Footer data initialized with defaults');
    } else {
      console.log('Footer data already exists');
    }
  } catch (error) {
    console.error('Error initializing Footer data:', error);
    throw error;
  }
}