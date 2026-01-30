// Import error suppression FIRST before any Firebase modules
import './errorSuppression';

import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { 
  getFirestore,
  initializeFirestore, 
  Firestore, 
  memoryLocalCache
} from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Default Firebase configuration (fallback for Figma Make environment)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBkRjP3QiZE_ZfBbbqYettBgOAR4C2fcdQ",
  authDomain: "my-website-b9bba.firebaseapp.com",
  projectId: "my-website-b9bba",
  storageBucket: "my-website-b9bba.firebasestorage.app",
  messagingSenderId: "2300278533",
  appId: "1:2300278533:web:b9218cb82e6d8439f9296c",
  measurementId: "G-FB88MLQWFB"
};

// Firebase configuration from environment variables (with fallback to defaults)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId
};

// Validate Firebase configuration
function validateFirebaseConfig() {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);
  
  if (missingFields.length > 0) {
    const errorMsg = `Missing Firebase configuration: ${missingFields.join(', ')}. Please check your .env file.`;
    console.error('❌ Firebase Config Error:', errorMsg);
    throw new Error(errorMsg);
  }
  
  // Log whether using env vars or defaults
  const usingEnvVars = !!import.meta.env.VITE_FIREBASE_API_KEY;
  if (import.meta.env?.DEV) {
    console.log(`🔧 Firebase config source: ${usingEnvVars ? 'Environment Variables (.env)' : 'Default Fallback'}`);
  }
}

// Validate config on initialization
validateFirebaseConfig();

// Initialize Firebase (singleton pattern)
function getFirebaseApp(): FirebaseApp {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }
  
  try {
    const app = initializeApp(firebaseConfig);
    if (import.meta.env?.DEV) {
      console.log('✅ Firebase v10.14.1 initialized');
    }
    return app;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error('❌ Firebase initialization error:', error);
    }
    throw error;
  }
}

// Initialize app
const app: FirebaseApp = getFirebaseApp();

// Initialize Auth
const auth: Auth = getAuth(app);

// Initialize Firestore
function getFirestoreInstance(): Firestore {
  try {
    // Try to initialize with memory cache settings first
    const db = initializeFirestore(app, {
      localCache: memoryLocalCache({
        garbageCollector: undefined
      })
    });
    if (import.meta.env?.DEV) {
      console.log('✅ Firestore initialized (memory-only)');
    }
    return db;
  } catch (error: any) {
    // If it fails (e.g. already initialized), fallback to getting the existing instance
    if (import.meta.env?.DEV) {
      if (error?.message?.includes('already been called')) {
        console.log('ℹ️ Firestore already initialized');
      } else {
        console.warn('⚠️ Could not initialize Firestore with settings, falling back to default:', error?.message);
      }
    }
    return getFirestore(app);
  }
}

const db: Firestore = getFirestoreInstance();

// Initialize Storage
const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics (browser only)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    if (import.meta.env?.DEV) {
      console.log('✅ Analytics initialized');
    }
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.warn('⚠️ Analytics not available');
    }
  }
}

if (import.meta.env?.DEV) {
  console.log('✅ All Firebase services ready');
}

// Export initialized instances
export { app, auth, db, storage, analytics };
export default app;