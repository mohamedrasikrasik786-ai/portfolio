import React, { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Lightbox } from '@/app/components/Lightbox';
import { SEO } from '@/app/components/SEO';
import { CaseStudySkeletonLoader } from '@/app/components/CaseStudySkeletonLoader';
import { ThemeToggleCompact } from '@/app/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, ChevronRight, Clock, ExternalLink, Menu, X, Check } from 'lucide-react';
import { getAllCaseStudies, subscribeToCaseStudy, incrementCaseStudyView } from '../../config/caseStudyService';
import { Link, useParams } from 'react-router-dom';
import type { CaseStudy, ContentBlock } from '../../types/caseStudy';
import { BlockRenderer } from './BlockRenderer';

export function ProjectDetail({ id: propId }: { id?: string }) {
  // If propId is not provided, try to get from params
  const { id: paramId } = useParams();
  const id = propId || paramId || '';
  
  const { isDark } = useTheme();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [nextProject, setNextProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [tocSections, setTocSections] = useState<{ id: string, label: string }[]>([]);
  const [lightboxData, setLightboxData] = useState<{url: string, alt?: string} | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTocOpen, setIsTocOpen] = useState(false); // For mobile/tablet dropdown

  const navRef = useRef<HTMLDivElement>(null);

  // Set body background to match theme and enable custom scrollbar
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#0E0E0E' : '#FFFFFF';
    document.documentElement.classList.add('case-study-mode');
    return () => document.documentElement.classList.remove('case-study-mode');
  }, [isDark]);

  // Track scroll progress for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track view count when case study loads
  useEffect(() => {
    if (id && caseStudy) {
      incrementCaseStudyView(id);
    }
  }, [id, caseStudy?.id]);

  // 1. Fetch Data
  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      
      const unsubscribe = subscribeToCaseStudy(id, (data) => {
        if (!data) {
          console.error('❌ Case study not found:', id);
          setError('Case study not found');
          setLoading(false);
          return;
        }
        
        setCaseStudy(data);
        
        // Generate TOC from sections
        if (data.sections) {
          const generatedToc = data.sections
            .filter(sec => sec.showInToc !== false && (sec.heading || sec.tocLabel))
            .map(sec => ({
              id: sec.id || `section-${Math.random().toString(36).substr(2, 9)}`,
              label: sec.tocLabel || sec.heading || sec.title || "Section"
            }));
          setTocSections(generatedToc);
        }
        setLoading(false);
      });

      // Find next project
      getAllCaseStudies().then(all => {
        const published = all.filter(p => p.status === 'published');
        const currentIndex = published.findIndex(p => p.id === id);
        if (currentIndex !== -1 && currentIndex < published.length - 1) {
          setNextProject(published[currentIndex + 1].id);
        } else if (published.length > 0) {
          if (currentIndex === published.length - 1) {
             setNextProject(published[0].id);
          }
        }
      }).catch(err => {
        console.error('Error loading all case studies:', err);
      });

      return () => unsubscribe();
    }
  }, [id]);

  // 2. Scroll Spy for TOC
  useEffect(() => {
    const handleScroll = () => {
      if (!tocSections.length) return;

      // Find active section
      for (const section of tocSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active if top is near viewport top or inside viewport (accounting for header offset)
          // Adjust offset to trigger slightly earlier
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocSections]);

  // Auto-scroll the nav container to keep active item in view WITHOUT moving the main window
  useEffect(() => {
    if (activeSection && navRef.current) {
      const activeBtn = navRef.current.querySelector(`[data-section-id="${activeSection}"]`) as HTMLElement;
      if (activeBtn) {
        const container = navRef.current;
        // Calculate centered position
        const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Header height + padding
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return <CaseStudySkeletonLoader />;
  }

  if (error || !caseStudy) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 text-center ${
        isDark ? 'bg-[#0E0E0E]' : 'bg-white'
      }`}>
        <div className="max-w-md">
          <h1 className={`font-['Barlow_Condensed',sans-serif] text-[48px] md:text-[64px] mb-4 ${
            isDark ? 'text-white' : 'text-[#0E0E0E]'
          }`}>
            Case Study Not Found
          </h1>
          <Link
            to="/#work"
            className="px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-full font-['DM_Sans:Bold',sans-serif] text-[16px] hover:bg-[#FFD700] transition-all"
          >
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  // Helper to format metadata line
  const metadataString = [
    caseStudy.metadata?.role && `Role: ${caseStudy.metadata.role}`,
    caseStudy.category && `Category: ${caseStudy.category}`,
    caseStudy.metadata?.duration && `Timeline: ${caseStudy.metadata.duration}`,
    caseStudy.metadata?.tools && `Tools: ${(caseStudy.metadata.tools as string[]).join(', ')}`,
    `Status: ${caseStudy.status === 'published' ? 'Live' : 'In Development'}`
  ].filter(Boolean).join(' · ');

  return (
    <>
      <SEO
        title={`${caseStudy.title} | Rasik - Digital Product Designer`}
        description={caseStudy.description || `Case study: ${caseStudy.title}`}
        image={caseStudy.thumbnail || undefined}
      />

      {/* Lightbox */}
      {lightboxData && (
        <Lightbox 
          isOpen={!!lightboxData}
          image={lightboxData.url}
          alt={lightboxData.alt || ''}
          onClose={() => setLightboxData(null)}
        />
      )}

      {/* STICKY NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[999] w-full">
        <div className={`backdrop-blur-md border-b shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-[#0E0E0E]/95 border-[#2a2a2a]' 
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex items-center justify-between gap-4 py-4 h-[72px]">
              {/* Left: Back Button + Title (Desktop) */}
              <div className="flex items-center gap-3 md:gap-4 shrink-0 min-w-0">
                <Link
                  to="/#work"
                  className={`flex items-center gap-2 px-3 py-2 rounded-[6px] transition-all duration-300 shrink-0 ${
                    isDark
                      ? 'text-[#8d8d8d] hover:text-[#FFEB01] hover:bg-[#1c1c1c]'
                      : 'text-gray-600 hover:bg-[#FFEB01] hover:text-black'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-['DM_Sans:Medium',sans-serif] text-[14px] hidden sm:inline">
                    Back
                  </span>
                </Link>
                <div className={`h-4 w-[1px] hidden md:block shrink-0 ${
                  isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'
                }`}></div>
                <p className={`font-['Barlow_Condensed',sans-serif] text-[18px] md:text-[20px] truncate ${
                  isDark ? 'text-white' : 'text-[#0E0E0E]'
                }`}>
                  {caseStudy.title}
                </p>
              </div>

              {/* Center: Scrollable TOC (Hidden on Mobile/Tablet < 1024px) */}
              <div 
                className="hidden lg:flex flex-1 justify-center min-w-0"
              >
                <div 
                  ref={navRef}
                  className="relative flex items-center gap-1 overflow-x-auto px-12 max-w-[600px] w-full mask-image-linear-gradient [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
                  }}
                >
                  {tocSections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const activeIndex = tocSections.findIndex(s => s.id === activeSection);
                    const isPast = activeIndex > index;
                    
                    return (
                      <button
                        key={section.id}
                        data-section-id={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`relative px-4 py-2 font-['DM_Sans:Medium',sans-serif] text-[14px] whitespace-nowrap transition-all duration-300 rounded-full shrink-0 ${
                          isActive
                            ? isDark ? "text-[#FFEB01] bg-[#FFEB01]/10" : "text-[#0E0E0E] bg-[#FFEB01]"
                            : isPast
                            ? isDark ? "text-[#8d8d8d]" : "text-gray-500"
                            : isDark ? "text-[#4a4a4a] hover:text-[#8d8d8d]" : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile/Tablet: Dropdown Toggle */}
              <div className="lg:hidden flex-1 flex items-center justify-end md:justify-center gap-2">
                 <div className="md:hidden">
                    <ThemeToggleCompact />
                 </div>
                 <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[6px] transition-all duration-300 ${
                    isDark
                      ? 'text-[#8d8d8d] hover:text-[#FFEB01] hover:bg-[#1c1c1c]'
                      : 'text-gray-600 hover:bg-[#FFEB01] hover:text-black'
                  }`}
                >
                  {isTocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  <span className="font-['DM_Sans:Medium',sans-serif] text-[14px]">
                    Contents
                  </span>
                </button>
              </div>

              {/* Right: Theme & Next (Desktop) */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <ThemeToggleCompact />
                {nextProject && (
                  <Link
                    to={`/case-study/${nextProject}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-['DM_Sans:Bold',sans-serif] text-[14px] transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE/TABLET DROPDOWN MENU - Positioned relative to nav */}
        {isTocOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 w-full z-[990]">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 h-screen" 
              onClick={() => setIsTocOpen(false)}
            />
            
            {/* Menu Content */}
            <div className={`border-b shadow-2xl max-h-[70vh] overflow-y-auto ${
              isDark 
                ? 'bg-[#0E0E0E] border-[#2a2a2a]' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#737373]' : 'text-gray-500'}`}>
                    Table of Contents
                  </h3>
                  <span className={`text-xs ${isDark ? 'text-[#FFEB01]' : 'text-yellow-600'}`}>
                    {Math.round(scrollProgress)}% Read
                  </span>
                </div>
                
                <nav className="space-y-1">
                  {tocSections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          scrollToSection(section.id);
                          setIsTocOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg font-['DM_Sans:Medium',sans-serif] text-[14px] transition-all flex items-center justify-between ${
                          isActive
                            ? isDark ? "bg-[#FFEB01]/10 text-[#FFEB01]" : "bg-[#FFEB01] text-[#0E0E0E]"
                            : isDark 
                              ? "text-[#8d8d8d] hover:bg-[#1c1c1c] hover:text-white"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span>{section.label}</span>
                        {isActive && <Check size={14} className={isDark ? "text-[#FFEB01]" : "text-[#0E0E0E]"} />}
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile Next Project Button */}
                {nextProject && (
                  <div className={`pt-4 mt-4 border-t ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
                    <Link
                      to={`/case-study/${nextProject}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-[8px] bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#FFEB01] text-white transition-all group"
                      onClick={() => setIsTocOpen(false)}
                    >
                      <span className="font-['DM_Sans:Bold',sans-serif] text-[14px]">Next Project</span>
                      <ChevronRight className="w-4 h-4 text-[#737373] group-hover:text-[#FFEB01] transition-colors" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className={`min-h-screen w-full selection:bg-[#FFEB01] selection:text-black pt-[72px] ${
        isDark ? 'bg-[#0E0E0E]' : 'bg-white'
      }`}>
        {/* HERO SECTION */}
        <section className="w-full px-4 md:px-8 lg:px-16 pt-8 pb-16">
          <div className="max-w-[900px] mx-auto">
            <h1 className={`font-['DM_Sans:Bold',sans-serif] text-[48px] md:text-[72px] lg:text-[96px] tracking-[-2px] leading-[1.1] mb-8 break-words ${
              isDark ? 'text-white' : 'text-[#0E0E0E]'
            }`}>
              {caseStudy.title}
            </h1>

            <p className={`font-['DM_Sans:Regular',sans-serif] text-[16px] md:text-[18px] mb-6 leading-[1.6] ${
              isDark ? 'text-[#8d8d8d]' : 'text-gray-600'
            }`}>
              {metadataString}
            </p>

            <div className="flex items-center gap-2 mb-8">
              <Clock className={`w-4 h-4 ${isDark ? 'text-[#FFEB01]' : 'text-yellow-600'}`} />
              <p className={`font-['DM_Sans:Medium',sans-serif] text-[14px] ${isDark ? 'text-[#FFEB01]' : 'text-yellow-700'}`}>
                {Math.max(3, Math.ceil((caseStudy.sections?.length || 1) * 2))} min read
              </p>
            </div>

            <p className={`font-['DM_Sans:Regular',sans-serif] text-[18px] md:text-[20px] lg:text-[24px] mb-12 leading-[1.6] ${
              isDark ? 'text-white' : 'text-[#0E0E0E]'
            }`}>
              {caseStudy.description}
            </p>

            {caseStudy.metadata?.links && (
              <div className="flex flex-wrap gap-4 mb-12">
                {(caseStudy.metadata.links as any[]).map((link: any, i: number) => (
                   <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 px-6 py-3 rounded-[8px] font-['DM_Sans:Bold',sans-serif] text-[16px] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
                      i === 0 
                        ? "bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E]" 
                        : isDark
                        ? "bg-transparent border-2 border-[#2a2a2a] hover:border-[#FFEB01] text-[#8d8d8d] hover:text-[#FFEB01]"
                        : "bg-transparent border-2 border-gray-300 hover:border-[#FFEB01] text-gray-600 hover:bg-[#FFEB01] hover:text-black"
                    }`}
                  >
                    <span>{link.label || "View Project"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}

            {caseStudy.thumbnail && (
              <div className={`w-full aspect-[16/9] rounded-[12px] overflow-hidden mb-3 ${
                isDark ? 'bg-[#1c1c1c]' : 'bg-gray-100'
              }`}>
                <ImageWithFallback
                  src={caseStudy.thumbnail}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
             <p className={`font-['DM_Sans:Regular',sans-serif] text-[14px] italic ${
               isDark ? 'text-[#8d8d8d]' : 'text-gray-500'
             }`}>
                {caseStudy.title} — Main Interface
            </p>
          </div>
        </section>

        {/* SECTIONS */}
        <div className="flex flex-col">
          {caseStudy.sections?.map((section, index) => (
            <div key={section.id || index} className="contents">
              <section className="w-full px-4 md:px-8 lg:px-16 py-16" id={section.id || `section-${index}`}>
                <div className="max-w-[900px] mx-auto">
                  {section.heading && (
                    <h2 className={`font-['DM_Sans:Bold',sans-serif] text-[40px] md:text-[48px] lg:text-[56px] tracking-[-1px] leading-[1.2] mb-8 ${
                      isDark ? 'text-white' : 'text-[#0E0E0E]'
                    }`}>
                      {section.heading}
                    </h2>
                  )}

                  <div className="max-w-[900px]">
                    {section.blocks.map(block => (
                      <BlockRenderer 
                        key={block.id} 
                        block={block}
                        isDark={isDark}
                        onOpenLightbox={(url, alt) => setLightboxData({ url, alt })}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {index < (caseStudy.sections?.length || 0) - 1 && (
                <div className="w-full px-4 md:px-8 lg:px-16">
                  <div className={`max-w-[900px] mx-auto h-[1px] ${
                    isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'
                  }`}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER NAV */}
        {nextProject && (
          <section className="w-full px-4 md:px-8 lg:px-16 py-24 border-t border-[#2a2a2a] mt-16">
            <div className="max-w-[900px] mx-auto">
               <Link 
                to={`/case-study/${nextProject}`}
                className={`group flex items-center justify-between border rounded-[12px] p-8 md:p-12 transition-all duration-300 ${
                  isDark 
                    ? 'bg-[#1c1c1c] hover:bg-[#2a2a2a] border-[#2a2a2a] hover:border-[#FFEB01]'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-[#FFEB01]'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <p className={`font-['DM_Sans:Medium',sans-serif] text-[12px] md:text-[14px] uppercase tracking-[1.2px] ${
                    isDark ? 'text-[#9A9A9A]' : 'text-gray-500'
                  }`}>
                    Next Project
                  </p>
                  <p className={`font-['Barlow_Condensed',sans-serif] text-[32px] md:text-[40px] lg:text-[48px] tracking-[0px] leading-[1.1] transition-colors duration-300 ${
                    isDark 
                      ? 'text-white group-hover:text-[#FFEB01]'
                      : 'text-gray-900 group-hover:text-black'
                  }`}>
                    {/* We don't have next project title easily available here unless we fetch it. 
                        For now, just say "Next Project" or use a generic label if title isn't fetched.
                        Actually we only stored ID. Let's just say "Continue Reading" or generic.
                    */}
                    Continue Reading
                  </p>
                </div>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg] ${
                  isDark ? 'bg-[#2a2a2a] group-hover:bg-[#FFEB01]' : 'bg-gray-200 group-hover:bg-[#FFEB01]'
                }`}>
                  <ChevronRight className={`w-6 h-6 md:w-8 md:h-8 ${
                    isDark ? 'text-white group-hover:text-black' : 'text-gray-700 group-hover:text-black'
                  }`} />
                </div>
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}