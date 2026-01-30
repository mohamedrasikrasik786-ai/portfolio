import { CaseStudyBuilder } from './CaseStudyBuilder';
import { FirebaseDiagnostics } from './FirebaseDiagnostics';
import { FirebaseConnectionTest } from './FirebaseConnectionTest';
import { LandingPageDebug } from './LandingPageDebug';
import { AboutMeEditor } from './AboutMeEditor';
import { LandingPageEditor } from './LandingPageEditor';
import { FooterEditor } from './FooterEditor';
import { ResumeEditor } from './ResumeEditor';
import type { CaseStudyListItem, CaseStudy } from '../../../types/caseStudy';
import { 
  getAllCaseStudies, 
  deleteCaseStudy, 
  toggleCaseStudyStatus, 
  duplicateCaseStudy,
  getCaseStudyById,
  getProjectCategories,
  renameCategory,
  deleteCategory,
  updateProjectCategories,
  toggleCaseStudyComingSoon
} from '../../../config/caseStudyService';
import { isFirebaseAvailable } from '../../../config/firebaseHelpers';
import { useState, useEffect } from 'react';
import { Settings, FileText, Upload, Plus, X, Home, User, LayoutTemplate, AlertTriangle, Check, Pencil, Trash2, Copy, Edit, Eye, EyeOff, Star, AlertCircle, Loader2 } from 'lucide-react';

export function AdminPanel({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'about' | 'landing' | 'footer' | 'resume'>('list');
  const [activeTab, setActiveTab] = useState<'cases' | 'pages'>('cases');
  
  // Category State
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [tempCategoryName, setTempCategoryName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);

  // Category Management State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [projectsToMoveCount, setProjectsToMoveCount] = useState(0);
  const [targetCategory, setTargetCategory] = useState<string>('');

  const [caseStudies, setCaseStudies] = useState<CaseStudyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firebaseAvailable, setFirebaseAvailable] = useState(true);

  // Set body background to match dark theme
  useEffect(() => {
    document.body.style.backgroundColor = '#0E0E0E';
  }, []);

  useEffect(() => {
    // Check Firebase availability
    const checkFirebase = async () => {
      const available = isFirebaseAvailable();
      setFirebaseAvailable(available);
      if (!available) {
        setError('⚠️ Firebase is not initialized. Please check your Firebase configuration in /src/config/firebase.ts');
      }
    };
    checkFirebase();
  }, []);

  useEffect(() => {
    if (view === 'list' && firebaseAvailable) {
      loadData();
    }
  }, [view, firebaseAvailable]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [studies, cats] = await Promise.all([
        getAllCaseStudies(),
        getProjectCategories()
      ]);
      setCaseStudies(studies);
      setCategories(cats);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleRenameCategory = async () => {
    if (editingCategoryIndex === null || !tempCategoryName.trim()) return;
    
    const oldName = categories[editingCategoryIndex];
    const newName = tempCategoryName.trim();
    
    if (oldName === newName) {
      setEditingCategoryIndex(null);
      return;
    }

    try {
      setIsRenaming(true);
      await renameCategory(oldName, newName);
      
      // Update local state
      const newCategories = [...categories];
      newCategories[editingCategoryIndex] = newName;
      setCategories(newCategories);
      
      // Update local case studies
      setCaseStudies(prev => prev.map(cs => 
        cs.category === oldName ? { ...cs, category: newName } : cs
      ));
      
      setEditingCategoryIndex(null);
    } catch (err) {
      console.error('Error renaming category:', err);
      alert('Failed to rename folder. Check console.');
    } finally {
      setIsRenaming(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const newCats = [...categories, newCategoryName.trim()];
      await updateProjectCategories(newCats);
      setCategories(newCats);
      setNewCategoryName('');
      setIsAddingCategory(false);
      // Switch to new category
      setActiveCategoryIndex(newCats.length - 1);
    } catch (err) {
      console.error('Error adding category:', err);
      alert('Failed to add folder.');
    }
  };

  const handleDeleteCategoryClick = (categoryName: string) => {
    // Check if projects exist in this category
    const count = caseStudies.filter(cs => cs.category === categoryName).length;
    
    if (count > 0) {
      // Open modal for reassignment
      setProjectsToMoveCount(count);
      setCategoryToDelete(categoryName);
      // Set default target to first available category that isn't the one being deleted
      const firstAvailable = categories.find(c => c !== categoryName) || '';
      setTargetCategory(firstAvailable);
    } else {
      // Directly confirm delete
      if (confirm(`Are you sure you want to delete the folder "${categoryName}"?`)) {
        performDeleteCategory(categoryName);
      }
    }
  };

  const performDeleteCategory = async (categoryName: string, targetCat?: string) => {
    try {
      await deleteCategory(categoryName, targetCat);
      await loadData(); // Reload to sync everything
      setCategoryToDelete(null);
      setActiveCategoryIndex(0); // Reset to first tab
      alert('✅ Folder deleted successfully');
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete folder.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteCaseStudy(id);
      setCaseStudies(prev => prev.filter(cs => cs.id !== id));
      alert('✅ Case study deleted successfully!');
    } catch (err) {
      console.error('Error deleting case study:', err);
      alert('❌ Failed to delete case study. Check console for details.');
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleCaseStudyStatus(id);
      await loadData(); // Reload to get updated timestamps/ordering
    } catch (err) {
      console.error('Error toggling status:', err);
      alert('❌ Failed to update status. Check console for details.');
    }
  };

  const handleToggleComingSoon = async (id: string) => {
    try {
      await toggleCaseStudyComingSoon(id);
      await loadData();
    } catch (err) {
      console.error('Error toggling coming soon:', err);
      alert('❌ Failed to update coming soon status. Check console for details.');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicateCaseStudy(id);
      await loadData();
      alert(`✅ Case study duplicated successfully!`);
    } catch (err) {
      console.error('Error duplicating case study:', err);
      alert('❌ Failed to duplicate case study. Check console for details.');
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const caseStudy = await getCaseStudyById(id);
      if (caseStudy) {
        setEditingCaseStudy(caseStudy);
        setView('edit');
      }
    } catch (err) {
      console.error('Error loading case study for edit:', err);
      alert('❌ Failed to load case study. Check console for details.');
    }
  };

  const handleCreateComplete = () => {
    setView('list');
    loadData();
  };

  const handleEditComplete = () => {
    setView('list');
    setEditingCaseStudy(null);
    loadData();
  };

  if (view === 'create') {
    return (
      <CaseStudyBuilder
        onComplete={handleCreateComplete}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'edit' && editingCaseStudy) {
    return (
      <CaseStudyBuilder
        caseStudy={editingCaseStudy}
        onComplete={handleEditComplete}
        onCancel={() => {
          setView('list');
          setEditingCaseStudy(null);
        }}
      />
    );
  }

  if (view === 'about') {
    return (
      <AboutMeEditor
        onComplete={() => setView('list')}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'landing') {
    return (
      <LandingPageEditor
        onComplete={() => setView('list')}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'footer') {
    return (
      <FooterEditor
        onComplete={() => setView('list')}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'resume') {
    return (
      <ResumeEditor
        onComplete={() => setView('list')}
        onCancel={() => setView('list')}
      />
    );
  }

  // Filter case studies by active category
  const activeCategory = categories[activeCategoryIndex];
  const filteredCaseStudies = caseStudies.filter(cs => 
    // If no category is set on the case study, show it in the first tab or handle as needed. 
    // For now, only show matching.
    cs.category === activeCategory || (!cs.category && activeCategoryIndex === 0)
  );

  return (
    <div className="fixed inset-0 bg-[#0E0E0E] z-[9999] overflow-auto">
      {/* Modern Header */}
      <div className="sticky top-0 z-50 bg-[#0E0E0E]/98 backdrop-blur-md border-b border-[#2a2a2a]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFEB01] rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-[#0E0E0E]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
                <p className="text-sm text-[#737373]">Manage your content</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FirebaseDiagnostics />
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#1c1c1c] rounded-lg transition-all text-white border border-[#2a2a2a]"
                title="Close Admin Panel"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cases')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'cases'
                  ? 'bg-[#1c1c1c] text-white border border-[#2a2a2a]'
                  : 'text-[#737373] hover:text-white hover:bg-[#1c1c1c]/50'
              }`}
            >
              <FileText size={18} />
              Case Studies
            </button>
            
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'pages'
                  ? 'bg-[#1c1c1c] text-white border border-[#2a2a2a]'
                  : 'text-[#737373] hover:text-white hover:bg-[#1c1c1c]/50'
              }`}
            >
              <Settings size={18} />
              Pages
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Case Studies Tab */}
        {activeTab === 'cases' && (
          <>
            {/* Category Tabs */}
            <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className={`relative group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all min-w-[160px] cursor-pointer ${
                    activeCategoryIndex === index
                      ? 'bg-[#FFEB01]/10 border-[#FFEB01] text-white'
                      : 'bg-[#1c1c1c] border-[#2a2a2a] text-[#737373] hover:border-[#737373]'
                  }`}
                  onClick={() => {
                    if (editingCategoryIndex !== index) {
                      setActiveCategoryIndex(index);
                    }
                  }}
                >
                  {editingCategoryIndex === index ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={tempCategoryName}
                        onChange={(e) => setTempCategoryName(e.target.value)}
                        className="bg-transparent border-none outline-none text-white w-full text-sm font-medium"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameCategory();
                          if (e.key === 'Escape') setEditingCategoryIndex(null);
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameCategory();
                        }}
                        disabled={isRenaming}
                        className="p-1 hover:bg-[#FFEB01]/20 rounded text-[#FFEB01]"
                      >
                        {isRenaming ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className={`text-sm font-medium flex-1 ${activeCategoryIndex === index ? 'text-[#FFEB01]' : ''}`}>
                        {category}
                      </span>
                      {activeCategoryIndex === index && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCategoryIndex(index);
                              setTempCategoryName(category);
                            }}
                            className="p-1.5 hover:bg-white/10 rounded-md transition-all text-[#737373] hover:text-white"
                            title="Rename Folder"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCategoryClick(category);
                            }}
                            className="p-1.5 hover:bg-red-500/10 rounded-md transition-all text-[#737373] hover:text-red-500"
                            title="Delete Folder"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Active Indicator */}
                  {activeCategoryIndex === index && (
                    <div className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-[#FFEB01]" />
                  )}
                </div>
              ))}
              
              {/* Add New Category Button */}
              {isAddingCategory ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2a2a] bg-[#1c1c1c] min-w-[160px]">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Folder Name"
                    className="bg-transparent border-none outline-none text-white w-full text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddCategory();
                      if (e.key === 'Escape') setIsAddingCategory(false);
                    }}
                  />
                  <button onClick={handleAddCategory} className="text-[#FFEB01]">
                    <Check size={14} />
                  </button>
                  <button onClick={() => setIsAddingCategory(false)} className="text-[#737373]">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingCategory(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-[#2a2a2a] text-[#737373] hover:text-white hover:border-[#737373] transition-all min-w-[40px]"
                  title="Add Folder"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                 <h2 className="text-xl font-semibold text-white">{categories[activeCategoryIndex]}</h2>
                 <span className="px-2 py-0.5 rounded text-xs bg-[#2a2a2a] text-[#737373] border border-[#3a3a3a]">
                    {filteredCaseStudies.length} projects
                 </span>
                 
                 {/* Delete Folder Button */}
                 <button 
                   onClick={() => handleDeleteCategoryClick(categories[activeCategoryIndex])}
                   className="p-1.5 hover:bg-red-500/10 text-[#737373] hover:text-red-500 rounded-md transition-colors ml-2"
                   title="Delete this folder"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={async () => {
                    if (confirm('Import Wedoura case study?')) {
                      try {
                        const { migrateWedouraToFirebase } = await import('@/utils/migrateWedoura');
                        await migrateWedouraToFirebase();
                        alert('✅ Wedoura imported successfully!');
                        window.location.reload();
                      } catch (err: any) {
                        alert(`❌ Import failed: ${err.message}`);
                      }
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1c1c1c] border border-[#2a2a2a] text-white rounded-lg hover:bg-[#2a2a2a] transition-all font-medium"
                >
                  <Upload size={16} />
                  Import Wedoura
                </button>
                
                <button
                  onClick={() => setView('create')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-all font-semibold shadow-lg shadow-[#FFEB01]/20"
                >
                  <Plus size={18} />
                  New Case Study
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-12 h-12 text-[#FFEB01] animate-spin mb-4" />
                <p className="text-[#737373] font-medium">Loading projects...</p>
              </div>
            ) : filteredCaseStudies.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-32 border border-dashed border-[#2a2a2a] rounded-2xl">
                <div className="w-20 h-20 bg-[#1c1c1c] rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="text-[#737373]" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No projects in {categories[activeCategoryIndex]}</h3>
                <p className="text-[#737373] mb-8">Create a new project or rename this folder</p>
                <button
                  onClick={() => setView('create')}
                  className="flex items-center gap-2 px-8 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-all font-semibold"
                >
                  <Plus size={18} />
                  Create Project
                </button>
              </div>
            ) : (
              /* Projects Grid */
              <div className="grid grid-cols-1 gap-4">
                {filteredCaseStudies.map(caseStudy => (
                  <div
                    key={caseStudy.id}
                    className={`group bg-[#1c1c1c] border rounded-2xl p-6 transition-all ${
                      caseStudy.featured 
                        ? 'border-[#FFEB01] shadow-[0_0_20px_-10px_#FFEB01]' 
                        : 'border-[#2a2a2a] hover:border-[#FFEB01]/30'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      {/* Thumbnail */}
                      <div className="w-32 h-32 bg-[#0E0E0E] rounded-xl overflow-hidden flex-shrink-0 border border-[#2a2a2a] relative">
                        {caseStudy.thumbnail ? (
                          <img 
                            src={caseStudy.thumbnail} 
                            alt={caseStudy.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="text-[#737373]" size={24} />
                          </div>
                        )}
                        {caseStudy.featured && (
                          <div className="absolute top-2 left-2 w-6 h-6 bg-[#FFEB01] rounded-full flex items-center justify-center z-10 shadow-lg">
                            <Star size={12} className="text-[#0E0E0E] fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-white truncate flex items-center gap-2">
                                {caseStudy.title}
                                {caseStudy.featured && (
                                  <span className="px-2 py-0.5 bg-[#FFEB01] text-[#0E0E0E] text-[10px] font-bold uppercase rounded-sm tracking-wider">
                                    Featured
                                  </span>
                                )}
                                {caseStudy.comingSoon && (
                                  <span className="px-2 py-0.5 bg-[#2a2a2a] text-[#FFEB01] border border-[#FFEB01]/50 text-[10px] font-bold uppercase rounded-sm tracking-wider">
                                    Coming Soon
                                  </span>
                                )}
                              </h3>
                              <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                                  caseStudy.status === 'published'
                                    ? 'bg-[#FFEB01]/10 text-[#FFEB01] border border-[#FFEB01]/20'
                                    : 'bg-[#2a2a2a] text-[#737373]'
                                }`}
                              >
                                {caseStudy.status}
                              </span>
                            </div>
                            
                            {caseStudy.description && (
                              <p className="text-sm text-[#737373] mb-3 line-clamp-2">{caseStudy.description}</p>
                            )}

                            <div className="flex items-center gap-4 text-sm text-[#737373]">
                              <span className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-[#737373]" />
                                {caseStudy.sectionCount} sections
                              </span>
                              <span className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-[#737373]" />
                                {caseStudy.blockCount} blocks
                              </span>
                              <span className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-[#737373]" />
                                👁️ {caseStudy.views || 0} views
                              </span>
                              {caseStudy.slug && (
                                <span className="flex items-center gap-1.5 font-mono text-xs">
                                  <div className="w-1 h-1 rounded-full bg-[#737373]" />
                                  /{caseStudy.slug}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleToggleStatus(caseStudy.id)}
                              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                                caseStudy.status === 'published'
                                  ? 'bg-[#FFEB01]/10 hover:bg-[#FFEB01]/20 text-[#FFEB01]'
                                  : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#737373]'
                              }`}
                              title={caseStudy.status === 'draft' ? 'Publish' : 'Unpublish'}
                            >
                              {caseStudy.status === 'published' ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>

                            <button
                              onClick={() => handleToggleComingSoon(caseStudy.id)}
                              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                                caseStudy.comingSoon
                                  ? 'bg-[#FFEB01]/10 hover:bg-[#FFEB01]/20 text-[#FFEB01]'
                                  : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#737373]'
                              }`}
                              title={caseStudy.comingSoon ? 'Disable Coming Soon' : 'Enable Coming Soon'}
                            >
                              <AlertTriangle size={16} className={caseStudy.comingSoon ? "fill-current" : ""} />
                            </button>
                            
                            <button
                              onClick={() => handleEdit(caseStudy.id)}
                              className="w-9 h-9 flex items-center justify-center bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-all text-white"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            
                            <button
                              onClick={() => handleDuplicate(caseStudy.id)}
                              className="w-9 h-9 flex items-center justify-center bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-all text-white"
                              title="Duplicate"
                            >
                              <Copy size={16} />
                            </button>
                            
                            <button
                              onClick={() => handleDelete(caseStudy.id)}
                              className="w-9 h-9 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all text-red-400"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-[#737373] pt-3 border-t border-[#2a2a2a]">
                          <span>Created: {caseStudy.createdAt && new Date((caseStudy.createdAt as any).toDate ? (caseStudy.createdAt as any).toDate() : caseStudy.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>Updated: {caseStudy.updatedAt && new Date((caseStudy.updatedAt as any).toDate ? (caseStudy.updatedAt as any).toDate() : caseStudy.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Manage Pages</h2>
            
            {/* Debug Panel */}
            <div className="mb-6">
              <LandingPageDebug />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Landing Page Card */}
              <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#FFEB01]/30 transition-all group">
                <div className="w-14 h-14 bg-[#FFEB01]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFEB01]/20 transition-all">
                  <Home size={24} className="text-[#FFEB01]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Landing Page</h3>
                <p className="text-[#737373] text-sm mb-6 leading-relaxed">
                  Edit hero section, title lines, description text, and background images
                </p>
                <button
                  onClick={() => setView('landing')}
                  className="w-full px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-all font-semibold"
                >
                  Edit Landing Page
                </button>
              </div>

              {/* About Me Card */}
              <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#FFEB01]/30 transition-all group">
                <div className="w-14 h-14 bg-[#FFEB01]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFEB01]/20 transition-all">
                  <User size={24} className="text-[#FFEB01]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">About Me</h3>
                <p className="text-[#737373] text-sm mb-6 leading-relaxed">
                  Manage profile, position, experience, education, location, tools, and resume
                </p>
                <button
                  onClick={() => setView('about')}
                  className="w-full px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-all font-semibold"
                >
                  Edit About Me
                </button>
              </div>

              {/* Footer Card */}
              <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#FFEB01]/30 transition-all group">
                <div className="w-14 h-14 bg-[#FFEB01]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFEB01]/20 transition-all">
                  <LayoutTemplate size={24} className="text-[#FFEB01]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Footer</h3>
                <p className="text-[#737373] text-sm mb-6 leading-relaxed">
                  Manage footer links, contact info, social media links, and availability status
                </p>
                <button
                  onClick={() => setView('footer')}
                  className="w-full px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-all font-semibold"
                >
                  Edit Footer
                </button>
              </div>

              {/* Resume Card */}
              <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#FFEB01]/30 transition-all group">
                <div className="w-14 h-14 bg-[#FFEB01]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFEB01]/20 transition-all">
                  <FileText size={24} className="text-[#FFEB01]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Resume</h3>
                <p className="text-[#737373] text-sm mb-6 leading-relaxed">
                  One URL controls all 4 resume buttons (Navbar, Landing, About Me, Footer)
                </p>
                <button
                  onClick={() => setView('resume')}
                  className="w-full px-6 py-3 bg-[#FFEB01] text-[#0E0E0E] rounded-lg hover:bg-[#ffe500] transition-all font-semibold"
                >
                  Manage Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Category Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-white">
              <AlertTriangle className="text-[#FFEB01] w-8 h-8" />
              <h3 className="text-xl font-bold">Delete Folder</h3>
            </div>
            
            <p className="text-[#737373] mb-6">
              You are about to delete the folder <span className="text-white font-medium">"{categoryToDelete}"</span>.
              {projectsToMoveCount > 0 && (
                <span className="block mt-2 text-white">
                  It currently contains <span className="font-bold text-[#FFEB01]">{projectsToMoveCount}</span> projects.
                  Please select where you want to move them:
                </span>
              )}
            </p>

            {projectsToMoveCount > 0 && (
              <div className="mb-8">
                <label className="block text-xs font-medium text-[#737373] uppercase tracking-wider mb-2">
                  Move projects to
                </label>
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value)}
                  className="w-full bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#FFEB01] outline-none transition-colors"
                >
                  <option value="" disabled>Select a folder</option>
                  {categories.filter(c => c !== categoryToDelete).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="flex-1 px-4 py-3 bg-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#3a3a3a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => performDeleteCategory(categoryToDelete, targetCategory)}
                disabled={projectsToMoveCount > 0 && !targetCategory}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Folder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}