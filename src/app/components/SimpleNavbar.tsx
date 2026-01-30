import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import svgPaths from "@/imports/svg-vesmb1hd1c";
import { subscribeToResumeData } from "../../config/resumeService";
import { ResumeData, defaultResumeData } from "@/types/resume";

interface SimpleNavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function SimpleNavbar({ isDark, toggleTheme }: SimpleNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to resume data
  useEffect(() => {
    const unsubscribe = subscribeToResumeData((data) => {
      setResumeData(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      // Clear existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      
      // Always visible at top (within 50px)
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Scrolling up - show immediately
      else if (scrollDirection === 'up') {
        setIsVisible(true);
      } 
      // Scrolling down - hide immediately
      else if (scrollDirection === 'down') {
        setIsVisible(false);
      }
      
      // Set timer to show navbar after 1 second of no scrolling
      scrollTimer.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  const navItems = [
    { label: "Work", href: "#work", isExternal: false },
    { label: "About", href: "#about", isExternal: false },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string, isExternal: boolean) => {
    if (isExternal) {
      e.preventDefault();
      if (resumeData.resumeUrl) {
        window.open(resumeData.resumeUrl, '_blank');
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Normal click behavior - scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Also push to history if needed, but for now scroll to top is the primary interaction for this SPA
    window.history.pushState({}, '', '/');
  };

  return (
    <>
      {/* Main Navbar - 0px height frame, no clip */}
      <nav className="sticky top-0 z-[9999] w-full h-0 overflow-visible">
        <div className={`px-8 md:px-24 pt-4 md:pt-5 lg:pt-6 pb-4 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="flex gap-[12px] items-center justify-center max-w-[1600px] mx-auto">
            
            {/* Main Nav Container - Glassmorphism */}
            <div className={`
              ${isDark 
                ? 'bg-[#0E0E0E]/60 backdrop-blur-xl border border-white/10' 
                : 'bg-[#FFFFFF]/70 backdrop-blur-xl border border-black/5 shadow-sm'
              } 
              flex gap-[20px] md:gap-[40px] lg:gap-[60px] h-[48px] md:h-[51px] lg:h-[54px] items-center pl-[12px] md:pl-[16px] lg:pl-[20px] pr-[4px] rounded-[8px] flex-1 lg:flex-none transition-all duration-300
            `}>
              
              {/* Logo */}
              <div className={`flex flex-col font-['Barlow_Condensed',sans-serif] h-full justify-center leading-[0] text-[28px] md:text-[30px] lg:text-[32px] ${isDark ? 'text-white' : 'text-[#0E0E0E]'} tracking-[0px] shrink-0 transition-colors duration-300`}>
                <a 
                  href="/" 
                  className="leading-[normal] transition-all duration-300 hover:text-[#FFEB01] hover:scale-105 active:scale-95"
                  onClick={handleLogoClick}
                >
                  RASIK
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex gap-[60px] items-center">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isExternal)}
                    className="group relative transition-all duration-300"
                  >
                    <p className={`font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] ${isDark ? 'text-[#A3A3A3] group-hover:text-white' : 'text-[#666666] group-hover:text-black'} text-[24px] tracking-[-0.24px] transition-colors duration-300 group-active:text-[#FFEB01]`}>
                      {item.label}
                    </p>
                    {/* Underline effect */}
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FFEB01] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
                
                {/* Resume Button */}
                <button
                  onClick={() => resumeData.resumeUrl && window.open(resumeData.resumeUrl, '_blank')}
                  className="group relative transition-all duration-300"
                >
                  <span className={`font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] ${isDark ? 'text-[#A3A3A3] group-hover:text-white' : 'text-[#666666] group-hover:text-black'} text-[24px] tracking-[-0.24px] transition-colors duration-300 group-active:text-[#FFEB01]`}>
                    Resume
                  </span>
                  {/* Underline effect */}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#FFEB01] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>

              {/* Let's connect button - Desktop */}
              <a
                href="#contact"
                className={`hidden lg:flex ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-[#0E0E0E]'} items-center justify-center px-[16px] py-[6px] rounded-[6px] transition-all duration-300 hover:bg-[#FFEB01] hover:text-[#0E0E0E] group shrink-0`}
              >
                <p className={`font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] text-[20px] tracking-[-0.24px] whitespace-nowrap transition-colors duration-300`}>
                  Contact
                </p>
              </a>

              {/* Mobile/Tablet Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden flex items-center justify-center p-2 shrink-0 ml-auto transition-all duration-300 active:scale-90 rounded-[8px] ${isDark ? 'text-white hover:bg-white/10' : 'text-[#0E0E0E] hover:bg-black/5'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 transition-colors duration-300" />
                ) : (
                  <Menu className="w-6 h-6 transition-colors duration-300" />
                )}
              </button>
            </div>

            {/* Theme Toggle Button - Glassmorphism */}
            <button 
              onClick={toggleTheme}
              className={`
                ${isDark 
                  ? 'bg-[#0E0E0E]/60 border border-white/10 hover:bg-white/10' 
                  : 'bg-[#FFFFFF]/70 border border-black/5 hover:bg-black/5 shadow-sm'
                } 
                backdrop-blur-xl flex items-center justify-center overflow-clip px-0 py-[8px] md:py-[9px] lg:py-[10px] rounded-[8px] size-[48px] md:size-[51px] lg:size-[54px] shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95
              `}
              aria-label="Toggle theme"
            >
              <div className="relative rounded-[125.714px] size-[34px] md:size-[37px] lg:size-[40px]">
                <div className="absolute left-[7px] md:left-[8px] lg:left-[9px] size-[18px] md:size-[19.5px] lg:size-[21px] top-[7px] md:top-[8px] lg:top-[9px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.2941 23.2941">
                    <g>
                      <path 
                        d={svgPaths.p3fe13600} 
                        stroke={isDark ? "#FFFFFF" : "#0E0E0E"}
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.94118" 
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown - Glassmorphism */}
          {mobileMenuOpen && (
            <div className={`lg:hidden mt-4 mx-4 ${
              isDark 
                ? 'bg-[#0E0E0E]/80 backdrop-blur-xl border border-white/10' 
                : 'bg-[#FFFFFF]/80 backdrop-blur-xl border border-black/5'
              } rounded-[8px] overflow-hidden shadow-2xl`}>
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href, item.isExternal);
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 transition-opacity hover:opacity-70"
                  >
                    <p className={`font-['DM_Sans:Regular',sans-serif] font-normal ${isDark ? 'text-white' : 'text-[#0E0E0E]'} text-[20px] tracking-[-0.24px]`}>
                      {item.label}
                    </p>
                  </a>
                ))}
                
                {/* Resume Button - Mobile */}
                <button
                  onClick={() => {
                    if (resumeData.resumeUrl) {
                      window.open(resumeData.resumeUrl, '_blank');
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 transition-opacity hover:opacity-70 text-left"
                >
                  <span className={`font-['DM_Sans:Regular',sans-serif] font-normal ${isDark ? 'text-white' : 'text-[#0E0E0E]'} text-[20px] tracking-[-0.24px]`}>
                    Resume
                  </span>
                </button>
                
                {/* Let's connect button - Mobile */}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isDark ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center px-6 py-4 rounded-[8px] mt-2 transition-all duration-300 hover:bg-[#FFEB01] group`}
                >
                  <p className={`font-['DM_Sans:Regular',sans-serif] font-normal ${isDark ? 'text-white' : 'text-[#0E0E0E]'} text-[20px] tracking-[-0.24px] transition-colors duration-300 group-hover:text-[#0E0E0E]`}>
                    Contact
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}