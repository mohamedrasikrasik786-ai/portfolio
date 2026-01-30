import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ResumeData, defaultResumeData } from '../types/resume';

const RESUME_DOC_ID = 'resume-data';
const COLLECTION_NAME = 'resume';

/**
 * Subscribe to Resume data changes
 */
export function subscribeToResumeData(callback: (data: ResumeData) => void): () => void {
  console.log('🟢 [ResumeService] Setting up subscription to resume/resume-data');
  const docRef = doc(db, COLLECTION_NAME, RESUME_DOC_ID);
  
  try {
    return onSnapshot(docRef, (docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as ResumeData;
          console.log('🟢 [ResumeService] Received update from Firebase:', data);
          callback(data);
        } else {
          console.log('⚠️ [ResumeService] No Resume data found in subscription, returning defaults');
          callback(defaultResumeData);
        }
      } catch (innerError) {
        // Silently suppress Firebase internal errors
        const errorMsg = String(innerError);
        if (!errorMsg.includes('FIRESTORE') && !errorMsg.includes('__PRIVATE')) {
          console.error('Error in snapshot handler:', innerError);
        }
        callback(defaultResumeData);
      }
    }, (error) => {
      // Silently suppress Firebase internal errors
      const errorMsg = String(error);
      if (!errorMsg.includes('FIRESTORE') && !errorMsg.includes('__PRIVATE') && !errorMsg.includes('INTERNAL ASSERTION')) {
        console.error('🔴 [ResumeService] Error subscribing to Resume data:', error);
      }
      callback(defaultResumeData);
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
 * Get Resume data from Firestore
 */
export async function getResumeData(): Promise<ResumeData> {
  try {
    const docRef = doc(db, COLLECTION_NAME, RESUME_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ResumeData;
    } else {
      console.log('No Resume data found, returning defaults');
      return defaultResumeData;
    }
  } catch (error) {
    console.error('Error fetching Resume data:', error);
    return defaultResumeData;
  }
}

/**
 * Update Resume data in Firestore
 */
export async function updateResumeData(data: Partial<ResumeData>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, RESUME_DOC_ID);
    const docSnap = await getDoc(docRef);

    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (docSnap.exists()) {
      await updateDoc(docRef, updateData);
      console.log('Resume data updated successfully');
    } else {
      await setDoc(docRef, {
        ...defaultResumeData,
        ...updateData,
        createdAt: serverTimestamp()
      });
      console.log('Resume data created successfully');
    }
  } catch (error) {
    console.error('Error updating Resume data:', error);
    throw error;
  }
}

/**
 * Initialize Resume data with defaults
 */
export async function initializeResumeData(): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, RESUME_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        ...defaultResumeData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('Resume data initialized with defaults');
    } else {
      console.log('Resume data already exists');
    }
  } catch (error) {
    console.error('Error initializing Resume data:', error);
    throw error;
  }
}