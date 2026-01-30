import { useState, useEffect } from 'react';
import { Plus, GripVertical, ChevronUp, ChevronDown, Copy, Trash2, AlignLeft, Type, List, Quote, Users, Workflow, Image as ImageIcon, Minus, MoreHorizontal, X, Save, Loader2, FileText, Eye, EyeOff, LayoutTemplate, Square, Star, Check, AlertTriangle, Upload, Info, ArrowUp, ArrowDown } from 'lucide-react';
import { createCaseStudy, updateCaseStudy, getProjectCategories } from '../../../config/caseStudyService';
import { uploadFile } from '../../../config/storage';
import { getCaseStudyThumbnailFolder, getCaseStudyImagesFolder } from '@/config/cloudinary';
import type { CaseStudy, CaseStudySection, ContentBlock } from '@/types/caseStudy';
import { ImageUpload } from './ImageUpload';
import { AIImportModal } from './AIImportModal';
import { PersonaEditor } from './PersonaEditor';
import { InfoEditor } from './InfoEditor';

interface CaseStudyBuilderProps {
  caseStudy?: CaseStudy;
  onComplete: () => void;
  onCancel: () => void;
}

export function CaseStudyBuilder({ caseStudy, onComplete, onCancel }: CaseStudyBuilderProps) {
  const isEditing = !!caseStudy;
  const [activeTab, setActiveTab] = useState<'card' | 'content'>('card');
  const [categories, setCategories] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<CaseStudy>({
    title: caseStudy?.title || 'Untitled Case Study',
    slug: caseStudy?.slug || '',
    description: caseStudy?.description || '',
    sections: caseStudy?.sections || [],
    status: caseStudy?.status || 'draft',
    tags: caseStudy?.tags || [],
    category: caseStudy?.category || '',
    featured: caseStudy?.featured || false,
    comingSoon: caseStudy?.comingSoon || false,
    thumbnail: caseStudy?.thumbnail || ''
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAIImport, setShowAIImport] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getProjectCategories();
      setCategories(cats);
      // Set default category if none selected
      if (!formData.category && cats.length > 0) {
        setFormData(prev => ({ ...prev, category: cats[0] }));
      }
    };
    loadCategories();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title && formData.title !== 'Untitled Case Study') {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEditing]);

  const addSection = () => {
    const newSection: CaseStudySection = {
      id: Date.now().toString(),
      title: `Section ${formData.sections.length + 1}`,
      heading: '',
      showInToc: true,
      blocks: [],
      collapsed: false,
      order: formData.sections.length
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSectionHeading = (sectionId: string, heading: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, heading } : section
      )
    }));
  };

  const updateSectionTocLabel = (sectionId: string, tocLabel: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, tocLabel } : section
      )
    }));
  };

  const updateSectionShowInToc = (sectionId: string, showInToc: boolean) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, showInToc } : section
      )
    }));
  };

  const toggleSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, collapsed: !section.collapsed } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const duplicateSection = (sectionId: string) => {
    const section = formData.sections.find(s => s.id === sectionId);
    if (section) {
      const newSection: CaseStudySection = {
        ...section,
        id: Date.now().toString(),
        title: `${section.title} (Copy)`,
        blocks: section.blocks.map(block => ({
          ...block,
          id: Date.now().toString() + Math.random()
        }))
      };
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, newSection]
      }));
    }
  };

  const moveSectionUp = (sectionId: string) => {
    const index = formData.sections.findIndex(s => s.id === sectionId);
    if (index > 0) {
      const newSections = [...formData.sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setFormData(prev => ({ ...prev, sections: newSections }));
    }
  };

  const moveSectionDown = (sectionId: string) => {
    const index = formData.sections.findIndex(s => s.id === sectionId);
    if (index < formData.sections.length - 1) {
      const newSections = [...formData.sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setFormData(prev => ({ ...prev, sections: newSections }));
    }
  };

  const addBlock = (sectionId: string, type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString() + Math.random(),
      type,
      content: '',
      personas: type === 'users' ? [] : undefined, // Initialize empty personas array for users blocks
      infoItems: type === 'info' ? [] : undefined, // Initialize empty info items for info blocks
      metadata: {}
    };
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, blocks: [...section.blocks, newBlock] }
          : section
      )
    }));
  };

  const updateBlock = (sectionId: string, blockId: string, content: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map(block =>
                block.id === blockId ? { ...block, content } : block
              )
            }
          : section
      )
    }));
  };

  const updateBlockPersonas = (sectionId: string, blockId: string, personas: import('@/types/caseStudy').Persona[]) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map(block =>
                block.id === blockId ? { ...block, personas } : block
              )
            }
          : section
      )
    }));
  };

  const updateBlockInfoItems = (sectionId: string, blockId: string, infoItems: import('@/types/caseStudy').InfoItem[]) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map(block =>
                block.id === blockId ? { ...block, infoItems } : block
              )
            }
          : section
      )
    }));
  };

  const deleteBlock = (sectionId: string, blockId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, blocks: section.blocks.filter(block => block.id !== blockId) }
          : section
      )
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setError(null);

      // Deep copy to modify
      let dataToSave = JSON.parse(JSON.stringify(formData)) as CaseStudy;

      // 1. Handle Thumbnail Upload
      if (dataToSave.thumbnail && dataToSave.thumbnail.startsWith('data:')) {
        try {
          const res = await fetch(dataToSave.thumbnail);
          const blob = await res.blob();
          const ext = blob.type.split('/')[1] || 'jpg';
          const fileName = `thumbnail.${ext}`;
          const file = new File([blob], fileName, { type: blob.type });
          // Upload to: {case-name}/thumbnail/
          const folder = getCaseStudyThumbnailFolder(dataToSave.title || 'Untitled');
          const url = await uploadFile(file, folder);
          dataToSave.thumbnail = url;
          // Update local state so we don't re-upload on next save
          setFormData(prev => ({ ...prev, thumbnail: url }));
        } catch (e) {
          console.error('Thumbnail upload failed:', e);
          throw new Error('Failed to upload thumbnail image');
        }
      }

      // 2. Handle Image Blocks Upload
      if (dataToSave.sections) {
        for (const section of dataToSave.sections) {
          if (section.blocks) {
            for (const block of section.blocks) {
              if (block.content && block.content.startsWith('data:')) {
                try {
                  const res = await fetch(block.content);
                  const blob = await res.blob();
                  const ext = blob.type.split('/')[1] || 'jpg';
                  const fileName = `block-content-${block.id}-${Date.now()}.${ext}`;
                  const file = new File([blob], fileName, { type: blob.type });
                  // Use case study TITLE for clean, organized folder names
                  const caseTitle = dataToSave.title || 'Untitled';
                  const url = await uploadFile(file, getCaseStudyImagesFolder(caseTitle));
                  block.content = url;
                } catch (e) {
                  console.error('Block content upload failed:', e);
                  const msg = e instanceof Error ? e.message : 'Unknown error';
                  throw new Error(`Failed to upload content in section "${section.title}": ${msg}`);
                }
              }
            }
          }
        }
      }

      // Update local state with the uploaded URLs (to replace base64s)
      setFormData(prev => ({
        ...prev,
        thumbnail: dataToSave.thumbnail,
        sections: dataToSave.sections
      }));

      const finalData = {
        ...dataToSave,
        status: publish ? 'published' as const : dataToSave.status
      };

      if (isEditing && caseStudy?.id) {
        await updateCaseStudy(caseStudy.id, finalData);
        alert(`✅ Case study ${publish ? 'published' : 'saved'} successfully!`);
      } else {
        const newId = await createCaseStudy(finalData);
        alert(`✅ Case study created successfully! ID: ${newId}`);
      }

      onComplete();
    } catch (err) {
      console.error('Error saving case study:', err);
      setError(err instanceof Error ? err.message : 'Failed to save case study.');
      alert('❌ Failed to save case study. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const blockTypeButtons = [
    { type: 'paragraph' as const, icon: AlignLeft, label: 'Paragraph' },
    { type: 'heading' as const, icon: Type, label: 'Heading' },
    { type: 'list' as const, icon: List, label: 'List' },
    { type: 'quote' as const, icon: Quote, label: 'Quote' },
    { type: 'info' as const, icon: Info, label: 'Info' },
    { type: 'users' as const, icon: Users, label: 'Users' },
    { type: 'userflow' as const, icon: Workflow, label: 'User Flow' },
    { type: 'image' as const, icon: ImageIcon, label: 'Image' }
  ];

  // Handle AI Import
  const handleAIImport = (importedData: Partial<CaseStudy>) => {
    setFormData(prev => ({
      ...prev,
      ...importedData
    }));
    console.log('✅ AI Import successful!');
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white pb-20">
      {/* AI Import Modal */}
      {showAIImport && (
        <AIImportModal
          onImport={handleAIImport}
          onClose={() => setShowAIImport(false)}
        />
      )}

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                disabled={saving}
                title="Cancel"
              >
                <X size={20} />
              </button>
              
              {/* Tab Switcher */}
              <div className="flex items-center bg-[#1c1c1c] rounded-lg p-1 border border-[#2a2a2a]">
                <button
                  onClick={() => setActiveTab('card')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'card' 
                      ? 'bg-[#FFEB01] text-[#0E0E0E] shadow-sm' 
                      : 'text-[#737373] hover:text-white'
                  }`}
                >
                  <Square size={14} />
                  Card
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'content' 
                      ? 'bg-[#FFEB01] text-[#0E0E0E] shadow-sm' 
                      : 'text-[#737373] hover:text-white'
                  }`}
                >
                  <LayoutTemplate size={14} />
                  Content
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Draft
              </button>
              
              {/* Add Section Button - Only show in Content tab */}
              {activeTab === 'content' && (
                <button
                  onClick={addSection}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium text-white"
                >
                  <Plus size={16} />
                  Add Section
                </button>
              )}
              
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isEditing ? 'Update & Publish' : 'Save & Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* TAB 1: CARD EDITOR */}
        {activeTab === 'card' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 transition-all ring-1 ring-white/5 shadow-xl">
              <div className="flex flex-col md:flex-row items-start gap-6">
                
                {/* Visual Thumbnail Input */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <ImageUpload
                     label="Cover Image"
                     value={formData.thumbnail}
                     onChange={val => setFormData(prev => ({...prev, thumbnail: val}))}
                     description="Used on portfolio home"
                  />
                </div>

                {/* Content Inputs */}
                <div className="flex-1 w-full min-w-0 space-y-5">
                  
                  {/* Title & Actions */}
                  <div className="flex items-start justify-between gap-4">
                     <input
                       type="text"
                       value={formData.title}
                       onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                       placeholder="Project Title"
                       className="flex-1 bg-transparent text-3xl font-bold text-white placeholder:text-[#737373]/50 border-none outline-none p-0 focus:ring-0 leading-tight"
                       autoComplete="off"
                     />
                  </div>

                  {/* Status & Featured Toggles */}
                  <div className="flex items-center gap-3">
                    <button
                       onClick={() => setFormData(prev => ({...prev, status: prev.status === 'published' ? 'draft' : 'published'}))}
                       className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5 flex-shrink-0 border transition-all ${
                         formData.status === 'published'
                           ? 'bg-[#FFEB01]/10 text-[#FFEB01] border-[#FFEB01]/20 hover:bg-[#FFEB01]/20'
                           : 'bg-[#2a2a2a] text-[#737373] border-transparent hover:bg-[#3a3a3a] hover:text-white'
                       }`}
                     >
                       {formData.status === 'published' ? <Eye size={12} /> : <EyeOff size={12} />}
                       {formData.status === 'published' ? 'Published' : 'Draft'}
                     </button>

                     <button
                       onClick={() => setFormData(prev => ({...prev, featured: !prev.featured}))}
                       className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5 flex-shrink-0 border transition-all ${
                         formData.featured
                           ? 'bg-[#FFEB01] text-[#0E0E0E] border-[#FFEB01] hover:bg-[#ffe500]'
                           : 'bg-[#2a2a2a] text-[#737373] border-transparent hover:bg-[#3a3a3a] hover:text-white'
                       }`}
                     >
                       <Star size={12} className={formData.featured ? "fill-current" : ""} />
                       {formData.featured ? 'Featured Project' : 'Standard Project'}
                     </button>

                     <button
                       onClick={() => setFormData(prev => ({...prev, comingSoon: !prev.comingSoon}))}
                       className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5 flex-shrink-0 border transition-all ${
                         formData.comingSoon
                           ? 'bg-[#FFEB01] text-[#0E0E0E] border-[#FFEB01] hover:bg-[#ffe500]'
                           : 'bg-[#2a2a2a] text-[#737373] border-transparent hover:bg-[#3a3a3a] hover:text-white'
                       }`}
                     >
                       <AlertTriangle size={12} className={formData.comingSoon ? "fill-current" : ""} />
                       {formData.comingSoon ? 'Coming Soon' : 'Active'}
                     </button>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="text-xs font-medium text-[#737373] mb-2 block uppercase tracking-wider">Project Folder</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                            formData.category === cat
                              ? 'bg-[#FFEB01] text-[#0E0E0E] border-[#FFEB01] font-semibold'
                              : 'bg-[#0E0E0E] text-[#737373] border-[#2a2a2a] hover:border-[#FFEB01]/50 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative pt-2">
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                      placeholder="Write a brief description that hooks the reader..."
                      rows={3}
                      className="w-full bg-transparent text-[#737373] placeholder:text-[#737373]/30 text-sm border-none outline-none resize-none p-0 focus:text-white transition-colors leading-relaxed"
                      autoComplete="off"
                    />
                  </div>

                  {/* Meta Fields */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#737373] pt-4 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-2 font-mono text-xs opacity-60 hover:opacity-100 transition-opacity">
                       <span>/</span>
                       <input
                         type="text"
                         value={formData.slug}
                         onChange={e => setFormData(prev => ({...prev, slug: e.target.value}))}
                         className="bg-transparent border-none outline-none w-48 text-white placeholder:text-[#737373]"
                         placeholder="slug-url"
                         autoComplete="off"
                       />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* NAVIGATION MENU PREVIEW & EDITOR */}
            <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 ring-1 ring-white/5 shadow-xl">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <List size={16} className="text-[#FFEB01]" />
                  Table of Contents Manager
                </h3>
                <p className="text-xs text-[#737373] mt-1">
                  Customize what appears in the navigation menu. Leave blank to auto-use section headings.
                </p>
              </div>
              
              <div className="bg-[#0E0E0E] rounded-xl border border-[#2a2a2a] overflow-hidden">
                {formData.sections.length === 0 ? (
                  <div className="p-8 text-center text-[#737373] text-sm">
                    <p>No sections available yet.</p>
                    <p className="text-xs mt-1 opacity-60">Add sections in the Content tab to manage navigation.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#2a2a2a]">
                    {formData.sections.map((section, index) => {
                      // Auto-use heading if no custom TOC label
                      const displayLabel = section.tocLabel || section.heading || `Section ${index + 1}`;
                      const isCustomLabel = !!section.tocLabel && section.tocLabel !== section.heading;
                      
                      return (
                        <div key={section.id} className={`flex items-start gap-4 p-4 transition-colors ${
                          section.showInToc !== false ? 'bg-transparent hover:bg-white/5' : 'bg-[#0E0E0E] opacity-60'
                        }`}>
                          <div className="pt-2.5">
                             <span className="text-xs font-mono text-[#737373]">{(index + 1).toString().padStart(2, '0')}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0 space-y-2">
                            {/* Label Editor */}
                            <div className="flex items-center gap-3">
                               <input
                                 type="text"
                                 value={section.tocLabel || ''}
                                 onChange={(e) => updateSectionTocLabel(section.id, e.target.value)}
                                 placeholder={section.heading || `Section ${index + 1}`}
                                 className={`flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-[#737373]/50 focus:text-[#FFEB01] transition-colors p-0 ${
                                   section.showInToc !== false ? 'text-white' : 'text-[#737373]'
                                 }`}
                                 disabled={section.showInToc === false || saving}
                                 autoComplete="off"
                               />
                            </div>
                            
                            {/* Status indicator */}
                            <div className="flex items-center gap-2 text-[10px]">
                              {section.showInToc !== false ? (
                                <>
                                  {isCustomLabel ? (
                                    <span className="text-[#FFEB01] flex items-center gap-1">
                                      <Check size={10} />
                                      Custom label (overrides "{section.heading}")
                                    </span>
                                  ) : (
                                    <span className="text-[#737373] flex items-center gap-1">
                                      <Check size={10} />
                                      Auto-using heading: "{displayLabel}"
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="text-[#737373] opacity-60">Hidden from navigation</span>
                              )}
                            </div>
                          </div>

                          {/* Visibility Toggle */}
                          <div className="pt-1">
                            <button
                              onClick={() => updateSectionShowInToc(section.id, section.showInToc === false)}
                              className={`p-2 rounded-lg transition-all ${
                                section.showInToc !== false 
                                  ? 'bg-[#FFEB01]/10 text-[#FFEB01] hover:bg-[#FFEB01]/20' 
                                  : 'bg-[#2a2a2a] text-[#737373] hover:text-white'
                              }`}
                              title={section.showInToc !== false ? "Hide from Navigation" : "Show in Navigation"}
                            >
                              {section.showInToc !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mt-3 p-3 bg-[#FFEB01]/5 border border-[#FFEB01]/10 rounded-lg">
                <p className="text-[10px] text-[#FFEB01]/80 leading-relaxed">
                  💡 <strong>Tip:</strong> Leave the TOC label empty to automatically use the section heading. 
                  Enter a custom label only if you want different text in the navigation menu.
                </p>
              </div>
            </div>

            <div className="text-center text-[#737373] text-sm pt-4">
              <p>Switch to the <strong>Content</strong> tab to add case study details.</p>
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT BUILDER */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Content Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a2a] sticky top-0 z-10 bg-[#0E0E0E] pt-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Content Builder</h2>
                <p className="text-white/60 text-sm">Build your story block by block</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAIImport(true)}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFEB01] to-[#FFD700] hover:from-[#ffe500] hover:to-[#FFC700] text-[#0E0E0E] font-semibold rounded-lg transition-all disabled:opacity-50 text-sm shadow-lg shadow-[#FFEB01]/20"
                >
                  <Upload size={16} />
                  Import from AI
                </button>
              </div>
            </div>

            {/* Sections List */}
            <div className="space-y-6">
              {formData.sections.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-[#2a2a2a] rounded-xl hover:border-[#FFEB01]/30 transition-colors">
                  <div className="size-16 bg-[#1c1c1c] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="text-[#737373]" size={24} />
                  </div>
                  <p className="text-[#737373] mb-4">Start telling your story</p>
                  <button
                    onClick={addSection}
                    disabled={saving}
                    className="px-6 py-2 bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    Create First Section
                  </button>
                </div>
              ) : (
                formData.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl overflow-hidden"
                  >
                    {/* Section Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-[#2a2a2a] bg-[#1c1c1c]">
                      <button className="cursor-grab text-[#737373] hover:text-white" disabled={saving}>
                        <GripVertical size={18} />
                      </button>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="px-2 py-1 bg-[#FFEB01]/10 text-[#FFEB01] text-xs font-semibold rounded">
                          Section {index + 1}
                        </div>
                        <span className="text-white/60 text-sm">
                          {section.heading || 'Untitled Section'}
                        </span>
                        <span className="text-[#737373] text-xs">
                          • {section.blocks.length} blocks
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSectionUp(section.id)}
                          disabled={saving}
                          className="p-2 hover:bg-[#2a2a2a] text-[#737373] hover:text-white rounded transition-colors disabled:opacity-50"
                        >
                          <ChevronUp size={16} className={`transition-transform ${section.collapsed ? 'rotate-180' : ''}`} />
                        </button>
                        <button
                          onClick={() => moveSectionDown(section.id)}
                          disabled={saving}
                          className="p-2 hover:bg-[#2a2a2a] text-[#737373] hover:text-white rounded transition-colors disabled:opacity-50"
                        >
                          <ChevronDown size={16} className={`transition-transform ${section.collapsed ? 'rotate-180' : ''}`} />
                        </button>
                        <button
                          onClick={() => toggleSection(section.id)}
                          disabled={saving}
                          className="p-2 hover:bg-[#2a2a2a] text-[#737373] hover:text-white rounded transition-colors disabled:opacity-50"
                        >
                          <ChevronUp size={16} className={`transition-transform ${section.collapsed ? 'rotate-180' : ''}`} />
                        </button>
                        <button
                          onClick={() => duplicateSection(section.id)}
                          disabled={saving}
                          className="p-2 hover:bg-[#2a2a2a] text-[#737373] hover:text-white rounded transition-colors disabled:opacity-50"
                          title="Duplicate Section"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          disabled={saving}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded transition-colors disabled:opacity-50"
                          title="Delete Section"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Section Content */}
                    {!section.collapsed && (
                      <div className="p-6 space-y-6 bg-[#0E0E0E]/30">
                        {/* Section Heading & TOC Label */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-[#737373] mb-2 uppercase tracking-wider">Section Heading</label>
                            <input
                              type="text"
                              value={section.heading}
                              onChange={(e) => updateSectionHeading(section.id, e.target.value)}
                              placeholder="e.g., The Challenge"
                              className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50 transition-colors"
                              disabled={saving}
                              autoComplete="off"
                            />
                            <p className="text-[10px] text-[#737373] mt-1.5">Displayed as the main title of this section</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium text-[#737373] uppercase tracking-wider">Navigation Menu</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-[#737373]">{section.showInToc !== false ? 'Visible' : 'Hidden'}</span>
                                    <button
                                        onClick={() => updateSectionShowInToc(section.id, section.showInToc === false)}
                                        className={`w-8 h-4 rounded-full transition-colors relative ${
                                            section.showInToc !== false ? 'bg-[#FFEB01]' : 'bg-[#2a2a2a]'
                                        }`}
                                    >
                                        <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-black transition-transform ${
                                            section.showInToc !== false ? 'translate-x-4' : 'translate-x-0'
                                        }`} />
                                    </button>
                                </div>
                            </div>
                            
                            {section.showInToc !== false ? (
                                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                                    <input
                                      type="text"
                                      value={section.tocLabel || ''}
                                      onChange={(e) => updateSectionTocLabel(section.id, e.target.value)}
                                      placeholder={section.heading || "Short navigation label..."}
                                      className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50 transition-colors"
                                      disabled={saving}
                                      autoComplete="off"
                                    />
                                    <p className="text-[10px] text-[#737373] mt-1.5">Overrides the heading in navigation. Optional.</p>
                                </div>
                            ) : (
                                <div className="px-4 py-2.5 bg-[#0E0E0E]/50 border border-[#2a2a2a] border-dashed rounded-lg text-[#737373] text-sm italic">
                                    Hidden from Table of Contents
                                </div>
                            )}
                          </div>
                        </div>

                        {/* Content Blocks */}
                        <div>
                          <label className="block text-xs font-medium text-[#737373] mb-3 uppercase tracking-wider">Content Blocks</label>
                          {section.blocks.length === 0 ? (
                            <div className="text-center py-8 border border-dashed border-[#2a2a2a] rounded-lg bg-[#0E0E0E]/50">
                              <p className="text-[#737373] text-sm">
                                Add text, images, or lists to this section
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3 mb-4">
                              {section.blocks.map(block => (
                                <div
                                  key={block.id}
                                  className="bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg p-4 group hover:border-[#FFEB01]/20 transition-colors"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="mt-2 text-[#737373]">
                                      {block.type === 'paragraph' && <AlignLeft size={16} />}
                                      {block.type === 'heading' && <Type size={16} />}
                                      {block.type === 'list' && <List size={16} />}
                                      {block.type === 'quote' && <Quote size={16} />}
                                      {block.type === 'info' && <Info size={16} />}
                                      {block.type === 'users' && <Users size={16} />}
                                      {block.type === 'userflow' && <Workflow size={16} />}
                                      {block.type === 'image' && <ImageIcon size={16} />}
                                    </div>
                                    {block.type === 'image' || block.type === 'userflow' ? (
                                      <div className="flex-1 min-w-0">
                                        <ImageUpload
                                          value={block.content}
                                          onChange={(val) => updateBlock(section.id, block.id, val)}
                                          placeholder={block.type === 'userflow' ? "Upload user flow diagram..." : "Upload or paste image URL..."}
                                          folder={getCaseStudyImagesFolder(formData.title || 'Untitled')}
                                        />
                                      </div>
                                    ) : block.type === 'users' ? (
                                      <div className="flex-1 min-w-0">
                                        <PersonaEditor
                                          personas={block.personas || []}
                                          onChange={(personas) => updateBlockPersonas(section.id, block.id, personas)}
                                          disabled={saving}
                                          caseStudyTitle={formData.title || 'Untitled'}
                                        />
                                      </div>
                                    ) : block.type === 'info' ? (
                                      <div className="flex-1 min-w-0">
                                        <InfoEditor
                                          infoItems={block.infoItems || []}
                                          onChange={(infoItems) => updateBlockInfoItems(section.id, block.id, infoItems)}
                                          disabled={saving}
                                        />
                                      </div>
                                    ) : (
                                      <textarea
                                        value={block.content}
                                        onChange={(e) => updateBlock(section.id, block.id, e.target.value)}
                                        placeholder={`Enter ${block.type} content...`}
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#737373]/50 resize-none min-h-[80px]"
                                        disabled={saving}
                                        autoComplete="off"
                                      />
                                    )}
                                    <button
                                      onClick={() => deleteBlock(section.id, block.id)}
                                      disabled={saving}
                                      className="p-1.5 hover:bg-red-500/10 text-[#737373] hover:text-red-500 rounded transition-colors disabled:opacity-50 opacity-0 group-hover:opacity-100"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add Content Blocks */}
                        <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2a2a2a]">
                          <p className="text-xs text-[#737373] mb-2 uppercase tracking-wider">Insert Block</p>
                          <div className="flex flex-wrap gap-2">
                            {blockTypeButtons.map(({ type, icon: Icon, label }) => (
                              <button
                                key={type}
                                onClick={() => addBlock(section.id, type)}
                                disabled={saving}
                                className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#737373] hover:text-white rounded-md text-xs transition-colors disabled:opacity-50"
                              >
                                <Icon size={14} />
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}