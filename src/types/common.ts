// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// ==========================================
// COMMON TYPES
// ==========================================

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// ==========================================
// NAVIGATION TYPES
// ==========================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ==========================================
// THEME TYPES
// ==========================================

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// ==========================================
// FORM VALIDATION TYPES
// ==========================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ==========================================
// FILTER & SORT TYPES
// ==========================================

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export interface FilterConfig {
  field: string;
  value: string | string[];
  operator?: 'eq' | 'ne' | 'in' | 'contains';
}

// ==========================================
// MEDIA TYPES
// ==========================================

export interface ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface VideoData {
  url: string;
  thumbnail?: string;
  duration?: number;
  title?: string;
}

// ==========================================
// SEO TYPES
// ==========================================

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'player';
  canonicalUrl?: string;
}
