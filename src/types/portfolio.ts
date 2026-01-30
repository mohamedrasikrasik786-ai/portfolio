import { Timestamp } from 'firebase/firestore';

// ========================================
// PROJECT / WORK TYPES
// ========================================

export type ContentBlockType = 
  | 'text' 
  | 'image' 
  | 'two-column' 
  | 'three-column' 
  | 'grid' 
  | 'heading' 
  | 'quote' 
  | 'metrics' 
  | 'users' 
  | 'user-flow';

export type AspectRatio = 'square' | 'portrait' | 'landscape' | 'wide' | 'ultra-wide' | 'full';
export type ObjectFit = 'cover' | 'contain' | 'fill' | 'scale-down';
export type ObjectPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
export type SpacerHeight = 'small' | 'medium' | 'large';

export interface ImageOptions {
  url: string;
  alt?: string;
  caption?: string;
  aspectRatio?: AspectRatio;
  objectFit?: ObjectFit;
  objectPosition?: ObjectPosition;
  customPosition?: { x: string; y: string };
}

export interface DetailField {
  id: string;
  label: string;
  value: string;
  type: 'default' | 'year' | 'duration' | 'role' | 'team' | 'platform' | 'link' | 'status';
}

// Content Block Base
export interface BaseContentBlock {
  id: string;
  type: ContentBlockType;
}

// Specific Content Block Types
export interface TextBlock extends BaseContentBlock {
  type: 'text';
  content: string;
}

export interface ImageBlock extends BaseContentBlock {
  type: 'image';
  image: ImageOptions;
}

export interface TwoColumnBlock extends BaseContentBlock {
  type: 'two-column';
  image1: ImageOptions;
  image2: ImageOptions;
  gap?: number;
}

export interface ThreeColumnBlock extends BaseContentBlock {
  type: 'three-column';
  image1: ImageOptions;
  image2: ImageOptions;
  image3: ImageOptions;
  gap?: number;
}

export interface GridBlock extends BaseContentBlock {
  type: 'grid';
  images: ImageOptions[];
  columns?: number;
  masonry?: boolean;
}

export interface HeadingBlock extends BaseContentBlock {
  type: 'heading';
  text: string;
  level: 'h2' | 'h3' | 'h4';
}

export interface QuoteBlock extends BaseContentBlock {
  type: 'quote';
  text: string;
  author?: string;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
}

export interface MetricsBlock extends BaseContentBlock {
  type: 'metrics';
  metrics: MetricItem[];
}

export interface UserPersona {
  id: string;
  name: string;
  role: string;
  photo?: string;
  description: string;
  goals: string[];
  painPoints: string[];
}

export interface UsersBlock extends BaseContentBlock {
  type: 'users';
  users: UserPersona[];
}

export interface FlowStep {
  id: string;
  number: number;
  description: string;
}

export interface UserFlowBlock extends BaseContentBlock {
  type: 'user-flow';
  title: string;
  description: string;
  flowImage: ImageOptions;
  steps?: FlowStep[];
}

export type ContentBlock = 
  | TextBlock 
  | ImageBlock 
  | TwoColumnBlock 
  | ThreeColumnBlock 
  | GridBlock 
  | HeadingBlock 
  | QuoteBlock 
  | MetricsBlock 
  | UsersBlock 
  | UserFlowBlock;

export interface ContentSection {
  id: string;
  title?: string;
  blocks: ContentBlock[];
  dividerAfter?: boolean;
  spacerAfter?: SpacerHeight;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  category: string;
  
  // Card Display
  cardTitle: string;
  cardSubtitle: string;
  cardMetrics: string;
  cardImageUrl: string;
  
  // Detail Page
  coverImageUrl: string;
  detailFields: DetailField[];
  contentSections: ContentSection[];
  
  // Status
  isDraft: boolean;
  isArchived: boolean;
  isFeatured: boolean;
  order: number;
  
  // Timestamps
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

export type ProjectFormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export interface ProjectListItem {
  id: string;
  name: string;
  cardTitle: string;
  cardSubtitle: string;
  cardImageUrl: string;
  category: string;
  isDraft: boolean;
  isFeatured: boolean;
  isArchived: boolean;
  order: number;
  updatedAt: Timestamp | Date;
}

// ========================================
// CATEGORY TYPES
// ========================================

export interface Category {
  id?: string;
  name: string;
  slug: string;
  color?: string;
  icon?: string;
  order: number;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

// ========================================
// ABOUT PAGE TYPES
// ========================================

export interface AboutPage {
  id?: string;
  profileImageUrl: string;
  paragraph1: string;
  paragraph2: string;
  position: string;
  experience: string;
  company: string;
  degree: string;
  location: string;
  resumeUrl: string;
  updatedAt?: Timestamp | Date;
}

// ========================================
// CONTACT PAGE TYPES
// ========================================

export interface ContactPage {
  id?: string;
  email: string;
  phone: string;
  linkedIn: string;
  behance: string;
  instagram: string;
  twitter: string;
  whatsApp: string;
  medium: string;
  description: string;
  specialThanks: string;
  fontCredit: string;
  updatedAt?: Timestamp | Date;
}

// ========================================
// SITE SETTINGS TYPES
// ========================================

export interface SiteSettings {
  id?: string;
  title: string;
  subtitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoImageUrl: string;
  faviconUrl: string;
  analyticsId: string;
  updatedAt?: Timestamp | Date;
}

// ========================================
// ADMIN TYPES
// ========================================

export interface AdminSession {
  isAuthenticated: boolean;
  authenticatedAt?: number;
}

export interface PendingImage {
  id: string;
  file: File;
  preview: string;
  path: string; // Where to upload in Firebase Storage
}

export interface UnsavedChanges {
  hasChanges: boolean;
  section: 'projects' | 'about' | 'contact' | 'categories' | null;
}

// ========================================
// MENTION/AUTOCOMPLETE TYPES
// ========================================

export interface ProjectMention {
  id: string;
  name: string;
  cardTitle: string;
  category: string;
  thumbnailUrl: string;
}
