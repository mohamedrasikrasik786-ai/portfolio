import { useState, useEffect } from 'react';
import { FooterData, SocialLink } from '@/types/footer';
import { getFooterData, updateFooterData, initializeFooterData } from '@/config/footerService';
import { uploadFile } from '@/config/storage';
import { Loader2, Save, RefreshCw, ArrowLeft, Plus, Trash2, Link as LinkIcon, Mail, Upload, Image as ImageIcon } from 'lucide-react';

interface FooterEditorProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function FooterEditor({ onComplete, onCancel }: FooterEditorProps) {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load data on mount
  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    setLoading(true);
    try {
      const data = await getFooterData();
      setFooterData(data);
    } catch (error) {
      showMessage('error', 'Failed to load Footer data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!footerData) return;

    setSaving(true);
    setMessage(null);

    try {
      let dataToSave = JSON.parse(JSON.stringify(footerData));

      // Check Social Links
      if (dataToSave.socialLinks) {
        for (const link of dataToSave.socialLinks) {
          if (link.url && link.url.startsWith('data:')) {
             try {
               const res = await fetch(link.url);
               const blob = await res.blob();
               const fileName = `social-icon-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
               const file = new File([blob], fileName, { type: blob.type });
               link.url = await uploadFile(file, `footer/${fileName}`);
             } catch (e) {
               console.error('Failed to upload social link image:', e);
             }
          }
        }
      }

      await updateFooterData(dataToSave);
      
      // Update local state with uploaded URLs
      setFooterData(dataToSave);

      showMessage('success', 'Footer data saved successfully!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      showMessage('error', 'Failed to save data. Please try again.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (!confirm('This will initialize the Footer with default data. Continue?')) return;

    setSaving(true);
    try {
      await initializeFooterData();
      await loadFooterData();
      showMessage('success', 'Footer data initialized!');
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

  const updateField = (section: keyof FooterData, field: string, value: any) => {
    if (!footerData) return;
    
    // Handle nested updates
    setFooterData({
      ...footerData,
      [section]: {
        ...footerData[section],
        [field]: value
      }
    });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: any) => {
    if (!footerData) return;
    
    const newLinks = [...footerData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    
    setFooterData({ ...footerData, socialLinks: newLinks });
  };

  const updatePolaroidImage = (index: number, value: string) => {
    if (!footerData) return;
    
    const newImages = [...(footerData.polaroidImages || [])];
    newImages[index] = value;
    
    setFooterData({ ...footerData, polaroidImages: newImages });
  };

  const handlePolaroidUpload = async (index: number, file: File) => {
    if (!footerData) return;
    
    try {
      // Show loading state for this specific image? 
      // For now we just use the global saving state or just let it happen asynchronously
      const fileName = `polaroid-${index}-${Date.now()}-${Math.random().toString(36).substr(2,5)}`;
      const url = await uploadFile(file, `footer/${fileName}`);
      updatePolaroidImage(index, url);
    } catch (e) {
      console.error('Failed to upload polaroid image:', e);
      showMessage('error', 'Failed to upload image');
    }
  };

  const addSocialLink = () => {
    if (!footerData) return;
    
    const newLink: SocialLink = {
      id: `link-${Date.now()}`,
      name: 'New Link',
      url: 'https://',
      enabled: true
    };
    
    setFooterData({
      ...footerData,
      socialLinks: [...footerData.socialLinks, newLink]
    });
  };

  const removeSocialLink = (index: number) => {
    if (!footerData) return;
    
    const newLinks = [...footerData.socialLinks];
    newLinks.splice(index, 1);
    
    setFooterData({ ...footerData, socialLinks: newLinks });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFEB01]" />
      </div>
    );
  }

  if (!footerData) {
    return (
      <div className="text-center py-20">
        <p className="text-white mb-4">No Footer data found</p>
        <button
          onClick={handleInitialize}
          className="px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#FFD700] transition-colors"
        >
          Initialize Footer
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
              <h2 className="text-3xl font-bold text-white">Edit Footer</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadFooterData}
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
          
          {/* Main Content Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Footer Content</h3>
            <p className="text-sm text-[#737373] mb-6">
              Manage the main text and contact information displayed in the footer.
            </p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-[#737373] mb-2">Main Heading (Left Side)</label>
                <textarea
                  value={footerData.contact.heading}
                  onChange={(e) => updateField('contact', 'heading', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white text-lg font-bold focus:outline-none focus:border-[#FFEB01]"
                  placeholder="LET'S WORK TOGETHER"
                />
                <p className="text-xs text-[#737373] mt-2">
                  This is the large text displayed on the left side of the footer.
                </p>
              </div>

              <div>
                <label className="block text-sm text-[#737373] mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={footerData.contact.email}
                  onChange={(e) => updateField('contact', 'email', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-[#737373] mb-2">Subheading (Right Side)</label>
                <textarea
                  value={footerData.contact.subheading}
                  onChange={(e) => updateField('contact', 'subheading', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#FFEB01]"
                  placeholder="I'm always interested in hearing about new projects..."
                />
                 <p className="text-xs text-[#737373] mt-2">
                  The descriptive text displayed above the action buttons.
                </p>
              </div>
            </div>
          </section>

          {/* Polaroid Images Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Polaroid Images</h3>
            <p className="text-sm text-[#737373] mb-6">
              Upload 6 images for the footer background collage.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const imageUrl = footerData.polaroidImages?.[index] || '';
                
                return (
                  <div key={index} className="space-y-3">
                    <label className="block text-xs text-[#737373] uppercase tracking-wider font-semibold">
                      Image {index + 1}
                    </label>
                    
                    <div className="relative aspect-[4/5] bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg overflow-hidden group">
                      {imageUrl ? (
                        <>
                          <img 
                            src={imageUrl} 
                            alt={`Polaroid ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                             <label className="cursor-pointer p-2 bg-[#FFEB01] rounded-full text-[#0E0E0E] hover:bg-[#ffe500] transition-colors shadow-lg">
                              <RefreshCw className="w-4 h-4" />
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePolaroidUpload(index, file);
                                }}
                              />
                            </label>
                          </div>
                        </>
                      ) : (
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-[#2a2a2a] transition-colors text-[#737373] hover:text-white">
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="text-xs">Upload Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePolaroidUpload(index, file);
                            }}
                          />
                        </label>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => updatePolaroidImage(index, e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-xs focus:outline-none focus:border-[#FFEB01]"
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Social Links Section */}
          <section className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Social Links</h3>
              <button
                onClick={addSocialLink}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a2a] text-white rounded hover:bg-[#333] transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>
            
            <div className="space-y-4">
              {footerData.socialLinks.map((link, index) => (
                <div key={link.id} className="flex flex-col md:flex-row gap-4 p-4 bg-[#0E0E0E] rounded-lg border border-[#2a2a2a]">
                  <div className="flex-1 space-y-4 md:space-y-0 md:flex md:gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-[#737373] mb-1">Name</label>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:border-[#FFEB01]"
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-xs text-[#737373] mb-1 flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> URL
                      </label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                        className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-sm focus:outline-none focus:border-[#FFEB01]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <label className="flex items-center gap-2 cursor-pointer text-white px-3 py-2 bg-[#1c1c1c] rounded border border-[#2a2a2a]">
                      <input 
                        type="checkbox"
                        checked={link.enabled}
                        onChange={(e) => updateSocialLink(index, 'enabled', e.target.checked)}
                        className="w-4 h-4 rounded border-[#2a2a2a] bg-[#0E0E0E] text-[#FFEB01] focus:ring-[#FFEB01]"
                      />
                      <span className="text-sm">Show</span>
                    </label>
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="p-2 text-red-400 hover:text-red-300 bg-[#1c1c1c] rounded border border-[#2a2a2a] hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
                      title="Remove Link"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
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
