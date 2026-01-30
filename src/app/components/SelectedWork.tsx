import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getAllCaseStudies, getProjectCategories, subscribeToAllCaseStudies } from '../../config/caseStudyService';
import type { CaseStudyListItem } from '../../types/caseStudy';
import { Loader2, FolderOpen } from 'lucide-react';

const ThemeContext = createContext(false);

const svgPaths = {
  p3bf41a80: "M7.99791 3.33244L12.6634 7.99789L7.99791 12.6633",
};

// --- Shared Components ---

// Updated TabNavigation to match the requested "Folder" pill style
function TabNavigation({ activeTab, setActiveTab, categories }: { activeTab: string; setActiveTab: (tab: string) => void, categories: string[] }) {
  const isDark = useContext(ThemeContext);
  
  // Ensure "All" is in the list if not already (though we might handle "All" logic in parent)
  // Based on the user request, they want specific tabs visually.
  // We'll map the categories to these pills.
  
  // User asked for "All" to be on the right side, and "Product Design" (or first category) to be first.
  // We will map current categories to this style.
  const displayCategories = [...categories.filter(c => c !== "All"), "All"];

  return (
    <div className="bg-[#2a2a2a] flex gap-[10px] h-[48px] items-center overflow-x-auto p-[4px] relative rounded-[8px] shrink-0 no-scrollbar max-w-full">
      {displayCategories.map((cat) => {
        const isActive = activeTab === cat || (cat === "All" && activeTab === "");
        
        return (
          <button
            key={cat}
            onClick={() => setActiveTab(cat === "All" ? "" : cat)}
            className={`
              ${isActive ? 'bg-[#1c1c1c]' : 'bg-[#343434]'} 
              content-stretch flex h-full items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[6px] shrink-0
              transition-colors duration-200
            `}
          >
            <p className={`
              ${isActive ? "font-['DM_Sans:SemiBold',sans-serif] font-semibold" : "font-['DM_Sans:Regular',sans-serif] font-normal"}
              leading-[normal] relative shrink-0 text-[14px] md:text-[18px] text-white whitespace-nowrap
            `} style={{ fontVariationSettings: "'opsz' 14" }}>
              {cat}
            </p>
          </button>
        );
      })}
      
    </div>
  );
}

function SectionHeading() {
  // Updated style to match the requested design
  // Semantic change: p -> h2
  return (
    <h2 className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[#747474] text-[32px] md:text-[40px] tracking-[-2px]" style={{ fontVariationSettings: "'opsz' 14" }}>
      Some of my recent projects include
    </h2>
  );
}

function ProjectDetailsButton() {
  const isDark = useContext(ThemeContext);
  return (
    <div className={`h-[46px] relative rounded-[6px] shrink-0 w-[170px] transition-all duration-300 group/btn`}>
      <div aria-hidden="true" className={`absolute ${isDark ? 'border-[#2A2A2A] group-hover/btn:border-[#FFEB01]' : 'border-[#E5E5E5] group-hover/btn:border-[#0E0E0E]'} border border-solid inset-0 pointer-events-none rounded-[6px] transition-colors duration-300`} />
      <p className={`absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[20px] left-[24px] ${isDark ? 'text-[#FFFFFF] group-hover/btn:text-[#FFEB01]' : 'text-[#0E0E0E] group-hover/btn:text-[#000000]'} text-[14px] text-nowrap top-[13px] transition-colors duration-300`}>Project details</p>
      <div className="absolute left-[128px] size-[16px] top-[15px] transition-transform duration-300 group-hover/btn:translate-x-1">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d="M3.33246 7.99791H12.6634" stroke={isDark ? "currentColor" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33299" className={`${isDark ? 'text-[#FFFFFF] group-hover/btn:text-[#FFEB01]' : 'text-[#0E0E0E] group-hover/btn:text-[#000000]'} transition-colors duration-300`} />
          <path d={svgPaths.p3bf41a80} stroke={isDark ? "currentColor" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33299" className={`${isDark ? 'text-[#FFFFFF] group-hover/btn:text-[#FFEB01]' : 'text-[#0E0E0E] group-hover/btn:text-[#000000]'} transition-colors duration-300`} />
        </svg>
      </div>
    </div>
  );
}

// --- Dynamic Content Components ---

function DynamicContent({ project, titleClass }: { project: CaseStudyListItem, titleClass: string }) {
  const isDark = useContext(ThemeContext);
  // Semantic change: p -> h3 for title
  return (
    <div className="flex flex-col gap-[16px] md:gap-[24px] items-start relative shrink-0 w-full">
      <h3 className={`font-['Barlow_Condensed',sans-serif] leading-none not-italic relative shrink-0 ${isDark ? 'text-[#FFFFFF]' : 'text-[#0E0E0E]'} tracking-[0px] w-full ${titleClass} transition-colors duration-300`}>
        {project.title}
      </h3>
      <p className={`font-['DM_Sans:Regular',sans-serif] font-normal leading-[26px] relative shrink-0 ${isDark ? 'text-[#EAEAEA]' : 'text-[#1C1C1C]'} text-[14px] md:text-[16px] w-full transition-colors duration-300 line-clamp-3`}>
        {project.description}
      </p>
    </div>
  );
}

function DynamicDate({ project }: { project: CaseStudyListItem }) {
  const isDark = useContext(ThemeContext);
  const year = project.createdAt 
    ? new Date((project.createdAt as any).toDate ? (project.createdAt as any).toDate() : project.createdAt).getFullYear() 
    : new Date().getFullYear();

  return (
    <div className={`flex font-['DM_Sans:Bold',sans-serif] font-bold gap-[4px] items-start leading-[16px] relative shrink-0 text-[12px] text-nowrap tracking-[1.2px] w-full`}>
      <p className={`${isDark ? 'text-[#9A9A9A]' : 'text-[#6B6B6B]'}`}>({year})</p>
      <p className={`${isDark ? 'text-[#9A9A9A]' : 'text-[#6B6B6B]'} uppercase`}>{project.category || 'PROJECT'}</p>
    </div>
  );
}

// --- Cards ---

function StackedCard({ 
  date, 
  image, 
  children, 
  imageHeight = "h-[384px]", 
  padding = "p-[32px]",
  isHorizontal = false,
  className = "",
  linkTo,
  isComingSoon = false
}: { 
  date: React.ReactNode, 
  image: string, 
  children: React.ReactNode, 
  imageHeight?: string,
  padding?: string,
  isHorizontal?: boolean,
  className?: string,
  linkTo?: string,
  isComingSoon?: boolean
}) {
  const isDark = useContext(ThemeContext);
  
  const cardContent = (
    <div className={`flex flex-col ${isHorizontal ? 'md:flex-row' : ''} gap-[24px] md:gap-[40px] items-start ${padding} max-md:!p-[16px] relative w-full grow`}>
      {/* Coming Soon Overlay */}
      {isComingSoon && (
         <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[4px] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            <div className={`relative px-6 py-3 border-[2px] ${isDark ? 'border-[#FFEB01] bg-black text-[#FFEB01]' : 'border-white bg-black text-white'} rounded-full font-['Barlow_Condensed',sans-serif] text-[18px] tracking-[0px] uppercase transform -rotate-6 shadow-2xl`}>
              Coming Soon
            </div>
         </div>
      )}

      {/* Content Section */}
      <div className={`flex flex-col gap-[16px] items-start relative w-full grow ${isHorizontal ? 'md:w-1/2' : 'shrink-0'} ${isComingSoon ? 'opacity-60' : ''}`}>
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          {date}
          {children}
        </div>
        <div className={isComingSoon ? 'opacity-50 pointer-events-none grayscale' : ''}>
          <ProjectDetailsButton />
        </div>
      </div>
      
      {/* Image Inside Padding */}
      <div className={`bg-[#f4f4f5] flex flex-col items-start relative w-full rounded-[6px] overflow-hidden ${isHorizontal ? 'md:w-1/2 aspect-[4/3]' : 'aspect-[4/3] shrink-0'} ${isComingSoon ? 'grayscale opacity-80' : ''}`}>
         <ImageWithFallback src={image} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
    </div>
  );
  
  if (linkTo && !isComingSoon) {
    return (
      <Link to={linkTo} className="block h-full">
        <motion.div 
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`${isDark ? 'bg-[#1C1C1C] border-[#2A2A2A]' : 'bg-[#FFFFFF] border-[#E5E5E5]'} border border-solid grow relative rounded-[6px] w-full min-w-0 flex flex-col h-full group cursor-pointer transition-all duration-300 ${className}`}
        >
          {cardContent}
        </motion.div>
      </Link>
    );
  }
  
  return (
    <motion.div 
      whileHover={!isComingSoon ? { y: -8 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`${isDark ? 'bg-[#1C1C1C] border-[#2A2A2A]' : 'bg-[#FFFFFF] border-[#E5E5E5]'} border border-solid grow relative rounded-[6px] w-full min-w-0 flex flex-col h-full group ${!isComingSoon ? 'cursor-pointer' : 'cursor-default'} transition-all duration-300 ${className}`}
    >
      {cardContent}
    </motion.div>
  );
}

// --- Responsive Layouts ---

function ProjectsGrid({ 
  projects, 
  activeTab, 
  setActiveTab, 
  categories, 
  loading,
  error 
}: { 
  projects: CaseStudyListItem[], 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  categories: string[],
  loading: boolean,
  error: string | null
}) {
  const isDark = useContext(ThemeContext);
  
  // Filter projects
  // If activeTab is empty or "All", show all. Otherwise filter by category.
  const filteredProjects = projects.filter(p => 
    !activeTab || activeTab === "All" || p.category === activeTab
  );

  // Separate featured project
  // We want the TOP 2 featured projects based on most recently updated/created.
  // The 'projects' array is already sorted by backend query, so filteredProjects respects that order.
  const allFeatured = filteredProjects.filter(p => (p as any).featured);
  const featuredProjects = allFeatured.slice(0, 2);
  
  // Standard projects are everything else (non-featured OR featured but beyond top 2)
  const featuredIds = new Set(featuredProjects.map(p => p.id));
  const standardProjects = filteredProjects.filter(p => !featuredIds.has(p.id));

  if (loading) {
     return (
       <div className="flex items-center justify-center py-32">
         <Loader2 className={`w-8 h-8 ${isDark ? 'text-[#FFEB01]' : 'text-[#0E0E0E]'} animate-spin`} />
       </div>
     );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-[#0E0E0E]' : 'bg-[#f0eee9]'} flex flex-col items-center relative size-full transition-colors duration-500`}>
      <div className="w-full px-8 md:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header Row */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-[48px] max-w-[1600px] mx-auto">
          <SectionHeading />
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} categories={categories} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-[24px] max-w-[1600px] mx-auto"
          >
            {/* 1. Strong Featured Project (Horizontal on desktop, stacked on mobile) */}
            {featuredProjects.length > 0 && (
              <div className="flex flex-col gap-[24px] w-full">
                {featuredProjects.map(project => (
                  <StackedCard 
                    key={project.id}
                    date={<DynamicDate project={project} />}
                    image={project.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'}
                    isHorizontal={true}
                    padding="p-[24px] md:p-[32px] lg:p-[48px]"
                    className="w-full"
                    linkTo={`/case-study/${project.id}`}
                    isComingSoon={project.comingSoon}
                  >
                     <DynamicContent project={project} titleClass="text-[32px] md:text-[40px]" />
                  </StackedCard>
                ))}
              </div>
            )}

            {/* 2. Standard Projects Grid */}
            {standardProjects.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-2 min-[1440px]:grid-cols-3 gap-[24px] w-full items-stretch">
                 {standardProjects.map((project) => (
                   <div key={project.id} className="contents">
                     <StackedCard 
                       date={<DynamicDate project={project} />} 
                       image={project.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'}
                       padding="p-[24px] md:p-[32px] lg:p-[48px]"
                       linkTo={`/case-study/${project.id}`}
                       isComingSoon={project.comingSoon}
                     >
                       <DynamicContent project={project} titleClass="text-[28px] md:text-[32px]" />
                     </StackedCard>
                   </div>
                 ))}
               </div>
            )}

            {/* Empty State */}
            {featuredProjects.length === 0 && standardProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex flex-col items-center justify-center py-24 px-4 text-center rounded-[12px] border border-dashed ${isDark ? 'border-[#404040] bg-[#111111]' : 'border-[#D4D4D4] bg-[#FAFAFA]'} transition-colors duration-300`}
              >
                 <div className="relative mb-6">
                   <div className={`absolute inset-0 blur-2xl rounded-full opacity-0 ${isDark ? 'bg-[#FFEB01] opacity-10' : 'bg-[#000000] opacity-5'}`}></div>
                   <div className={`relative p-5 rounded-full ${isDark ? 'bg-[#1C1C1C]' : 'bg-[#F0F0F0]'}`}>
                     <FolderOpen className={`w-10 h-10 ${isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'}`} strokeWidth={1.5} />
                   </div>
                 </div>
                 
                 <h3 className={`font-['Barlow_Condensed',sans-serif] text-[24px] tracking-[0px] mb-2 ${isDark ? 'text-[#FFFFFF]' : 'text-[#0E0E0E]'}`}>
                   Digital Void
                 </h3>
                 
                 <p className={`font-['DM_Sans:Regular',sans-serif] text-[16px] max-w-[320px] mx-auto leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-[#525252]'}`}>
                   The <span className={`font-medium ${isDark ? 'text-[#FFEB01]' : 'text-[#000000]'}`}>{activeTab || "All"}</span> frequency is currently silent. Future projects will materialize here soon.
                 </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Main Export ---

export function SelectedWork({ isDark = false, onProjectsLoaded }: { isDark?: boolean; onProjectsLoaded?: (thumbnails: string[]) => void }) {
  const [projects, setProjects] = useState<CaseStudyListItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Initial fetch for categories (these don't change often, keep as one-time or separate subscription if needed)
        const allCats = await getProjectCategories();
        setCategories(Array.from(new Set(allCats)));
        
        // Default selection
        if (allCats.length > 0 && !activeTab) {
          setActiveTab(allCats[0]);
        }

        // Subscribe to projects
        unsubscribe = subscribeToAllCaseStudies((allProjects) => {
          const published = allProjects.filter(p => p.status === 'published');
          setProjects(published);
          setLoading(false);
          
          // Extract thumbnails for prefetching
          if (onProjectsLoaded) {
            const thumbnails = published
              .map(p => p.thumbnail)
              .filter((url): url is string => !!url);
            onProjectsLoaded(thumbnails);
          }
        });
        
      } catch (err) {
        console.error("Error loading work data:", err);
        setError("Failed to load projects.");
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <ThemeContext.Provider value={isDark}>
      <div id="work" className="w-full relative">
        <ProjectsGrid 
          projects={projects}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          categories={categories}
          loading={loading}
          error={error}
        />
      </div>
    </ThemeContext.Provider>
  );
}