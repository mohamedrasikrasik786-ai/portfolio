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
  limit,
  startAfter,
  DocumentData,
  Query,
  QueryConstraint,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { 
  Project, 
  ProjectDetails, 
  ContactMessage, 
  CreateDocument, 
  UpdateDocument,
  WithoutId 
} from '@/types';

// ==========================================
// GENERIC FIRESTORE OPERATIONS
// ==========================================

/**
 * Get a single document by ID
 */
export async function getDocument<T>(
  collectionName: string, 
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get all documents from a collection
 */
export async function getDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Add a new document
 */
export async function addDocument<T extends DocumentData>(
  collectionName: string,
  data: CreateDocument<T>
): Promise<string> {
  try {
    const collectionRef = collection(db, collectionName);
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collectionRef, docData);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update an existing document
 */
export async function updateDocument<T>(
  collectionName: string,
  docId: string,
  data: UpdateDocument<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

// ==========================================
// PROJECT SPECIFIC OPERATIONS
// ==========================================

/**
 * Get all published projects
 */
export async function getPublishedProjects(): Promise<Project[]> {
  return getDocuments<Project>('projects', [
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc')
  ]);
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(limitCount = 6): Promise<Project[]> {
  return getDocuments<Project>('projects', [
    where('status', '==', 'published'),
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  ]);
}

/**
 * Get project by ID
 */
export async function getProjectById(projectId: string): Promise<ProjectDetails | null> {
  return getDocument<ProjectDetails>('projects', projectId);
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  return getDocuments<Project>('projects', [
    where('status', '==', 'published'),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  ]);
}

/**
 * Search projects by tags
 */
export async function getProjectsByTags(tags: string[]): Promise<Project[]> {
  return getDocuments<Project>('projects', [
    where('status', '==', 'published'),
    where('tags', 'array-contains-any', tags),
    orderBy('createdAt', 'desc')
  ]);
}

/**
 * Add a new project
 */
export async function addProject(
  projectData: CreateDocument<ProjectDetails>
): Promise<string> {
  return addDocument<ProjectDetails>('projects', projectData);
}

/**
 * Update a project
 */
export async function updateProject(
  projectId: string,
  projectData: UpdateDocument<ProjectDetails>
): Promise<void> {
  return updateDocument<ProjectDetails>('projects', projectId, projectData);
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string): Promise<void> {
  return deleteDocument('projects', projectId);
}

// ==========================================
// CONTACT MESSAGE OPERATIONS
// ==========================================

/**
 * Submit a contact message
 */
export async function submitContactMessage(
  messageData: WithoutId<ContactMessage>
): Promise<string> {
  return addDocument<ContactMessage>('contactMessages', {
    ...messageData,
    status: 'new'
  } as CreateDocument<ContactMessage>);
}

/**
 * Get all contact messages
 */
export async function getContactMessages(
  status?: ContactMessage['status']
): Promise<ContactMessage[]> {
  const constraints: QueryConstraint[] = [
    orderBy('createdAt', 'desc')
  ];
  
  if (status) {
    constraints.unshift(where('status', '==', status));
  }
  
  return getDocuments<ContactMessage>('contactMessages', constraints);
}

/**
 * Update contact message status
 */
export async function updateContactMessageStatus(
  messageId: string,
  status: ContactMessage['status']
): Promise<void> {
  return updateDocument<ContactMessage>('contactMessages', messageId, {
    status,
    ...(status === 'replied' ? { repliedAt: Timestamp.now() } : {})
  });
}

// ==========================================
// ANALYTICS OPERATIONS
// ==========================================

/**
 * Track page view
 */
export async function trackPageView(
  page: string,
  referrer?: string
): Promise<void> {
  try {
    await addDocument('pageViews', {
      page,
      referrer: referrer || document.referrer || null,
      userAgent: navigator.userAgent,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    // Silently fail for analytics
    console.warn('Failed to track page view:', error);
  }
}

/**
 * Track project view
 */
export async function trackProjectView(
  projectId: string,
  projectTitle: string
): Promise<void> {
  try {
    await addDocument('projectViews', {
      projectId,
      projectTitle,
      page: window.location.pathname,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    // Silently fail for analytics
    console.warn('Failed to track project view:', error);
  }
}
