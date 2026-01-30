import { useState, useEffect } from 'react';
import { AboutMeData, Tool, InfoCard } from '@/types/about';
import { getAboutData, updateAboutData, initializeAboutData } from '@/config/aboutService';
import { uploadFile } from '@/config/storage';
import { Loader2, Save, Plus, Trash2, RefreshCw, ArrowLeft } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface AboutMeEditorProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function AboutMeEditor({ onComplete, onCancel }: AboutMeEditorProps) {
  const [aboutData, setAboutData] = useState<AboutMeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load data on mount
  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    setLoading(true);
    try {
      const data = await getAboutData();
      setAboutData(data);
    } catch (error) {
      showMessage('error', 'Failed to load About Me data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!aboutData) return;

    setSaving(true);
    setMessage(null);

    try {
      // Create a copy of data to save
      let dataToSave = { ...aboutData };

      // Check if profile image is base64 and needs upload
      if (dataToSave.profileImageUrl && dataToSave.profileImageUrl.startsWith('data:')) {
        try {
          // Convert base64 to Blob
          const res = await fetch(dataToSave.profileImageUrl);
          const blob = await res.blob();
          
          // Create File object
          const ext = blob.type.split('/')[1] || 'jpg';
          const fileName = `profile-image-${Date.now()}.${ext}`;
          const file = new File([blob], fileName, { type: blob.type });

          // Upload to Firebase Storage
          console.log('Starting profile image upload...');
          const downloadUrl = await uploadFile(file, `about/${fileName}`);
          console.log('Profile image uploaded successfully:', downloadUrl);
          
          // Update data with new URL
          dataToSave.profileImageUrl = downloadUrl;
          
          // Update local state to replace base64 with URL
          setAboutData(prev => prev ? { ...prev, profileImageUrl: downloadUrl } : null);
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          const msg = uploadError instanceof Error ? uploadError.message : 'Unknown error';
          throw new Error(`Failed to upload profile image: ${msg}`);
        }
      }

      // Check if resume URL is base64 (unlikely but possible via paste)
      if (dataToSave.resumeUrl && dataToSave.resumeUrl.startsWith('data:')) {
         try {
           const res = await fetch(dataToSave.resumeUrl);
           const blob = await res.blob();
           const ext = blob.type.split('/')[1] || 'pdf';
           const fileName = `resume-${Date.now()}.${ext}`;
           const file = new File([blob], fileName, { type: blob.type });
           const downloadUrl = await uploadFile(file, `about/${fileName}`);
           dataToSave.resumeUrl = downloadUrl;
         } catch (e) {
           console.error('Error uploading resume:', e);
           // Don't fail the whole save, just log
         }
      }

      await updateAboutData(dataToSave);
      
      // Notify other components (like AboutSection) to reload data
      window.dispatchEvent(new CustomEvent('aboutMeUpdated'));
      
      showMessage('success', 'About Me data saved successfully!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      showMessage('error', error instanceof Error ? error.message : 'Failed to save data. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('This will initialize the About Me section with default data. Continue?')) return;

    setSaving(true);
    try {
      await initializeAboutData();
      await loadAboutData();
      showMessage('success', 'About Me data initialized!');
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

  const updateField = (field: keyof AboutMeData, value: any) => {
    if (!aboutData) return;
    setAboutData({ ...aboutData, [field]: value });
  };

  const addCard = () => {
    if (!aboutData) return;
    const newCard: InfoCard = { 
      id: `card-${Date.now()}`, 
      label: 'LABEL', 
      value: 'Value' 
    };
    const currentCards = aboutData.infoCards || [];
    setAboutData({ ...aboutData, infoCards: [...currentCards, newCard] });
  };

  const updateCard = (index: number, field: keyof InfoCard, value: string) => {
    if (!aboutData) return;
    const currentCards = aboutData.infoCards || [];
    const updatedCards = [...currentCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setAboutData({ ...aboutData, infoCards: updatedCards });
  };

  const removeCard = (index: number) => {
    if (!aboutData) return;
    const currentCards = aboutData.infoCards || [];
    const updatedCards = currentCards.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, infoCards: updatedCards });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFEB01]" />
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="text-center py-20">
        <p className="text-white mb-4">No About Me data found</p>
        <button
          onClick={handleInitialize}
          className="px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors"
        >
          Initialize About Me Section
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
              <h2 className="text-3xl font-bold text-white">Edit About Me Section</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadAboutData}
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
          {/* Top Text Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Top Text Section</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#737373] mb-2">Main Heading</label>
                <textarea
                  value={aboutData.mainHeading}
                  onChange={(e) => updateField('mainHeading', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#737373] mb-2">Sub Heading</label>
                <textarea
                  value={aboutData.subHeading}
                  onChange={(e) => updateField('subHeading', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                />
              </div>
            </div>
          </section>

          {/* Profile Image */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Profile Image</h3>
            
            <ImageUpload
              label="Profile Image"
              value={aboutData.profileImageUrl}
              onChange={(val) => updateField('profileImageUrl', val)}
              description="Your profile picture displayed in the About section"
            />
          </section>

          {/* Cards Content */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Cards Content</h3>
              <button
                onClick={addCard}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutData.infoCards?.map((card, index) => (
                <div key={card.id || index} className="bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg p-4 space-y-3 relative group">
                  <div className="flex justify-between gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-[#737373] mb-1">Label</label>
                      <input
                        type="text"
                        value={card.label}
                        onChange={(e) => updateCard(index, 'label', e.target.value)}
                        className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:border-[#FFEB01] uppercase"
                        placeholder="LABEL"
                      />
                    </div>
                    <button
                      onClick={() => removeCard(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors self-end"
                      title="Remove Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs text-[#737373] mb-1">Value</label>
                    <input
                      type="text"
                      value={card.value}
                      onChange={(e) => updateCard(index, 'value', e.target.value)}
                      className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:border-[#FFEB01]"
                      placeholder="Value"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resume */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Resume</h3>
            
            <div>
              <label className="block text-sm text-[#737373] mb-2">
                Resume URL (PDF link or external URL)
              </label>
              <input
                type="text"
                value={aboutData.resumeUrl || ''}
                onChange={(e) => updateField('resumeUrl', e.target.value)}
                className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                placeholder="https://... or /resume.pdf"
              />
            </div>
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