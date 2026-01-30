import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { AboutMeData, defaultAboutData } from '../types/about';

const ABOUT_DOC_ID = 'about-me-data';
const COLLECTION_NAME = 'aboutMe';

/**
 * Subscribe to About Me data changes
 */
export function subscribeToAboutData(callback: (data: AboutMeData) => void): () => void {
  const docRef = doc(db, COLLECTION_NAME, ABOUT_DOC_ID);
  
  try {
    const unsubscribe = onSnapshot(
      docRef, 
      (docSnap) => {
        try {
          if (docSnap.exists()) {
            const data = { id: docSnap.id, ...docSnap.data() } as AboutMeData;
            console.log('AboutService: Received update', data);
            callback(data);
          } else {
            console.log('No About Me data found, returning defaults');
            callback(defaultAboutData);
          }
        } catch (innerError) {
          console.error('Error processing About Me snapshot:', innerError);
          callback(defaultAboutData);
        }
      }, 
      (error) => {
        console.error('Error subscribing to About Me data:', error);
        callback(defaultAboutData);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up About Me subscription:', error);
    // Return no-op unsubscribe function
    return () => {};
  }
}

/**
 * Get About Me data from Firestore
 */
export async function getAboutData(): Promise<AboutMeData> {
  try {
    const docRef = doc(db, COLLECTION_NAME, ABOUT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() } as AboutMeData;
      
      // Migration: Ensure infoCards exists
      if (!data.infoCards) {
        data.infoCards = [
           { id: '1', label: 'POSITION', value: data.position || '' },
           { id: '2', label: 'CURRENT COMPANY', value: data.currentCompany || '' },
           { id: '3', label: 'DEGREE', value: data.degree || '' },
           { id: '4', label: 'EXPERIENCE', value: data.experience || '' },
           { id: '5', label: 'LOCATION', value: data.location || '' }
        ];
      }
      return data;
    } else {
      console.log('No About Me data found, returning defaults');
      return defaultAboutData;
    }
  } catch (error) {
    console.error('Error fetching About Me data:', error);
    return defaultAboutData;
  }
}

/**
 * Update About Me data in Firestore
 */
export async function updateAboutData(data: Partial<AboutMeData>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, ABOUT_DOC_ID);
    const docSnap = await getDoc(docRef);

    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (docSnap.exists()) {
      await updateDoc(docRef, updateData);
      console.log('About Me data updated successfully');
    } else {
      await setDoc(docRef, {
        ...defaultAboutData,
        ...updateData,
        createdAt: serverTimestamp()
      });
      console.log('About Me data created successfully');
    }
  } catch (error) {
    console.error('Error updating About Me data:', error);
    throw error;
  }
}

/**
 * Initialize About Me data with defaults
 */
export async function initializeAboutData(): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, ABOUT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        ...defaultAboutData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('About Me data initialized with defaults');
    } else {
      console.log('About Me data already exists');
    }
  } catch (error) {
    console.error('Error initializing About Me data:', error);
    throw error;
  }
}
