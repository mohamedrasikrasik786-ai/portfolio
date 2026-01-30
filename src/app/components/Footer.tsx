import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Linkedin, Twitter, Dribbble, Github, Link as LinkIcon, ArrowUp, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { subscribeToFooterData } from '../../config/footerService';
import { subscribeToResumeData } from '../../config/resumeService';
import { FooterData, defaultFooterData } from '../../types/footer';
import { ResumeData, defaultResumeData } from '../../types/resume';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Types
type CursorType = "default" | "text" | "card" | "button";

interface FooterProps {
  isDark: boolean;
  setCursorType: (type: CursorType) => void;
}

// Polaroid Photo Component
const PolaroidPhoto = ({ 
  src, 
  rotation, 
  delay = 0,
  offsetY = 0,
  className = ""
}: { 
  src: string; 
  rotation: number; 
  delay?: number;
  offsetY?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: 0 }}
      whileInView={{ opacity: 1, y: offsetY, rotate: rotation }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50, damping: 20 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 0, 
        y: offsetY - 60,
        zIndex: 50,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      className={`relative bg-white p-2 pb-6 shadow-xl cursor-pointer shrink-0 ${className}`}
      style={{
        transformOrigin: "center bottom",
        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
        willChange: 'transform'
      }}
    >
      <div className="w-full h-full bg-gray-100 overflow-hidden relative group">
        <ImageWithFallback 
          src={src} 
          alt="Portfolio memory" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export function Footer({ isDark, setCursorType }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // Parallax scroll effect for the container
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const unsubscribeFooter = subscribeToFooterData((data) => {
      setFooterData(data || defaultFooterData);
    });
    const unsubscribeResume = subscribeToResumeData((data) => {
      setResumeData(data || defaultResumeData);
    });
    return () => {
      unsubscribeFooter();
      unsubscribeResume();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get icon for social platform
  const getSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('linkedin')) return Linkedin;
    if (lowerName.includes('twitter') || lowerName.includes('x')) return Twitter;
    if (lowerName.includes('dribbble')) return Dribbble;
    if (lowerName.includes('github')) return Github;
    if (lowerName.includes('instagram')) return Instagram;
    if (lowerName.includes('facebook')) return Facebook;
    if (lowerName.includes('youtube')) return Youtube;
    return LinkIcon;
  };

  // Polaroid images from footer data or fallback to defaults
  const polaroidImages = footerData?.polaroidImages && footerData.polaroidImages.length > 0
    ? footerData.polaroidImages
    : defaultFooterData.polaroidImages;

  // Specific rotations for that "scattered" look
  const rotations = [-6, 8, -4, 5, -8, 6];
  
  // Varying offsets to position them at different heights behind the frame
  const initialOffsets = [-45, -90, -30, -80, -52, -68];

  // Margins for desktop scatter
  const marginClasses = [
    "ml-0",                                                                          
    "-ml-4 sm:-ml-6 md:-ml-8 lg:-ml-10 xl:-ml-12",                                   
    "-ml-6 sm:-ml-8 md:-ml-10 lg:-ml-16 xl:-ml-20",                                  
    "-ml-2 sm:-ml-4 md:-ml-6 lg:-ml-8 xl:-ml-10",                                    
    "-ml-4 sm:-ml-6 md:-ml-8 lg:-ml-12 xl:-ml-16",                                   
    "-ml-8 sm:-ml-10 md:-ml-12 lg:-ml-16 xl:-ml-24",                                 
  ];

  // Duplicate images for infinite marquee on mobile
  // We'll create a tripled array to ensure smooth looping even on wider mobile screens
  const marqueeImages = [...polaroidImages, ...polaroidImages, ...polaroidImages];

  return (
    <footer 
      id="contact"
      ref={footerRef}
      className={`relative w-full pt-20 lg:pt-64 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0E0E0E]' : 'bg-[#f0eee9]'
      }`}
    >
      <div className="w-full flex flex-col items-center">
        
        {/* Mobile Marquee - Visible only on mobile/tablet */}
        <div className="lg:hidden w-full overflow-hidden mb-12 relative z-0">
          <motion.div 
            className="flex items-center gap-4 px-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 20 // Adjust speed as needed
            }}
          >
            {marqueeImages.map((img, idx) => (
              <div 
                key={`marquee-${idx}`} 
                className="shrink-0 w-[160px] h-[200px] bg-white p-2 pb-6 shadow-lg transform rotate-2 even:-rotate-2"
              >
                <div className="w-full h-full bg-gray-100 overflow-hidden relative">
                  <ImageWithFallback 
                    src={img} 
                    alt="Portfolio memory" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Desktop Scattered Layout - Hidden on mobile */}
        <motion.div 
          style={{ y: smoothParallaxY }}
          className="relative z-0 hidden lg:flex items-end justify-center -mb-24 sm:-mb-32 md:-mb-40 lg:-mb-40 xl:-mb-48 pointer-events-none w-full max-w-[1920px] mx-auto px-4 overflow-visible"
        >
          {polaroidImages.map((img, idx) => (
            <div key={idx} className={`pointer-events-auto ${marginClasses[idx]}`}>
               <PolaroidPhoto 
                src={img}
                rotation={rotations[idx]}
                delay={idx * 0.1}
                offsetY={initialOffsets[idx]}
                className="w-[216px] h-[270px] xl:w-[270px] xl:h-[338px]"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Content Frame */}
      <div className="relative z-10 w-full">
        <div 
          className={`relative w-full rounded-t-[40px] md:rounded-t-[60px] px-8 py-10 md:px-16 md:py-14 lg:px-20 lg:py-16 overflow-hidden backdrop-blur-xl transition-all duration-500 border-t ${
            isDark 
              ? 'bg-[#1a1a1a]/80 border-white/10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]' 
              : 'bg-white/80 border-white/40 shadow-[0_-20px_60px_-15px_rgba(255,255,255,0.2)]'
          }`}
        >
           {/* Noise texture overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className="relative z-10 max-w-[1400px] mx-auto">
            {/* Main Content - Asymmetric Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* Left Column (Wider): H2 + Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-7 flex flex-col justify-between gap-12"
              >
                <h2 
                  className={`font-['Base_Neue_Trail',sans-serif] font-bold text-[32px] md:text-[48px] lg:text-[64px] xl:text-[72px] leading-[0.9] tracking-tighter ${
                    isDark ? 'text-white' : 'text-[#0E0E0E]'
                  }`}
                >
                  {footerData?.contact?.heading || "Let's work together"}
                </h2>

                {/* Email - Desktop Position */}
                <div className="mt-auto hidden lg:block">
                  <a
                    href={`mailto:${footerData?.contact?.email || defaultFooterData.contact.email}`}
                    onMouseEnter={() => setCursorType("text")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`font-['Barlow_Condensed',sans-serif] font-medium text-[24px] md:text-[32px] hover:text-[#FFEB01] transition-colors duration-200 block ${
                      isDark ? 'text-white/80' : 'text-[#0E0E0E]/80'
                    }`}
                  >
                    {footerData?.contact?.email || defaultFooterData.contact.email}
                  </a>
                </div>
              </motion.div>

              {/* Right Column (Narrower): Description, Buttons, Socials, BackToTop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-5 flex flex-col justify-between gap-10"
              >
                <div className="flex flex-col gap-8">
                  <p className={`font-['DM_Sans',sans-serif] text-[18px] md:text-[20px] lg:text-[22px] leading-[1.5] ${
                    isDark ? 'text-white/70' : 'text-[#0E0E0E]/70'
                  }`}>
                    {footerData?.contact?.subheading || "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!"}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`mailto:${footerData?.contact?.email || defaultFooterData.contact.email}`}
                      onMouseEnter={() => setCursorType("button")}
                      onMouseLeave={() => setCursorType("default")}
                      className="px-8 py-4 bg-[#FFEB01] text-[#0E0E0E] rounded-full font-['Barlow_Condensed',sans-serif] font-bold text-[18px] uppercase tracking-wider hover:bg-[#ffe500] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-[#FFEB01]/50 hover:-translate-y-1"
                    >
                      <Mail size={20} />
                      Get in Touch
                    </a>

                    <a
                      href={resumeData?.resumeUrl || defaultResumeData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursorType("button")}
                      onMouseLeave={() => setCursorType("default")}
                      className={`px-8 py-4 rounded-full font-['Barlow_Condensed',sans-serif] font-bold text-[18px] uppercase tracking-wider transition-all duration-300 border hover:-translate-y-1 ${
                        isDark 
                          ? 'border-white/20 text-white hover:bg-white hover:text-[#0E0E0E]' 
                          : 'border-black/20 text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-white'
                      }`}
                    >
                      View Resume
                    </a>
                  </div>
                </div>

                {/* Email - Mobile/Tablet Position */}
                <div className="block lg:hidden">
                  <a
                    href={`mailto:${footerData?.contact?.email || defaultFooterData.contact.email}`}
                    onMouseEnter={() => setCursorType("text")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`font-['Barlow_Condensed',sans-serif] font-medium text-[24px] md:text-[32px] hover:text-[#FFEB01] transition-colors duration-200 block ${
                      isDark ? 'text-white/80' : 'text-[#0E0E0E]/80'
                    }`}
                  >
                    {footerData?.contact?.email || defaultFooterData.contact.email}
                  </a>
                </div>

                {/* Footer Bottom Elements */}
                <div className={`flex flex-wrap items-center justify-between gap-6 pt-8 border-t ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}>
                  {/* Social Icons */}
                  <div className="flex items-center gap-3">
                    {(footerData?.socialLinks || defaultFooterData.socialLinks)
                      .filter(l => l.enabled)
                      .map((link) => {
                        const Icon = getSocialIcon(link.name);
                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorType("button")}
                            onMouseLeave={() => setCursorType("default")}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#FFEB01] hover:bg-[#FFEB01] group leading-none ${
                              isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                            }`}
                            aria-label={link.name}
                          >
                            <Icon className={`w-4 h-4 transition-colors duration-300 ${
                              isDark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-black'
                            }`} />
                          </a>
                        );
                      })}
                  </div>

                  {/* Back to Top */}
                  <button
                    onClick={scrollToTop}
                    onMouseEnter={() => setCursorType("button")}
                    onMouseLeave={() => setCursorType("default")}
                    className={`flex items-center gap-2 font-['Barlow_Condensed',sans-serif] font-bold text-[16px] uppercase tracking-wider hover:text-[#FFEB01] transition-colors duration-200 ${
                      isDark ? 'text-white/60' : 'text-[#0E0E0E]/60'
                    }`}
                  >
                    BACK TO TOP
                    <ArrowUp size={16} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;