import React, { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Maximize2 } from 'lucide-react';

interface LightboxProps {
  image: string;
  alt?: string;
  onClose: () => void;
}

export function Lightbox({ image, alt, onClose }: LightboxProps) {
  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle Download
  const handleDownload = async () => {
    try {
      // Skip fetch for figma: URLs or data URLs, use direct download
      if (image.startsWith('figma:') || image.startsWith('data:') || image.startsWith('blob:')) {
        window.open(image, '_blank');
        return;
      }

      const response = await fetch(image, { mode: 'cors', cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = alt ? `${alt.replace(/\s+/g, '-').toLowerCase()}.jpg` : 'image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.warn('Download via fetch failed, opening in new tab:', e);
      // Fallback: open in new tab
      window.open(image, '_blank');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
      onClick={(e) => {
        // Close if clicking the background (not the toolbar or image)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 relative z-50">
        <div className="text-white/80 text-sm font-medium truncate max-w-[50%]">
          {alt || 'View Image'}
        </div>
        
        <div className="flex items-center gap-2">
           <button 
            onClick={handleDownload}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Download Image"
          >
            <Download size={20} />
          </button>
          <div className="w-[1px] h-6 bg-white/10 mx-2" />
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area with Zoom */}
      <div className="flex-1 overflow-hidden relative w-full h-full flex items-center justify-center p-4">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Floating Zoom Controls */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2 py-1.5 bg-[#1c1c1c] border border-white/10 rounded-full shadow-2xl z-50">
                <button
                  onClick={() => zoomOut()}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => zoomIn()}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
              </div>

              {/* Image Container */}
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="w-full h-full flex items-center justify-center"
              >
                <img
                  src={image}
                  alt={alt || "Full view"}
                  className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}