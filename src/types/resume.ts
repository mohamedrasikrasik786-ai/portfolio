export interface ResumeData {
  id?: string;
  resumeUrl: string;
  
  // Metadata
  updatedAt?: string;
  createdAt?: string;
}

export const defaultResumeData: ResumeData = {
  resumeUrl: ""
};
