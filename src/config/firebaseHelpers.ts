/**
 * Firebase Helper Utilities
 * Provides fallback handling and error recovery
 */

import { db } from './firebase';

/**
 * Check if Firebase is available and initialized
 */
export function isFirebaseAvailable(): boolean {
  try {
    return !!db && typeof db !== 'undefined';
  } catch (error) {
    console.warn('Firebase availability check failed:', error);
    return false;
  }
}

/**
 * Safe Firebase operation wrapper
 * Executes Firebase operations with error handling
 */
export async function safeFirebaseOperation<T>(
  operation: () => Promise<T>,
  fallback?: T,
  errorMessage?: string
): Promise<T | null> {
  try {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not available, using fallback');
      return fallback || null;
    }
    return await operation();
  } catch (error) {
    console.error(errorMessage || 'Firebase operation failed:', error);
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}

/**
 * Get Firebase initialization status
 */
export function getFirebaseStatus() {
  const available = isFirebaseAvailable();
  return {
    available,
    message: available 
      ? '✅ Firebase is initialized and ready' 
      : '❌ Firebase is not available'
  };
}

/**
 * Test Firebase connection
 */
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    if (!isFirebaseAvailable()) {
      return false;
    }
    
    // Try to access Firestore with a simple query
    const { collection, getDocs, limit, query } = await import('firebase/firestore');
    
    // Try to query with a limit to minimize data transfer
    const testQuery = query(collection(db, 'caseStudies'), limit(1));
    await getDocs(testQuery);
    
    return true;
  } catch (error: any) {
    // Permission denied is actually good - means we can connect
    if (error?.code === 'permission-denied') {
      console.log('✅ Firebase connected (permission-denied is OK for connection test)');
      return true;
    }
    
    // Missing/insufficient permissions also means connected
    if (error?.code === 'unauthenticated') {
      console.log('✅ Firebase connected (unauthenticated is OK for connection test)');
      return true;
    }
    
    console.warn('Firebase connection test failed:', error);
    return false;
  }
}

/**
 * Initialize Firebase with retry logic
 */
export async function initializeWithRetry(
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const connected = await testFirebaseConnection();
      if (connected) {
        console.log(`✅ Firebase connected on attempt ${i + 1}`);
        return true;
      }
    } catch (error) {
      console.warn(`Firebase connection attempt ${i + 1} failed:`, error);
    }
    
    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  console.error('❌ Failed to connect to Firebase after', maxRetries, 'attempts');
  return false;
}
