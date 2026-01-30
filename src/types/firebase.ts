import { Timestamp } from 'firebase/firestore';

// ==========================================
// USER TYPES
// ==========================================

export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserProfile extends User {
  bio?: string;
  website?: string;
  location?: string;
  phoneNumber?: string;
  role?: 'user' | 'admin' | 'moderator';
}

// ==========================================
// PROJECT TYPES
// ==========================================

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  year: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectDetails extends Project {
  content: string;
  tools: string[];
  duration?: string;
  client?: string;
  website?: string;
  gallery?: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

// ==========================================
// CONTACT/MESSAGE TYPES
// ==========================================

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: Timestamp;
  repliedAt?: Timestamp;
}

// ==========================================
// ANALYTICS TYPES
// ==========================================

export interface PageView {
  id: string;
  page: string;
  referrer?: string;
  userAgent?: string;
  timestamp: Timestamp;
}

export interface ProjectView extends PageView {
  projectId: string;
  projectTitle: string;
}

// ==========================================
// FORM TYPES
// ==========================================

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: Timestamp;
  status: 'active' | 'unsubscribed';
}

// ==========================================
// UTILITY TYPES
// ==========================================

export type FirestoreTimestamp = Timestamp;

export interface FirebaseError {
  code: string;
  message: string;
  name: string;
}

// Helper type for Firestore documents without ID
export type WithoutId<T> = Omit<T, 'id'>;

// Helper type for creating documents (without timestamps)
export type CreateDocument<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

// Helper type for updating documents
export type UpdateDocument<T> = Partial<Omit<T, 'id' | 'createdAt'>>;
