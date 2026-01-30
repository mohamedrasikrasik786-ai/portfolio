import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { LandingPageData, defaultLandingData } from '../types/landing';

const LANDING_DOC_ID = 'landing-page-data';
const COLLECTION_NAME = 'landingPage';

/**
 * Subscribe to Landing Page data changes
 */
export function subscribeToLandingData(callback: (data: LandingPageData) => void): () => void {
  console.log('🟢 [LandingService] Setting up subscription to landingPage/landing-page-data');
  const docRef = doc(db, COLLECTION_NAME, LANDING_DOC_ID);
  
  try {
    return onSnapshot(docRef, (docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as LandingPageData;
          console.log('🟢 [LandingService] Received update from Firebase:', {
            backgroundImageUrl: data.backgroundImageUrl,
            subjectImageUrl: data.subjectImageUrl,
            titleLine1: data.titleLine1,
            titleLine2: data.titleLine2,
            titleLine3: data.titleLine3,
            updatedAt: data.updatedAt
          });
          callback(data);
        } else {
          console.log('⚠️ [LandingService] No Landing Page data found in subscription, returning defaults');
          callback(defaultLandingData);
        }
      } catch (innerError) {
        // Silently suppress Firebase internal errors
        const errorMsg = String(innerError);
        if (!errorMsg.includes('FIRESTORE') && !errorMsg.includes('__PRIVATE')) {
          console.error('Error in snapshot handler:', innerError);
        }
        callback(defaultLandingData);
      }
    }, (error) => {
      // Silently suppress Firebase internal errors
      const errorMsg = String(error);
      if (!errorMsg.includes('FIRESTORE') && !errorMsg.includes('__PRIVATE') && !errorMsg.includes('INTERNAL ASSERTION')) {
        console.error('🔴 [LandingService] Error subscribing to Landing Page data:', error);
      }
      callback(defaultLandingData);
    });
  } catch (error) {
    // Silently suppress Firebase internal errors
    const errorMsg = String(error);
    if (!errorMsg.includes('FIRESTORE') && !errorMsg.includes('__PRIVATE') && !errorMsg.includes('INTERNAL ASSERTION')) {
      console.error('Error setting up subscription:', error);
    }
    // Return a no-op unsubscribe function
    return () => {};
  }
}

/**
 * Get Landing Page data from Firestore
 */
export async function getLandingData(): Promise<LandingPageData> {
  try {
    const docRef = doc(db, COLLECTION_NAME, LANDING_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as LandingPageData;
    } else {
      // Return default data if document doesn't exist
      console.log('No Landing Page data found, returning defaults');
      return defaultLandingData;
    }
  } catch (error) {
    console.error('Error fetching Landing Page data:', error);
    return defaultLandingData;
  }
}

/**
 * Update Landing Page data in Firestore
 */
export async function updateLandingData(data: Partial<LandingPageData>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, LANDING_DOC_ID);
    const docSnap = await getDoc(docRef);

    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(docRef, updateData);
      console.log('Landing Page data updated successfully');
    } else {
      // Create new document with createdAt timestamp
      await setDoc(docRef, {
        ...defaultLandingData,
        ...updateData,
        createdAt: serverTimestamp()
      });
      console.log('Landing Page data created successfully');
    }
  } catch (error) {
    console.error('Error updating Landing Page data:', error);
    throw error;
  }
}

/**
 * Initialize Landing Page data with defaults (useful for first-time setup)
 */
export async function initializeLandingData(): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, LANDING_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        ...defaultLandingData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('Landing Page data initialized with defaults');
    } else {
      console.log('Landing Page data already exists');
    }
  } catch (error) {
    console.error('Error initializing Landing Page data:', error);
    throw error;
  }
}