import { Download, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
// Removed useNavigate to fix Router context error
import { subscribeToAboutData } from "../../config/aboutService";
import { subscribeToResumeData } from "../../config/resumeService";
import { AboutMeData, defaultAboutData } from "../../types/about";
import { ResumeData, defaultResumeData } from "../../types/resume";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// --- Tool Icons Mapping ---
const ToolIcon = ({ name }: { name: string }) => {
  const iconClass = "w-6 h-6 object-contain";
  
  // Normalized name for matching
  const key = name.toLowerCase();

  switch (true) {
    case key.includes('figma'):
      return (
        <svg viewBox="0 0 38 57" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
          <path d="M19 28.5C19 25.3533 21.5508 22.8 24.6975 22.8H28.5V13.3C28.5 10.1533 25.9492 7.6 22.8025 7.6H15.1975C12.0508 7.6 9.5 10.1533 9.5 13.3C9.5 16.4467 12.0508 19 15.1975 19H19V28.5Z" fill="#1ABCFE"/>
          <path d="M9.5 43.7C9.5 46.8467 12.0508 49.4 15.1975 49.4C18.3442 49.4 20.9 46.8467 20.9 43.7V28.5H15.1975C12.0508 28.5 9.5 31.0533 9.5 34.2V43.7Z" fill="#0ACF83"/>
          <path d="M28.5 28.5H19V38H24.6975C27.8442 38 30.4 35.4467 30.4 32.3C30.4 29.1533 27.8442 26.6 24.6975 26.6H28.5V28.5Z" fill="#FF7262" transform="translate(0 -9.5)"/>
          <path d="M28.5 13.3V22.8H34.1975C37.3442 22.8 39.9 20.2467 39.9 17.1C39.9 13.9533 37.3442 11.4 34.1975 11.4H28.5V13.3Z" fill="#A259FF" transform="translate(-9.5 0)"/>
          <path d="M9.5 28.5H19V38H15.1975C12.0508 38 9.5 35.4467 9.5 32.3V28.5Z" fill="#F24E1E"/>
        </svg>
      );
    case key.includes('photoshop'):
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#31A8FF"/>
          <path d="M5 6H19V18H5V6Z" fill="#001E36"/>
          <path d="M8 8H10.5C12 8 13 8.8 13 10C13 11.2 12 12 10.5 12H9V15H8V8ZM9 9V11H10.5C11.2 11 11.8 10.7 11.8 10C11.8 9.3 11.2 9 10.5 9H9Z" fill="#31A8FF"/>
          <path d="M14 11.5C14 11 14.3 10.8 14.8 10.8C15.2 10.8 15.6 10.9 15.9 11.1L16.2 10.3C15.8 10.1 15.3 10 14.8 10C13.8 10 13.1 10.6 13.1 11.5C13.1 12.3 13.6 12.7 14.5 13C15.2 13.3 15.4 13.5 15.4 13.8C15.4 14.2 15 14.4 14.5 14.4C14 14.4 13.5 14.2 13.1 13.9L12.7 14.7C13.2 15 13.8 15.2 14.5 15.2C15.6 15.2 16.4 14.6 16.4 13.6C16.4 12.8 15.8 12.3 15 12C14.4 11.8 14 11.7 14 11.5Z" fill="#31A8FF"/>
        </svg>
      );
    case key.includes('illustrator'):
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#330000"/>
          <path d="M5 6H19V18H5V6Z" fill="#FF9A00"/>
          <path d="M8.5 15L10.5 9H11.8L13.8 15H12.6L12.1 13.4H10.2L9.7 15H8.5ZM10.5 12.5H11.8L11.1 10.4L10.5 12.5Z" fill="#330000"/>
          <path d="M15.5 10.2H14.5V9H15.5V10.2ZM15.5 15H14.5V11H15.5V15Z" fill="#330000"/>
        </svg>
      );
    case key.includes('chatgpt'):
      return (
         <svg viewBox="0 0 24 24" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
           <path d="M22.2819 9.82116C22.1842 8.42867 21.5173 7.15286 20.4497 6.22091C19.3821 5.28896 17.9944 4.77123 16.5746 4.77443H16.5413C16.2949 3.39956 15.556 2.16489 14.4442 1.26913C13.3323 0.373373 11.9126 -0.131669 10.4137 0.00755829C8.30396 0.202396 6.43883 1.34117 5.26781 3.14921C4.0968 4.95726 3.7126 7.2185 4.20786 9.32356C3.12061 9.77497 2.16278 10.5144 1.45524 11.4485C0.747697 12.3826 0.322306 13.4695 0.233076 14.5718C0.143846 15.674 0.394747 16.7428 0.954086 17.6437C1.51342 18.5446 2.35624 19.2376 3.37628 19.6358C3.59714 21.0189 4.31825 22.2618 5.41838 23.1678C6.51852 24.0738 7.91351 24.5727 9.32431 24.5828H9.35621C9.60262 25.9577 10.3416 27.1923 11.4533 28.0881C12.5651 28.9839 13.9849 29.4889 15.4838 29.3497C17.5935 29.1549 19.4586 28.0161 20.6297 26.208C21.8007 24.4 22.1849 22.1387 21.6896 20.0337C22.7769 19.5823 23.7347 18.8428 24.4422 17.9088C25.1498 16.9747 25.5752 15.8878 25.6644 14.7855C25.7536 13.6832 25.5027 12.6144 24.9434 11.7136C24.384 10.8127 23.5412 10.1197 22.5212 9.72149L22.2819 9.82116ZM12.7226 25.5352C11.5323 25.6429 10.3475 25.2285 9.42398 24.3804C8.50047 23.5324 7.91039 22.3168 7.77884 21.0006L7.75225 19.669H11.5165C12.536 19.6546 13.5181 19.2771 14.269 18.6106C15.0199 17.9442 15.4925 17.0306 15.5941 16.0503L15.9397 12.6738H18.5056L18.2564 13.8836C18.0069 15.1565 17.3488 16.3146 16.3813 17.1824C15.4137 18.0503 14.1884 18.5804 12.8906 18.6924L12.7226 25.5352ZM21.9213 13.0643C21.7828 14.4085 21.1473 15.6387 20.1472 16.5054C19.147 17.3721 17.8596 17.8087 16.5519 17.7251L20.0319 19.1609L17.5027 21.6037C16.7823 22.2991 15.8757 22.7535 14.8986 22.9095C13.9216 23.0654 12.9184 22.9158 12.0169 22.4797L10.7406 21.8682L10.99 23.078C11.2394 24.3509 11.8975 25.509 12.8651 26.3768C13.8327 27.2447 15.0579 27.7748 16.3558 27.8868C17.5461 27.7791 18.7309 27.3647 19.6544 26.5166C20.5779 25.6685 21.168 24.453 21.2995 23.1367L21.3261 21.8051H17.5619C16.5423 21.8196 15.5602 22.1971 14.8093 22.8636C14.0585 23.53 13.5858 24.4436 13.4842 25.4239L13.1387 28.8003H10.5727L10.822 27.5906C11.0715 26.3176 11.7296 25.1596 12.6971 24.2917C13.6646 23.4239 14.89 22.8938 16.1878 22.7818L21.9213 13.0643ZM6.55694 14.7722L4.08569 13.3364L6.61489 10.8935C7.3353 10.1982 8.24192 9.74371 9.21901 9.58778C10.1961 9.43184 11.1993 9.58145 12.1007 10.0175L13.377 10.6291L13.1277 9.41928C12.8782 8.14634 12.2201 6.98829 11.2526 6.12044C10.285 5.25259 9.05975 4.72251 7.76193 4.61053C6.57165 4.71822 5.38682 5.13263 4.46332 5.98069C3.53982 6.82875 2.94974 8.04431 2.81819 9.36056L2.7916 10.6922H6.55581C7.57539 10.6777 8.55747 10.3002 9.30836 9.63378C10.0593 8.96733 10.5319 8.05374 10.6335 7.07342L10.979 3.69696H13.545L13.2957 4.90675C13.0462 6.17969 12.3881 7.33774 11.4206 8.20559C10.453 9.07345 9.22774 9.60352 7.92988 9.7155L6.55694 14.7722ZM15.8078 9.7481L19.5721 9.77469H22.1381L21.7925 6.39823C21.691 5.41791 21.2183 4.50433 20.4674 3.83787C19.7165 3.17142 18.7345 2.7939 17.7149 2.77943H13.9507L13.9772 1.44778C14.1088 0.131535 14.6989 -1.08402 15.6224 -1.93208C16.5459 -2.78014 17.7307 -3.19455 18.921 -3.30224C20.2188 -3.19026 21.4441 -2.66018 22.4116 -1.79233C23.3792 -0.924479 24.0373 0.233568 24.2867 1.50651L24.5361 2.7163L23.2598 3.32784C22.3584 3.76392 21.3552 3.91352 20.3781 3.75759C19.401 3.60165 18.4944 3.14717 17.774 2.45262L15.2448 0.0097746L12.7735 1.42953L15.8078 9.7481Z" transform="scale(0.5) translate(24 24)" fill="black" stroke="black" strokeWidth="1.5"/>
         </svg>
      );
    case key.includes('miro'):
      return (
         <svg viewBox="0 0 24 24" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
           <path d="M4.61538 19.3846V4.61539L2 6.33846V17.6615L4.61538 19.3846Z" fill="#050038"/>
           <path d="M12 19.3846V4.61539L9.38461 6.33846V17.6615L12 19.3846Z" fill="#FFD02F"/>
           <path d="M19.3846 19.3846V4.61539L16.7692 6.33846V17.6615L19.3846 19.3846Z" fill="#4262FF"/>
         </svg>
      );
    case key.includes('notion'):
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 5.5L6.5 4.5H18.5L19.5 5.5V18.5L18.5 19.5H6.5L4.5 18.5V5.5Z" fill="white" stroke="#000000" strokeWidth="2"/>
          <path d="M9 7L8 7.5V16.5L9 17H10.5L14.5 9.5V16.5L15 17H16V7.5L15 7H13.5L9.5 14.5V7.5L10 7H9Z" fill="#000000"/>
        </svg>
      );
    default:
      return (
        <span className="text-[20px] leading-none">
          {key[0].toUpperCase()}
        </span>
      );
  }
};

// --- Text Reveal Animation Component ---
const RevealText = ({ text, className, delay = 0, isDark = true }: { text: string, className?: string, delay?: number, isDark?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  // Split by space and filter empty strings to prevent invisible spans
  const words = text.split(" ").filter(w => w.length > 0);
  // Colors for animation - Darker gray start for more contrast
  const startColor = isDark ? "#525252" : "#A3A3A3";
  const endColor = isDark ? "#FFFFFF" : "#0E0E0E";

  return (
    <div ref={ref} className={`leading-snug ${className || ""}`} style={{ paddingTop: '0.2em', paddingBottom: '0.2em' }}>
      {words.map((word, i) => (
        <span key={i} className="relative inline-block mr-[0.25em]">
          <motion.span
            initial={{ y: "20%", opacity: 0, color: startColor }}
            animate={isInView ? { y: "0%", opacity: 1, color: endColor } : { y: "20%", opacity: 0, color: startColor }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.4, 0.25, 1],
              delay: delay + (i * 0.03) 
            }}
            className="inline-block"
            style={{ display: 'inline-block', verticalAlign: 'baseline' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export function AboutSection({ isDark = true }: { isDark?: boolean }) {
  const [aboutData, setAboutData] = useState<AboutMeData>(defaultAboutData);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Subscribe to real-time updates from Firebase
    const unsubscribeAbout = subscribeToAboutData((data) => {
      console.log("AboutSection received new about data:", data);
      setAboutData(data || defaultAboutData);
      setLoading(false);
    });

    const unsubscribeResume = subscribeToResumeData((data) => {
      console.log("AboutSection received new resume data:", data);
      setResumeData(data || defaultResumeData);
      setLoading(false);
    });

    // Listen for updates from Admin Panel (Legacy/Local fallback)
    const handleUpdate = () => {
      console.log('🔄 Reloading About Me data (local event)...');
      // The subscription handles the actual data fetch, but we can log or trigger animations if needed
    };
    window.addEventListener('aboutMeUpdated', handleUpdate);
    
    return () => {
      unsubscribeAbout();
      unsubscribeResume();
      window.removeEventListener('aboutMeUpdated', handleUpdate);
    };
  }, []);

  // Admin access with Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Shift + A
      if (e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault(); // Prevent default browser behavior
        console.log('🔐 Admin access activated! (Shift + A)');
        window.location.assign('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDownloadResume = () => {
    // Use resumeData from Resume Editor (centralized), fallback to aboutData
    const resumeUrl = resumeData?.resumeUrl || aboutData?.resumeUrl;
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  };

  const cardBg = isDark ? 'bg-[#1c1c1c]' : 'bg-[#FFFFFF]';
  const cardBorder = isDark ? 'border-[#2a2a2a]' : 'border-[#E5E5E5]';
  const textPrimary = isDark ? 'text-white' : 'text-[#0E0E0E]';
  const textSecondary = isDark ? 'text-[#737373]' : 'text-[#6B6B6B]';

  return (
    <section id="about" className={`${isDark ? 'bg-[#0E0E0E]' : 'bg-[#f0eee9]'} w-full px-8 md:px-24 py-8 sm:py-12 md:py-16 lg:py-20 transition-colors duration-500`}>
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ fontVariationSettings: "'opsz' 14" }}
            className={`font-['DM_Sans:SemiBold',sans-serif] font-semibold text-[32px] md:text-[40px] ${textSecondary} leading-[40px] tracking-[-2px] cursor-pointer select-none transition-colors duration-200 hover:text-[#8d8d8d]`}
          >
            About Me
          </motion.h2>
        </div>
        
        {/* Top Text Section - Animated "Reading" Effect */}
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 space-y-4 sm:space-y-6">
          <div className={`font-['DM_Sans:Medium',sans-serif] text-[20px] sm:text-[28px] md:text-[36px] lg:text-[48px] ${textPrimary} leading-[1.4] sm:leading-[1.5] tracking-[-0.4px] sm:tracking-[-0.5px]`} style={{ minHeight: '1.5em' }}>
            <RevealText text={aboutData?.mainHeading || defaultAboutData.mainHeading} isDark={isDark} />
          </div>
          {/* Subheading now uses textPrimary (White in dark mode) as requested, but animates from gray */}
          <div className={`font-['DM_Sans:Medium',sans-serif] text-[18px] sm:text-[24px] md:text-[32px] lg:text-[48px] ${textPrimary} leading-[1.4] sm:leading-[1.5] tracking-[-0.4px] sm:tracking-[-0.5px]`} style={{ minHeight: '1.5em' }}>
             <RevealText text={aboutData?.subHeading || defaultAboutData.subHeading} delay={0.2} isDark={isDark} />
          </div>
        </div>

        {/* Main Content Grid - Image Left, Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-2">
          
          {/* Profile Image - Left Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full lg:h-full"
          >
            <div className={`relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-full w-full overflow-hidden rounded-[6px] ${isDark ? 'bg-[#1c1c1c]' : 'bg-[#FFFFFF]'}`}>
              <ImageWithFallback 
                src={aboutData?.profileImageUrl || defaultAboutData.profileImageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover lg:absolute lg:inset-0"
              />
            </div>
          </motion.div>

          {/* Cards Container - Right Side */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-1.5"
          >
            {/* Dynamic Info Cards */}
            {aboutData?.infoCards?.map((card) => (
              <motion.div 
                key={card.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`${cardBg} border ${cardBorder} rounded-[6px] p-5 pb-[60px] min-h-[140px] flex flex-col gap-2 transition-colors duration-300`}
              >
                <p className={`font-['DM_Sans:Medium',sans-serif] text-[14px] md:text-[16px] ${textSecondary} tracking-[-0.16px] uppercase leading-[1.31]`}>
                  {card.label}
                </p>
                <p className={`font-['DM_Sans:Medium',sans-serif] text-[16px] md:text-[18px] lg:text-[20px] ${textPrimary} leading-[1.25] tracking-[-0.2px]`}>
                  {card.value}
                </p>
              </motion.div>
            ))}

            {/* Resume Card (Fixed at end) */}
            <motion.div 
               variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
               className={`${cardBg} border ${cardBorder} rounded-[6px] p-4 min-h-[140px] flex flex-col justify-center transition-colors duration-300`}
            >
              <button 
                onClick={handleDownloadResume}
                className="flex items-center justify-between w-full group hover:scale-[1.02] transition-transform duration-200"
              >
                {/* Left: Download Icon */}
                <div className="w-[38px] h-[38px] bg-[#FFEB01] rounded-lg flex items-center justify-center group-hover:bg-[#ffe500] transition-all duration-200 shadow-[0_0_20px_rgba(255,235,1,0.3)] group-hover:shadow-[0_0_30px_rgba(255,235,1,0.5)] flex-shrink-0">
                  <Download className="w-4 h-4 text-[#0E0E0E]" strokeWidth={2.5} />
                </div>
                
                {/* Center: Text */}
                <p className={`font-['DM_Sans:Medium',sans-serif] text-[16px] md:text-[18px] lg:text-[20px] ${textPrimary} leading-[1.25] tracking-[-0.2px] group-hover:text-[#FFEB01] transition-colors duration-200 flex-1 text-center`}>
                  View Resume
                </p>
                
                {/* Right: Arrow Icon */}
                <div className="w-[38px] h-[38px] flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className={`w-5 h-5 ${textPrimary} group-hover:text-[#FFEB01] transition-colors duration-200`} strokeWidth={2.5} />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;