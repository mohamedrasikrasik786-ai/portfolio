export interface LandingPageData {
  id?: string;
  backgroundImageUrl: string;
  subjectImageUrl: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  updatedAt?: any;
  createdAt?: any;
}

export const defaultLandingData: LandingPageData = {
  titleLine1: "Designing",
  titleLine2: "Future",
  titleLine3: "Focused",
  description: "I design web and mobile products with a focus on usability, structure, and real-world constraints.",
  backgroundImageUrl: "https://images.unsplash.com/photo-1687392946859-cebb261f01f5?q=80&w=1920&auto=format&fit=crop",
  subjectImageUrl: "https://images.unsplash.com/photo-1761522002071-67755dc6c820?q=80&w=1080&auto=format&fit=crop"
};
