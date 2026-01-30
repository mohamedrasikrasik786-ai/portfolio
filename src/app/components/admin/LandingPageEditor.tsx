import { useState, useEffect } from 'react';
import { LandingPageData } from '@/types/landing';
import { getLandingData, updateLandingData, initializeLandingData } from '@/config/landingService';
import { uploadFile } from '@/config/storage';
import { Loader2, Save, RefreshCw, Image as ImageIcon, ArrowLeft, X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface LandingPageEditorProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function LandingPageEditor({ onComplete, onCancel }: LandingPageEditorProps) {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load data on mount
  useEffect(() => {
    loadLandingData();
  }, []);

  const loadLandingData = async () => {
    setLoading(true);
    try {
      const data = await getLandingData();
      setLandingData(data);
    } catch (error) {
      showMessage('error', 'Failed to load Landing Page data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!landingData) return;

    setSaving(true);
    setMessage(null);

    try {
      console.log('🔵 [LandingPageEditor] Starting save process...');
      console.log('🔵 [LandingPageEditor] Current landingData:', landingData);
      
      let dataToSave = { ...landingData };

      // Helper to upload image if base64
      const uploadIfNeeded = async (dataUrl: string | undefined, prefix: string): Promise<string | undefined> => {
        if (!dataUrl || !dataUrl.startsWith('data:')) {
          console.log(`🔵 [LandingPageEditor] ${prefix}: No upload needed, already a URL:`, dataUrl?.substring(0, 50));
          return dataUrl;
        }

        try {
          console.log(`🔵 [LandingPageEditor] ${prefix}: Converting base64 to file...`);
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const ext = blob.type.split('/')[1] || 'jpg';
          const fileName = `${prefix}-${Date.now()}.${ext}`;
          const file = new File([blob], fileName, { type: blob.type });
          
          console.log(`🔵 [LandingPageEditor] ${prefix}: Uploading to Cloudinary...`, fileName);
          const uploadedUrl = await uploadFile(file, `landing/${fileName}`);
          console.log(`🔵 [LandingPageEditor] ${prefix}: Upload successful! URL:`, uploadedUrl);
          return uploadedUrl;
        } catch (error) {
          console.error(`🔴 [LandingPageEditor] ${prefix}: Upload failed:`, error);
          const msg = error instanceof Error ? error.message : 'Unknown error';
          throw new Error(`Failed to upload ${prefix} image: ${msg}`);
        }
      };

      // Upload images
      if (dataToSave.backgroundImageUrl) {
        dataToSave.backgroundImageUrl = await uploadIfNeeded(dataToSave.backgroundImageUrl, 'background-image') || '';
      }

      console.log('🔵 [LandingPageEditor] After uploads, dataToSave:', {
        backgroundImageUrl: dataToSave.backgroundImageUrl,
        titleLine1: dataToSave.titleLine1,
        titleLine2: dataToSave.titleLine2,
        titleLine3: dataToSave.titleLine3
      });

      // Update state with URLs
      setLandingData(prev => prev ? {
        ...prev,
        backgroundImageUrl: dataToSave.backgroundImageUrl
      } : null);

      console.log('🔵 [LandingPageEditor] Saving to Firebase...');
      await updateLandingData(dataToSave);
      console.log('✅ [LandingPageEditor] Save to Firebase complete!');
      
      showMessage('success', 'Landing Page data saved successfully!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('🔴 [LandingPageEditor] Save failed:', error);
      showMessage('error', error instanceof Error ? error.message : 'Failed to save data. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('This will initialize the Landing Page with default data. Continue?')) return;

    setSaving(true);
    try {
      await initializeLandingData();
      await loadLandingData();
      showMessage('success', 'Landing Page data initialized!');
    } catch (error) {
      showMessage('error', 'Failed to initialize data');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const updateField = (field: keyof LandingPageData, value: any) => {
    if (!landingData) return;
    setLandingData({ ...landingData, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFEB01]" />
      </div>
    );
  }

  if (!landingData) {
    return (
      <div className="text-center py-20">
        <p className="text-white mb-4">No Landing Page data found</p>
        <button
          onClick={handleInitialize}
          className="px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors"
        >
          Initialize Landing Page
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0E0E0E] z-[9999] overflow-auto">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Header with Buttons */}
        <div className="sticky top-0 z-10 bg-[#0E0E0E] pb-6 mb-8 border-b border-[#2a2a2a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="flex items-center justify-center w-10 h-10 bg-[#1c1c1c] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors"
                title="Back to Admin"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-3xl font-bold text-white">Edit Landing Page</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadLandingData}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1c1c1c] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Reload
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-colors disabled:opacity-50 font-semibold shadow-lg shadow-[#FFEB01]/20"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="space-y-8">
          {/* Hero Title Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Hero Title (3 Lines)</h3>
            <p className="text-sm text-[#737373] mb-6">
              The large yellow text that appears on the landing page. Each line animates separately.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#737373] mb-2">
                  Line 1 <span className="text-[#FFEB01]">(Top)</span>
                </label>
                <input
                  type="text"
                  value={landingData.titleLine1}
                  onChange={(e) => updateField('titleLine1', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white text-lg focus:outline-none focus:border-[#FFEB01]"
                  placeholder="product"
                />
              </div>

              <div>
                <label className="block text-sm text-[#737373] mb-2">
                  Line 2 <span className="text-[#FFEB01]">(Middle)</span>
                </label>
                <input
                  type="text"
                  value={landingData.titleLine2}
                  onChange={(e) => updateField('titleLine2', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white text-lg focus:outline-none focus:border-[#FFEB01]"
                  placeholder="design"
                />
              </div>

              <div>
                <label className="block text-sm text-[#737373] mb-2">
                  Line 3 <span className="text-[#FFEB01]">(Bottom)</span>
                </label>
                <input
                  type="text"
                  value={landingData.titleLine3}
                  onChange={(e) => updateField('titleLine3', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white text-lg focus:outline-none focus:border-[#FFEB01]"
                  placeholder="Focused"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 p-6 bg-[#0E0E0E] rounded-lg border border-[#2a2a2a]">
              <p className="text-xs text-[#737373] mb-3 uppercase tracking-wider">Preview:</p>
              <div className="font-['Barlow_Condensed',sans-serif] font-bold text-[#FFEB01] leading-[0.85] tracking-tight">
                <div className="text-5xl">{landingData.titleLine1}</div>
                <div className="text-5xl">{landingData.titleLine2}</div>
                <div className="text-5xl">{landingData.titleLine3}</div>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Description Text</h3>
            <p className="text-sm text-[#737373] mb-6">
              The descriptive text that appears below the hero title.
            </p>
            
            <div>
              <label className="block text-sm text-[#737373] mb-2">Description</label>
              <textarea
                value={landingData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                placeholder="I design web and mobile products..."
              />
            </div>

            {/* Preview */}
            <div className="mt-4 p-4 bg-[#0E0E0E] rounded-lg border border-[#2a2a2a]">
              <p className="text-xs text-[#737373] mb-2 uppercase tracking-wider">Preview:</p>
              <p className="text-[#EAEAEA] text-lg leading-relaxed">
                {landingData.description}
              </p>
            </div>
          </section>

          {/* Hero Images Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Hero Background Image</h3>
            <p className="text-sm text-[#737373] mb-6">
              Upload the background image for the hero section.
            </p>
            
            <ImageUpload
              label="Background Image"
              value={landingData.backgroundImageUrl}
              onChange={(val) => updateField('backgroundImageUrl', val)}
              description="The main background image that covers the entire hero section"
            />
          </section>
        </div>

        {/* Save Button (Bottom) */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50 text-lg font-semibold"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}