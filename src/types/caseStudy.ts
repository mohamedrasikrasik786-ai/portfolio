import { Timestamp } from 'firebase/firestore';

export type ContentBlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'users' | 'userflow' | 'image' | 'divider' | 'spacer' | 'info';

// Persona interface for Users block
export interface Persona {
  id: string;
  image: string;
  name: string;
  description: string;
}

// Info item for Info block
export interface InfoItem {
  label: string;
  value: string;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  personas?: Persona[]; // For 'users' block type
  infoItems?: InfoItem[]; // For 'info' block type
  metadata?: {
    imageUrl?: string;
    imageAlt?: string;
    listType?: 'bullet' | 'numbered';
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: unknown;
  };
}

export interface CaseStudySection {
  id: string;
  title: string;
  heading: string;
  tocLabel?: string; // New field for custom TOC text
  showInToc?: boolean; // Toggle visibility in TOC
  blocks: ContentBlock[];
  collapsed?: boolean;
  order?: number;
}

export interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  sections: CaseStudySection[];
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  comingSoon?: boolean;
  views?: number; // View counter
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  publishedAt?: Timestamp | Date;
  authorId?: string;
  metadata?: {
    client?: string;
    duration?: string;
    role?: string;
    tools?: string[];
    links?: { label: string; url: string }[]
    [key: string]: unknown;
  };
}

export type CaseStudyFormData = Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>;

export interface CaseStudyListItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  sectionCount: number;
  blockCount: number;
  featured?: boolean;
  comingSoon?: boolean;
  views?: number; // View counter
}