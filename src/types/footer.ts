export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon?: string; // Optional icon name for future flexibility
  enabled: boolean;
}

export interface FooterData {
  availability: {
    isAvailable: boolean;
    text: string;
  };
  headline: {
    line1: string;
    line2: string;
    line3: string; // The part with the heart usually
  };
  resume: {
    url: string;
    text: string;
    subtext: string;
  };
  contact: {
    email: string;
    heading: string;
    subheading: string;
  };
  polaroidImages: string[];
  socialLinks: SocialLink[];
}

export const defaultFooterData: FooterData = {
  availability: {
    isAvailable: true,
    text: "Available for hire"
  },
  headline: {
    line1: "I CRAFT MODERN,",
    line2: "SCALABLE DIGITAL",
    line3: "EXPERIENCES WITH"
  },
  resume: {
    url: "/resume.pdf",
    text: "Download Resume",
    subtext: "Open to Full-time & Contract roles."
  },
  contact: {
    email: "hello@mohamedrasik.com",
    heading: "The partner that will save your team time and engineering cycles is just a click away.",
    subheading: "Ready to get started?"
  },
  polaroidImages: [
    "https://images.unsplash.com/photo-1653053151840-a35f2002a2fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2t8ZW58MXx8fHwxNzY5Njk2Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1696087225391-eb97abf5ba20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBzZXR1cHxlbnwxfHx8fDE3Njk3NjM1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1624291099666-ec99262230b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdvcmtpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY5NzYzNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1587522384446-64daf3e2689a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTY5MTA3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1644554331498-727654d97793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBkZXNrJTIwd29ya3xlbnwxfHx8fDE3Njk3NjM1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1769667693200-ff32545a0e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRlc2lnbiUyMGFyY2hpdGVjdHVyZSUyMGRldGFpbHxlbnwxfHx8fDE3Njk3NjYxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  socialLinks: [
    { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/yourusername", enabled: true },
    { id: "twitter", name: "Twitter", url: "https://twitter.com/yourusername", enabled: true },
    { id: "dribbble", name: "Dribbble", url: "https://dribbble.com/yourusername", enabled: true },
    { id: "behance", name: "Behance", url: "https://behance.net/yourusername", enabled: true }
  ]
};
