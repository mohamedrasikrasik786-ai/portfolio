import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon, Link, Loader2, Trash2 } from 'lucide-react';
import { uploadToCloudinary, deleteFromCloudinary, isCloudinaryConfigured } from '@/config/cloudinary';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  description?: string;
  placeholder?: string;
  folder?: string; // Cloudinary folder path
  aspectRatio?: '16:9' | '2:1' | '1:1' | '4:3'; // Aspect ratio for preview
}

export function ImageUpload({ 
  label, 
  value, 
  onChange, 
  className = '', 
  description,
  placeholder = "https://...",
  folder = 'assets', // Default folder
  aspectRatio = '16:9' // Default aspect ratio
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inputType, setInputType] = useState<'upload' | 'url'>('upload');
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Drag Events
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle Manual File Selection
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process File and Upload to Cloudinary
  const handleFile = async (file: File) => {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      alert(
        'Cloudinary is not configured. Please add your Cloudinary credentials to the .env file:\n\n' +
        'VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name\n' +
        'VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset\n\n' +
        'For now, please use the URL tab to paste an image URL instead.'
      );
      setInputType('url'); // Switch to URL mode
      return;
    }

    // Check if image
    if (!file.type.match('image.*')) {
      alert("Please upload an image file");
      return;
    }

    // Check file size (max 10MB for Cloudinary free plan)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size too large. Please upload an image smaller than ${maxSizeMB}MB.`);
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file, folder, (progress) => {
        setUploadProgress(progress);
      });
      
      console.log('✅ Image uploaded to Cloudinary:', cloudinaryUrl);
      onChange(cloudinaryUrl);
      setInputType('upload'); // Switch to upload mode to show preview
    } catch (error) {
      console.error('❌ Cloudinary upload failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Image upload failed: ${errorMessage}\n\nPlease use the URL tab to paste an image URL instead.`);
      setInputType('url'); // Switch to URL mode as fallback
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Trigger file input click
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const clearImage = async () => {
    // If it's a Cloudinary URL, try to delete it from the cloud
    if (value && value.includes('cloudinary.com') && !value.startsWith('data:')) {
      if (confirm('Are you sure you want to remove this image? It will be permanently deleted from Cloudinary.')) {
        setLoading(true);
        await deleteFromCloudinary(value);
        setLoading(false);
        onChange('');
      }
    } else {
      // Local or other URL, just clear
      onChange('');
    }
  };

  // If value starts with data:, it's an uploaded file. 
  // If it starts with http or figma:, it's a URL.
  const isUploaded = value?.startsWith('data:');
  const isUrl = value?.startsWith('http') || value?.startsWith('figma:');
  const hasValue = !!value;

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '1:1': return 'aspect-square';
      case '4:3': return 'aspect-[4/3]';
      case '2:1': return 'aspect-[2/1]';
      case '16:9':
      default: return 'aspect-video';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#737373] uppercase tracking-wider">
          {label}
        </label>
      )}

      {hasValue ? (
        // PREVIEW STATE
        <div className={`relative group bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl overflow-hidden ${getAspectRatioClass()}`}>
           <img 
             src={value} 
             alt="Preview" 
             className="w-full h-full object-cover bg-[#0E0E0E]"
           />
           
           {/* Overlay Actions */}
           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             <button
               onClick={clearImage}
               className="p-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
               title="Remove Image"
             >
               <Trash2 size={20} />
             </button>
           </div>
           
           <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/50 backdrop-blur rounded text-xs text-white/70 font-mono max-w-[90%] truncate">
             {isUploaded ? 'Local Image (Base64)' : value}
           </div>
        </div>
      ) : (
        // EMPTY STATE
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl overflow-hidden transition-all hover:border-[#FFEB01]/30">
          {/* Tabs */}
          <div className="flex border-b border-[#2a2a2a]">
            <button
              type="button"
              onClick={() => setInputType('upload')}
              className={`flex-1 py-2 text-xs font-medium transition-colors relative ${
                inputType === 'upload' 
                  ? 'bg-[#2a2a2a] text-white' 
                  : 'bg-[#1c1c1c] text-[#737373] hover:text-white'
              }`}
            >
              Upload
              {!isCloudinaryConfigured() && (
                <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full" title="Cloudinary not configured" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setInputType('url')}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${
                inputType === 'url' 
                  ? 'bg-[#2a2a2a] text-white' 
                  : 'bg-[#1c1c1c] text-[#737373] hover:text-white'
              }`}
            >
              URL
            </button>
          </div>

          <div className="p-6">
            {inputType === 'upload' ? (
              <>
                {!isCloudinaryConfigured() && (
                  <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-xs text-orange-400 leading-relaxed">
                      ⚠️ Cloudinary is not configured. Please add your credentials to the .env file or use the URL tab to paste image URLs.
                    </p>
                  </div>
                )}
                <div 
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    dragActive 
                      ? 'border-[#FFEB01] bg-[#FFEB01]/5' 
                      : 'border-[#2a2a2a] hover:border-[#737373] hover:bg-[#2a2a2a]/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={onButtonClick}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  
                  <div className="flex flex-col items-center gap-3">
                    {loading ? (
                      <Loader2 className="w-8 h-8 text-[#FFEB01] animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-[#737373]" />
                    )}
                    <div>
                      <p className="text-white text-sm font-medium">
                        {loading ? "Processing..." : "Click or Drag image here"}
                      </p>
                      <p className="text-[#737373] text-xs mt-1">
                        Supports JPG, PNG, GIF
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-4">
                <div className="flex items-center gap-2 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg px-3 py-2 focus-within:border-[#FFEB01] transition-colors">
                  <Link size={16} className="text-[#737373]" />
                  <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-[#737373]/50"
                  />
                </div>
                <p className="text-[#737373] text-xs mt-3 text-center">
                  Paste a direct link to an image
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {description && (
        <p className="text-xs text-[#737373] mt-1.5">
          {description}
        </p>
      )}
    </div>
  );
}