export interface Tool {
  name: string;
  logo: string; // Can be emoji, URL, or figma:asset path
}

export interface InfoCard {
  id: string;
  label: string;
  value: string;
}

export interface AboutMeData {
  mainHeading: string;
  subHeading: string;
  profileImageUrl: string;
  infoCards: InfoCard[];
  resumeUrl?: string;

  // Legacy fields (kept for backward compatibility during migration)
  position?: string;
  experience?: string;
  degree?: string;
  currentCompany?: string;
  location?: string;
  tools: Tool[];
}

// Legacy type alias for backward compatibility
export type AboutData = AboutMeData;

export const defaultAboutData: AboutMeData = {
  mainHeading: "I design user experiences that work for people and make sense for business.",
  subHeading: "Product designer focused on usability, accessibility, and real-world constraints. I work on SaaS platforms and ecosystem products where clarity, inclusion, and business impact matter equally.",
  profileImageUrl: "https://images.unsplash.com/photo-1761522002071-67755dc6c820?q=80&w=1080&auto=format&fit=crop",
  infoCards: [
    { id: '1', label: 'POSITION', value: 'Product Designer (Systems & AI Focus)' },
    { id: '2', label: 'CURRENT COMPANY', value: 'Freelance' },
    { id: '3', label: 'DEGREE', value: 'B.Des in Interaction Design' },
    { id: '4', label: 'EXPERIENCE', value: '2+ years across systems, workflows, and product design' },
    { id: '5', label: 'LOCATION', value: 'Remote / Worldwide' }
  ],
  resumeUrl: "",
  tools: []
};
