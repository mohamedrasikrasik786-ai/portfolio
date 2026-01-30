import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { Persona } from '@/types/caseStudy';
import { ImageUpload } from './ImageUpload';
import { getCaseStudyImagesFolder } from '@/config/cloudinary';

interface PersonaEditorProps {
  personas: Persona[];
  onChange: (personas: Persona[]) => void;
  disabled?: boolean;
  caseStudyTitle: string; // Case study title for Cloudinary folder
}

export function PersonaEditor({ personas, onChange, disabled, caseStudyTitle }: PersonaEditorProps) {
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const addPersona = () => {
    const newPersona: Persona = {
      id: Date.now().toString(),
      image: '',
      name: '',
      description: ''
    };
    setEditingPersona(newPersona);
    setShowEditor(true);
  };

  const savePersona = () => {
    if (!editingPersona) return;
    
    const existingIndex = personas.findIndex(p => p.id === editingPersona.id);
    
    if (existingIndex >= 0) {
      // Update existing
      const updated = [...personas];
      updated[existingIndex] = editingPersona;
      onChange(updated);
    } else {
      // Add new
      onChange([...personas, editingPersona]);
    }
    
    setEditingPersona(null);
    setShowEditor(false);
  };

  const deletePersona = (id: string) => {
    onChange(personas.filter(p => p.id !== id));
  };

  const editPersona = (persona: Persona) => {
    setEditingPersona({ ...persona });
    setShowEditor(true);
  };

  const cancelEdit = () => {
    setEditingPersona(null);
    setShowEditor(false);
  };

  return (
    <div className="space-y-3">
      {/* Existing Personas Grid Preview */}
      {personas.length > 0 && (
        <div className={`grid gap-3 ${
          personas.length === 1 ? 'grid-cols-1' :
          personas.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
          personas.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2'
        }`}>
          {personas.map(persona => (
            <div
              key={persona.id}
              className="bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg p-3 group relative hover:border-[#FFEB01]/30 transition-colors"
            >
              {/* Delete Button */}
              <button
                onClick={() => deletePersona(persona.id)}
                disabled={disabled}
                className="absolute top-2 right-2 p-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30"
              >
                <Trash2 size={14} />
              </button>

              {/* Persona Card */}
              <div 
                onClick={() => editPersona(persona)}
                className="cursor-pointer"
              >
                {/* Image */}
                {persona.image ? (
                  <img
                    src={persona.image}
                    alt={persona.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="w-full h-24 bg-[#1c1c1c] rounded mb-2 flex items-center justify-center">
                    <Upload size={20} className="text-[#737373]" />
                  </div>
                )}

                {/* Name */}
                <p className="text-white text-sm font-semibold mb-1 truncate">
                  {persona.name || 'Unnamed Persona'}
                </p>

                {/* Description */}
                <p className="text-[#737373] text-xs line-clamp-2">
                  {persona.description || 'No description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Persona Button */}
      <button
        onClick={addPersona}
        disabled={disabled}
        className="w-full py-3 px-4 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-dashed border-[#2a2a2a] hover:border-[#FFEB01]/50 rounded-lg text-[#737373] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
      >
        <Plus size={16} />
        Add Persona
      </button>

      {/* Persona Editor Modal */}
      {showEditor && editingPersona && (
        createPortal(
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 99999 }}
            onClick={cancelEdit}
          >
            <div 
              className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
                <h3 className="text-lg font-bold text-white">Edit Persona</h3>
                <button
                  onClick={cancelEdit}
                  className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-[#737373] hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-medium text-[#737373] mb-2 uppercase tracking-wider">
                    Profile Image
                  </label>
                  <ImageUpload
                    value={editingPersona.image}
                    onChange={(url) => setEditingPersona({ ...editingPersona, image: url })}
                    aspectRatio="1:1"
                    folder={getCaseStudyImagesFolder(caseStudyTitle)}
                  />
                </div>

                {/* Name/Title */}
                <div>
                  <label className="block text-xs font-medium text-[#737373] mb-2 uppercase tracking-wider">
                    Name / Title
                  </label>
                  <input
                    type="text"
                    value={editingPersona.name}
                    onChange={(e) => setEditingPersona({ ...editingPersona, name: e.target.value })}
                    placeholder="e.g., Sarah, 28, Marketing Manager"
                    className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50 transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-[#737373] mb-2 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    value={editingPersona.description}
                    onChange={(e) => setEditingPersona({ ...editingPersona, description: e.target.value })}
                    placeholder="Describe the persona's needs, goals, pain points..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg text-white placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#2a2a2a] flex items-center justify-end gap-3">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePersona}
                  disabled={!editingPersona.name.trim()}
                  className="px-4 py-2 bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Persona
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </div>
  );
}