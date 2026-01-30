import React, { useState, useEffect, createContext, useContext, useRef, memo, useCallback, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../app/components/figma/ImageWithFallback";
import { SEO } from "../app/components/SEO";
import { QuickCTA } from "../app/components/QuickCTA";
import { SimpleNavbar } from "../app/components/SimpleNavbar";
import { Toast } from "../app/components/Toast";
import { LandingPageData, defaultLandingData } from "../types/landing";
import { subscribeToLandingData } from "../config/landingService";
import { subscribeToAllCaseStudies } from "../config/caseStudyService";
import { usePrefetchImages } from "../hooks/usePrefetchImages";
import { EnhancedPreloader } from "../app/components/EnhancedPreloader";
import { DigitalGridRipple } from "../app/components/DigitalGridRipple";
import { useTheme } from "../contexts/ThemeContext";
// import heroImage from "figma:asset/0ec5ffe8914b23e05649383dc1df9dc854f38b26.png";
import heroImage from "../assets/0ec5ffe8914b23e05649383dc1df9dc854f38b26.png"
const defaultHeroImg = heroImage;
import { SelectedWork } from "../app/components/SelectedWork";
import AboutSection from "../app/components/AboutSection";
import { Footer } from "../app/components/Footer";

// --- Contexts ---
type CursorType = "default" | "text" | "card" | "button";
interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}
const CursorContext = createContext<CursorContextType>({ cursorType: "default", setCursorType: () => {} });
const useCursor = () => useContext(CursorContext);

// --- Components ---

const InteractiveDistortion = memo(({ children }: { children: React.ReactNode }) => {
  const redRef = useRef<SVGFEOffsetElement>(null);
  const blueRef = useRef<SVGFEOffsetElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const requestRef = useRef<number>(0);
  const isIdle = useRef(true);
  
  // Mouse position for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useSpring(x, { stiffness: 100, damping: 30, mass: 0.5 });
  const moveY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  useEffect(() => {
    // Optimization: Don't run on mobile/touch devices to save battery/perf
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const distortionContainer = containerRef.current?.querySelector('.distortion-target') as HTMLElement;
    
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Calculate RGB Split amount based on Speed
      const dx = Math.abs(e.clientX - lastMouse.current.x);
      const dy = Math.abs(e.clientY - lastMouse.current.y);
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      // Cap speed contribution and decay target
      targetOffset.current = Math.min(speed * 0.5, 20); 
      
      lastMouse.current = { x: e.clientX, y: e.clientY };
      
      // 2. Calculate Parallax position (normalized -1 to 1)
      if (typeof window !== 'undefined') {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        x.set((e.clientX - cx) / cx * 15); // Move max 15px
        y.set((e.clientY - cy) / cy * 15);
      }
      
      if (isIdle.current && !isTouch) {
        isIdle.current = false;
        // Enable filter when starting movement
        if (distortionContainer) {
            distortionContainer.style.filter = 'url(#rgb-split)';
        }
        loop();
      }
    };

    const loop = () => {
      // Smoothly interpolate current offset towards target (which decays to 0)
      const diff = targetOffset.current - currentOffset.current;
      currentOffset.current += diff * 0.1;
      
      // Decay target offset continuously to 0 if mouse stops
      targetOffset.current *= 0.9;

      if (redRef.current && blueRef.current) {
        const val = currentOffset.current;
        redRef.current.setAttribute("dx", (-val).toString());
        redRef.current.setAttribute("dy", (-val * 0.5).toString());
        blueRef.current.setAttribute("dx", val.toString());
        blueRef.current.setAttribute("dy", (val * 0.5).toString());
      }
      
      // If motion is negligible, stop the loop to save CPU
      if (Math.abs(currentOffset.current) < 0.05 && Math.abs(targetOffset.current) < 0.05) {
        isIdle.current = true;
        // Reset to exact 0 to prevent blurriness
        if (redRef.current && blueRef.current) {
          redRef.current.setAttribute("dx", "0");
          redRef.current.setAttribute("dy", "0");
          blueRef.current.setAttribute("dx", "0");
          blueRef.current.setAttribute("dy", "0");
        }
        // Disable filter when idle to save massive GPU resources
        if (distortionContainer) {
            distortionContainer.style.filter = 'none';
        }
        return; 
      }
      
      requestRef.current = requestAnimationFrame(loop);
    };
    
    // Start listening
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [x, y]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
       {/* SVG Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="rgb-split" x="-50%" y="-50%" width="200%" height="200%">
             {/* Optimize: Using specific color matrix for pure channel isolation */}
            <feColorMatrix in="SourceGraphic" type="matrix" values="
              1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0" result="red"/>
            <feOffset ref={redRef} in="red" dx="0" dy="0" result="red_offset" />

            <feColorMatrix in="SourceGraphic" type="matrix" values="
              0 0 0 0 0
              0 1 0 0 0
              0 0 0 0 0
              0 0 0 1 0" result="green"/>

            <feColorMatrix in="SourceGraphic" type="matrix" values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0" result="blue"/>
            <feOffset ref={blueRef} in="blue" dx="0" dy="0" result="blue_offset" />

            <feBlend in="green" in2="red_offset" mode="screen" result="rg"/>
            <feBlend in="blue_offset" in2="rg" mode="screen" result="rgb"/>
          </filter>
        </defs>
      </svg>
      
      {/* Container applying the filter */}
      <motion.div 
        className="distortion-target w-full h-full will-change-transform"
        style={{ 
          filter: "none", // Default to none, enabled via JS on interaction
          x: moveX, 
          y: moveY,
          scale: 1.05
        }} 
      >
        {children}
      </motion.div>
    </div>
  );
});
InteractiveDistortion.displayName = 'InteractiveDistortion';


// 1. Magnetic Button Wrapper
const Magnetic = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.1);
    position.y.set(middleY * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: 0, y: 0 }}
      style={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 2. Reveal Text Animation
const RevealText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <div className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.2em] overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: delay + (i * 0.05) }}
            className="inline-block py-2 -my-2 px-1 -mx-1"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};



// --- Sections ---

// Navbar functions removed - clean slate for new implementation

function HeroText({ isDark, landingData, isLoaded, onImageLoaded }: { isDark: boolean; landingData: LandingPageData; isLoaded: boolean; onImageLoaded?: () => void }) {
  const { setCursorType } = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Sequential "One by One" Exit Animation
  // Trigger: Scroll
  // Order: Product -> Design -> Focused
  // Start: Earlier (0.05) to ensure visibility

  // Line 1 (PRODUCT)
  const yLine1 = useTransform(scrollYProgress, [0.05, 0.25], ["0%", "-110%"]);
  // Line 2 (DESIGN)
  const yLine2 = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "-110%"]);
  // Line 3 (FOCUSED)
  const yLine3 = useTransform(scrollYProgress, [0.25, 0.45], ["0%", "-110%"]);
  
  const lineTransforms = [yLine1, yLine2, yLine3];
  
  // Staggered Opacity - Matches movement
  const opacityLine1 = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);
  const opacityLine2 = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  const opacityLine3 = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);
  const lineOpacities = [opacityLine1, opacityLine2, opacityLine3];

  // Description & CTA - Cascade after text
  const yDesc = useTransform(scrollYProgress, [0.35, 0.55], ["0%", "-110%"]);
  const opacityDesc = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);

  const ySubject = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Delayed fade out so parallax is visible
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);
  
  // Use Cloudinary URL from Firebase (always use landingData, no fallback to figma:asset)
  const backgroundImage = landingData?.backgroundImageUrl || '';
  
  // Safe title lines with fallback
  const titleLines = [
    landingData?.titleLine1 || '',
    landingData?.titleLine2 || '',
    landingData?.titleLine3 || ''
  ];
  
  if (import.meta.env?.DEV) {
    console.log('🟡 [HeroText] Rendering with images:', {
      backgroundImageUrl_fromFirebase: landingData?.backgroundImageUrl,
      backgroundImage_toRender: backgroundImage
    });
  }
  
  return (
    <div ref={ref} className="relative w-full h-[100dvh] hero-section">
      <div className={`relative h-full w-full overflow-hidden flex flex-col justify-end ${isDark ? 'bg-[#0E0E0E]' : 'bg-[#f0eee9]'} transition-colors duration-500`}>
        {/* Lazy load decorative canvas with no fallback to prevent layout shift */}
          <Suspense fallback={null}>
            <DigitalGridRipple isDark={isDark} />
          </Suspense>
        
        {/* Background Layer with Distortion - Parallax entrance */}
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 z-0 will-change-transform h-full w-full"
          initial={false}
          animate={isLoaded ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <InteractiveDistortion>
            {/* Background Image - High Priority */}
            <ImageWithFallback 
              src={backgroundImage} 
              alt="Hero Background" 
              className="w-full h-full object-cover object-center block"
              loading="eager"
              onLoad={() => {
                // Only count as loaded if we have a real URL
                if (backgroundImage) onImageLoaded?.();
              }}
              onError={() => {
                // If it fails but we had a URL, release the lock so we don't hang
                if (backgroundImage) onImageLoaded?.();
              }}
              // @ts-ignore
              fetchpriority="high"
            />
          </InteractiveDistortion>
        </motion.div>

        {/* Content Overlay */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-20 w-full h-full flex flex-col justify-end pointer-events-none will-change-opacity"
          initial={false}
          animate={isLoaded ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        >
          {/* Container for alignment - consistent padding across all viewports */}
          <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 max-w-[1920px] mx-auto pb-10 sm:pb-14 md:pb-20 lg:pb-24">
            
            {/* Main Hero Title Block */}
            <div className="flex flex-col items-start mb-6 sm:mb-8 md:mb-12 pointer-events-auto">
              <div 
                className="flex flex-col items-start gap-y-0 mix-blend-difference"
                onMouseEnter={() => setCursorType("text")}
                onMouseLeave={() => setCursorType("default")}
              >
                <motion.div 
                   className={`flex flex-col font-['Barlow_Condensed',sans-serif] font-bold leading-[0.85] text-[#FFEB01] tracking-[-0.02em] md:tracking-[-0.04em] transition-colors duration-500`}
                   initial="hidden"
                   animate={isLoaded ? "visible" : "hidden"}
                   variants={{
                     visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
                   }}
                >
                  <h1 className="sr-only">{landingData.titleLine1} {landingData.titleLine2} {landingData.titleLine3}</h1>

                  {/* Responsive Font Sizing with Clamps */}
                   {/* clamp(min, preferred, max) ensures text never gets too small or too big */}
                   {titleLines.map((line, i) => (
                     <div 
                       key={i} 
                       className="overflow-hidden py-3 -my-3 sm:py-4 sm:-my-4 md:py-5 md:-my-5 lg:py-6 lg:-my-6"
                     >
                       {/* Parallax Layer - Moves text UP inside the frame */}
                       <motion.div
                         style={{ y: lineTransforms[i], opacity: lineOpacities[i] }}
                         className="will-change-transform"
                       >
                         {/* Entrance Reveal Layer */}
                         <motion.div 
                           aria-hidden="true"
                           variants={{
                             hidden: { y: "110%", opacity: 0 },
                             visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } }
                           }}
                           className="text-[clamp(4rem,19vw,8rem)] sm:text-[clamp(6rem,17vw,11rem)] md:text-[clamp(6rem,12vw,12rem)] lg:text-[clamp(7rem,11vw,14rem)] xl:text-[clamp(8rem,11vw,15rem)] whitespace-nowrap font-[Base_Neue_Trial]"
                         >
                           {line}
                         </motion.div>
                       </motion.div>
                     </div>
                   ))}
                </motion.div>
              </div>
            </div>

            {/* Description & CTA Block - Unified Frame */}
            <motion.div style={{ y: yDesc, opacity: opacityDesc }} className="w-full">
            <motion.div 
               id="landing-description-cta"
               initial={{ opacity: 0, y: 40 }}
               animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
               transition={{ duration: 0.9, delay: 1.3, ease: [0.23, 1, 0.32, 1] }}
               className="w-full flex flex-col gap-6 pointer-events-auto"
            >
               {/* Description Text - Constrained Width */}
               <p className="font-sans text-[clamp(1rem,4vw,1.125rem)] sm:text-[clamp(1.125rem,3vw,1.35rem)] md:text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.4] sm:leading-relaxed tracking-tight text-[#EAEAEA] font-medium mix-blend-plus-lighter transition-colors duration-500 max-w-4xl">
                  {landingData.description}
               </p>

               {/* CTA Button - Full Width */}
               <div className="w-full transform scale-90 origin-left sm:scale-100">
                  <QuickCTA isDark={isDark} />
               </div>
            </motion.div>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Large() {
  const { isDark, toggleTheme } = useTheme();
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [copied, setCopied] = useState(false);
  
  // Smart Hero Image Loading Logic
  // Rule 1: Initial Load -> Use uploaded static hero image (defaultHeroImg)
  // Rule 4: Hero must never change while visible
  const [activeHeroImage, setActiveHeroImage] = useState(defaultHeroImg);
  const [pendingHeroImage, setPendingHeroImage] = useState<string | null>(null);
  
  // We still maintain landingData for text/content, but image is managed separately
  const [landingData, setLandingData] = useState<LandingPageData>(defaultLandingData);
  
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [projectThumbnails, setProjectThumbnails] = useState<string[]>([]);
  const [hasReceivedProjects, setHasReceivedProjects] = useState(false);
  const [preloaderReady, setPreloaderReady] = useState(false);
  
  // Initialize as false to ensure Preloader waits for the actual paint event
  // We have the URL instantly, so downloading starts at T=0, but we must wait for completion.
  const [heroImageLoaded, setHeroImageLoaded] = useState(false); 
  
  // Get hash from browser location instead of React Router
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');
  
  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch data
  useEffect(() => {
    // Landing Page Data (Hero)
    const unsubscribeLanding = subscribeToLandingData((newData) => {
      // Always update text/content immediately
      setLandingData(prev => ({
        ...newData,
        // Keep using the ACTIVE image, ignore the API image for now
        backgroundImageUrl: activeHeroImage
      }));

      // Rule 2: API Image Fetch -> Background only
      if (newData.backgroundImageUrl && newData.backgroundImageUrl !== activeHeroImage) {
         // Store as pending
         setPendingHeroImage(newData.backgroundImageUrl);
         
         // Preload aggressively
         const img = new Image();
         img.src = newData.backgroundImageUrl;
         
         // Cache for next session (optional, but good for "returning" users if we wanted that)
         try {
           localStorage.setItem("cached_hero_image", newData.backgroundImageUrl);
         } catch (e) {}
      }
    });
    
    // Project Data (Thumbnails for Preloader)
    // We fetch this here to ensure the preloader knows about them before dismissing.
    const unsubscribeProjects = subscribeToAllCaseStudies((allProjects) => {
      const published = allProjects.filter(p => p.status === 'published');
      const thumbnails = published
          .map(p => p.thumbnail)
          .filter((url): url is string => !!url);
          
      setProjectThumbnails(thumbnails);
      setHasReceivedProjects(true);
    });

    return () => {
      unsubscribeLanding();
      unsubscribeProjects();
    };
  }, []);

  // Only complete preload when preloader animation says it's done.
  useEffect(() => {
    if (preloaderReady) {
      setIsLoading(false);
    }
  }, [preloaderReady]);

  const handlePreloadComplete = () => {
    setPreloaderReady(true);
  };
  
  const handleProjectsLoaded = useCallback((thumbnails: string[]) => {
    // Deprecated: Logic moved to Large.tsx direct subscription
    // Keeping for compatibility if SelectedWork still emits it
  }, []);

  // Rule 3: Scroll-Based Swap
  // Detect when hero section leaves viewport, then swap image if pending update exists
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Check if hero is NOT intersecting AND has been scrolled past (top < 0)
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        if (pendingHeroImage && pendingHeroImage !== activeHeroImage) {
          if (import.meta.env?.DEV) console.log("🔄 [Hero Swap] Swapping to API image while out of view");
          setActiveHeroImage(pendingHeroImage);
          // Also update landingData to reflect the change for re-renders
          setLandingData(prev => ({
            ...prev,
            backgroundImageUrl: pendingHeroImage
          }));
        }
      }
    }, { threshold: 0 });

    if (heroWrapperRef.current) {
      observer.observe(heroWrapperRef.current);
    }

    return () => observer.disconnect();
  }, [pendingHeroImage, activeHeroImage]);
  
  // Sync body background color with theme to prevent white edges on overscroll
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#0E0E0E' : '#f0eee9';
  }, [isDark]);

  // Normal scroll behavior
  useEffect(() => {
    if (!isLoading && hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash, isLoading]);

  // Prefetch case study thumbnails in background (after hero loads)
  usePrefetchImages(projectThumbnails, !isLoading, 2000);

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <EnhancedPreloader 
            onComplete={handlePreloadComplete} 
            heroImageUrl={landingData.backgroundImageUrl}
            // CRITICAL: Don't dismiss preloader until the actual DOM image is loaded
            // AND ensure we actually have a URL to load (prevent early dismissal on empty initial state)
            canComplete={heroImageLoaded && !!landingData.backgroundImageUrl}
          />
        )}
      </AnimatePresence>

      <SEO 
        title="Mohamed Rasik — UI/UX & Digital Product Designer" 
        description="Mohamed Rasik is a UI/UX and Digital Product Designer focused on building clear, usable, and business-driven web and app experiences. View selected case studies and design work."
        canonical="https://rasik.design"
        image="https://images.unsplash.com/photo-1646021780609-9c908307edc5?q=80&w=1200&auto=format&fit=crop"
        type="website"
        keywords={['Product Designer', 'UI/UX Designer', 'Web Design', 'Portfolio', 'Digital Design', 'Rasik', 'Mohamed Rasik', 'Product Design Portfolio', 'UX Case Studies' ]}
      />
      
      {/* Main App Container - Always mounted but hidden during load to allow asset fetching/hydration */}
      <div 
        className={`w-full min-h-screen relative transition-colors duration-700 ease-out selection:bg-[#FFEB01] selection:text-black ${isDark ? 'bg-[#0E0E0E] text-[#EAEAEA]' : 'bg-[#f0eee9] text-[#1C1C1C]'}`}
        style={{ 
            pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        
        <SimpleNavbar isDark={isDark} toggleTheme={toggleTheme} />
        
        <main className="relative w-full z-0">
          <div ref={heroWrapperRef} className="w-full">
            <HeroText 
              isDark={isDark} 
              landingData={{...landingData, backgroundImageUrl: activeHeroImage}} 
              isLoaded={!isLoading} 
              onImageLoaded={() => setHeroImageLoaded(true)}
            />
          </div>
          
          <SelectedWork isDark={isDark} onProjectsLoaded={handleProjectsLoaded} />

          <AboutSection isDark={isDark} />
        </main>

        <Footer isDark={isDark} setCursorType={setCursorType} />
        
        {/* Toast Notification */}
        <Toast show={copied} message="Email copied to clipboard!" type="success" />
      </div>
    </CursorContext.Provider>
  );
}