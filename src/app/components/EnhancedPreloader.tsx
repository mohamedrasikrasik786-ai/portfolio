import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Asset {
  name: string;
  url: string;
  type: 'image' | 'font';
}

export const EnhancedPreloader = ({ 
  onComplete,
  heroImageUrl,
  canComplete = true
}: { 
  onComplete: () => void;
  heroImageUrl?: string;
  canComplete?: boolean;
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Initializing");
  const [internalReady, setInternalReady] = useState(false);

  useEffect(() => {
    loadCriticalAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroImageUrl]);

  // Monitor both internal loading state and external permission (canComplete)
  useEffect(() => {
    if (internalReady && canComplete && progress >= 100) {
      const finish = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(finish);
    }
  }, [internalReady, canComplete, progress, onComplete]);

  const loadCriticalAssets = async () => {
    const criticalAssets: Asset[] = [];

    // 1. Hero Background Image (most important)
    if (heroImageUrl) {
      criticalAssets.push({
        name: 'Hero Background',
        url: heroImageUrl,
        type: 'image'
      });
    }

    // REMOVED: Case Study Thumbnails - Don't block initial load for below-fold content

    // 2. Critical fonts
    const fontAssets: Asset[] = [
      { name: 'DM Sans', url: '', type: 'font' },
      { name: 'Base Neue', url: '', type: 'font' }
    ];

    // Calculate total
    const currentAssetCount = criticalAssets.length + fontAssets.length;
    const totalAssets = currentAssetCount; // No expectedAssetCount anymore
    
    let loadedCount = 0;

    const updateProgress = (assetName: string) => {
      loadedCount++;
      // Calculate raw progress
      const rawProgress = Math.round((loadedCount / totalAssets) * 100);
      
      // Update state
      setProgress(prev => Math.max(prev, rawProgress));
      setLoadingStatus(`Loading ${assetName}`);
    };

    // Load images with decode() for better paint readiness
    const imagePromises = criticalAssets.map((asset) => {
      if (asset.type !== 'image') return Promise.resolve();

      return new Promise<void>((resolve) => {
        const img = new Image();
        
        const handleLoad = () => {
             updateProgress(asset.name);
             resolve();
        };

        img.onload = () => {
          // Try to decode to ensure it's paint-ready (fixes "no background" issue)
          if ('decode' in img) {
            img.decode()
              .then(handleLoad)
              .catch(() => {
                handleLoad(); 
              });
          } else {
            handleLoad();
          }
        };

        img.onerror = () => {
          updateProgress(asset.name);
          resolve();
        };
        
        img.src = asset.url;
      });
    });

    // Check fonts
    const fontPromises = fontAssets.map((asset) => {
      return new Promise<void>((resolve) => {
        if (document.fonts) {
          document.fonts.ready.then(() => {
            updateProgress(asset.name);
            resolve();
          });
        } else {
          setTimeout(() => {
            updateProgress(asset.name);
            resolve();
          }, 100);
        }
      });
    });

    try {
      await Promise.all([...imagePromises, ...fontPromises]);
      
      setLoadingStatus("Finalizing");
      setProgress(100);
      setInternalReady(true);
      // Wait for useEffect to trigger completion
      
    } catch (error) {
       console.error("Preload error", error);
       // Force completion on error
       setInternalReady(true);
       setProgress(100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0E0E0E] text-[#EAEAEA] cursor-wait"
    >
      <div className="relative w-full max-w-md px-8">
        {/* Large Percentage */}
        <div className="text-[120px] md:text-[180px] font-bold leading-none text-[#EAEAEA] flex justify-start">
           <span>0</span>
          <span className="text-[40px] md:text-[60px] self-start mt-4 md:mt-8">%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-[#333] mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-[#FFEB01]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>

        {/* Loading Text */}
        <div className="flex justify-between items-center mt-2 text-sm text-[#737373] font-mono uppercase tracking-wider">
          <span>{loadingStatus}</span>
          {progress < 100 && <span className="animate-pulse">...</span>}
        </div>
      </div>
    </motion.div>
  );
};