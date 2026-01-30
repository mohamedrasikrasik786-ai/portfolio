import {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "@/imports/svg-4cka6uhxjj";
import { subscribeToResumeData } from "../../config/resumeService";
import { ResumeData, defaultResumeData } from "@/types/resume";

// Cursor Context (assuming it exists in parent)
type CursorType = "default" | "text" | "card" | "button";
interface CursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}
const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  setCursorType: () => {},
});
const useCursor = () => useContext(CursorContext);

// Icon for Resume
function ResumeIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg
        className="block size-full"
        fill="none"
        viewBox="0 0 14 14"
      >
        <g>
          <path
            d={svgPaths.p3fe13600}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d={svgPaths.p3fe13600}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 8.75V1.75"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
      </svg>
    </div>
  );
}

interface CTAItemProps {
  id: number;
  normalText: string;
  hoverText: string;
  href: string;
  hasIcon?: boolean;
}

const items: CTAItemProps[] = [
  {
    id: 0,
    normalText: "Selected Work",
    hoverText: "See how I solve real problems",
    href: "#work",
  },
  {
    id: 1,
    normalText: "About me",
    hoverText: "Learn how I think as a designer",
    href: "#about",
  },
  {
    id: 2,
    normalText: "Connect",
    hoverText: "Let's talk about your project",
    href: "#contact",
  },
  {
    id: 3,
    normalText: "Resume",
    hoverText: "View my experience & skills",
    href: "#resume",
  },
];

export function QuickCTA({
  isDark = true,
}: {
  isDark?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<
    number | null
  >(null);
  const { setCursorType } = useCursor();
  const [resumeData, setResumeData] = useState<ResumeData>(
    defaultResumeData,
  );

  // Subscribe to resume data
  useEffect(() => {
    const unsubscribe = subscribeToResumeData((data) => {
      setResumeData(data);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    item: CTAItemProps,
  ) => {
    e.preventDefault();

    // Special handling for Resume button
    if (item.normalText === "Resume" && resumeData.resumeUrl) {
      window.open(resumeData.resumeUrl, "_blank");
      return;
    }

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative w-full pointer-events-auto">
      <div className="relative">
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-2 md:h-auto md:min-h-[76px] landscape:max-md:flex landscape:max-md:overflow-x-auto landscape:max-md:h-[64px] landscape:max-md:[&::-webkit-scrollbar]:hidden landscape:max-md:[-ms-overflow-style:none] landscape:max-md:[scrollbar-width:none]">
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item.href, item)}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setCursorType("button");
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setCursorType("default");
                }}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setHoveredIndex(null)}
                onTouchCancel={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.02 }}
                transition={{
                  scale: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  },
                }}
                className="relative w-full h-[70px] md:h-[76px] cursor-pointer overflow-hidden flex items-center justify-center rounded-[16px] transition-all duration-300 landscape:max-md:min-w-[40vw] landscape:max-md:h-full group"
                style={{
                  isolation: "isolate",
                  transform: "translateZ(0)",
                  willChange: "transform",
                }}
              >
                {/* Layer 0: Shadow */}
                <div className="absolute inset-0 rounded-[16px] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.1)] z-0 pointer-events-none" />

                {/* Layer 1: Glass Base Layer (Inset 1px, Blur) */}
                <div className="absolute inset-px rounded-[16px] bg-white/10 backdrop-blur-xl backdrop-saturate-150 z-0" />

                {/* Layer 2: Gradient Sheen */}
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/20 to-transparent opacity-50 z-0 pointer-events-none" />

                {/* Layer 3: Hover Fill Animation */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FFEB01] to-[#FFC700] rounded-[16px] z-10"
                  style={{
                    transformOrigin: "left",
                  }}
                />

                {/* Layer 4: Border & Inner Highlight */}
                <div className="absolute inset-0 rounded-[16px] border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] z-20 pointer-events-none" />

                {/* Layer 5: Content */}
                <div className="relative z-30 size-full flex items-center justify-center overflow-hidden px-4">
                  <AnimatePresence mode="wait">
                    {isHovered ? (
                      <motion.p
                        key="hover"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="font-sans font-semibold leading-[1.1] not-italic text-black text-[14px] md:text-[16px] lg:text-[18px] tracking-[0px] text-center w-full uppercase"
                      >
                        {item.hoverText}
                      </motion.p>
                    ) : (
                      <motion.div
                        key="normal"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="flex items-center gap-[10px]"
                      >
                        {item.hasIcon && (
                          <ResumeIcon color="white" />
                        )}
                        <p className="font-sans font-semibold leading-[normal] not-italic text-white text-[18px] md:text-[20px] lg:text-[24px] tracking-[0px] whitespace-nowrap uppercase drop-shadow-sm">
                          {item.normalText}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}