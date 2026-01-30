import { useState, useEffect } from 'react';
import { subscribeToLandingData } from '@/config/landingService';
import { LandingPageData, defaultLandingData } from '@/types/landing';
import { X } from 'lucide-react';

/**
 * Debug component to display real-time Firebase data on the landing page
 * This helps diagnose sync issues between Admin Panel and the live site
 */
export function LandingPageDebug() {
  const [landingData, setLandingData] = useState<LandingPageData>(defaultLandingData);
  const [lastUpdate, setLastUpdate] = useState<string>('Never');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToLandingData((data) => {
      setLandingData(data);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    return () => unsubscribe();
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9998] bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors text-sm font-medium"
      >
        🔍 Debug Landing Data
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9998] bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg shadow-2xl w-[400px] max-h-[600px] overflow-auto">
      <div className="sticky top-0 bg-[#1c1c1c] border-b border-[#2a2a2a] p-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Landing Page Data (Live)</h3>
          <p className="text-xs text-[#737373] mt-1">Last update: {lastUpdate}</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[#737373] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Title Lines */}
        <div>
          <h4 className="text-xs text-[#737373] uppercase tracking-wider mb-2">Title Lines</h4>
          <div className="bg-[#0E0E0E] rounded-lg p-3 space-y-1">
            <p className="text-white text-sm"><span className="text-[#FFEB01]">Line 1:</span> {landingData.titleLine1}</p>
            <p className="text-white text-sm"><span className="text-[#FFEB01]">Line 2:</span> {landingData.titleLine2}</p>
            <p className="text-white text-sm"><span className="text-[#FFEB01]">Line 3:</span> {landingData.titleLine3}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs text-[#737373] uppercase tracking-wider mb-2">Description</h4>
          <div className="bg-[#0E0E0E] rounded-lg p-3">
            <p className="text-white text-sm">{landingData.description}</p>
          </div>
        </div>

        {/* Images */}
        <div>
          <h4 className="text-xs text-[#737373] uppercase tracking-wider mb-2">Background Image</h4>
          <div className="bg-[#0E0E0E] rounded-lg p-3">
            <p className="text-white text-xs font-mono break-all">{landingData.backgroundImageUrl}</p>
            {landingData.backgroundImageUrl && (
              <img 
                src={landingData.backgroundImageUrl.startsWith('figma:asset') 
                  ? '/placeholder-image.svg' 
                  : landingData.backgroundImageUrl
                } 
                alt="Background preview" 
                className="mt-2 w-full h-20 object-cover rounded border border-[#2a2a2a]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EError%3C/text%3E%3C/svg%3E';
                }}
              />
            )}
          </div>
        </div>

        {/* Metadata */}
        <div>
          <h4 className="text-xs text-[#737373] uppercase tracking-wider mb-2">Metadata</h4>
          <div className="bg-[#0E0E0E] rounded-lg p-3 space-y-1">
            <p className="text-white text-xs">
              <span className="text-[#737373]">Updated:</span>{' '}
              {landingData.updatedAt 
                ? typeof landingData.updatedAt === 'string' 
                  ? landingData.updatedAt 
                  : (landingData.updatedAt as any).toDate 
                    ? new Date((landingData.updatedAt as any).toDate()).toLocaleString()
                    : new Date(landingData.updatedAt).toLocaleString()
                : 'N/A'}
            </p>
            <p className="text-white text-xs">
              <span className="text-[#737373]">Created:</span>{' '}
              {landingData.createdAt 
                ? typeof landingData.createdAt === 'string' 
                  ? landingData.createdAt 
                  : (landingData.createdAt as any).toDate 
                    ? new Date((landingData.createdAt as any).toDate()).toLocaleString()
                    : new Date(landingData.createdAt).toLocaleString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}