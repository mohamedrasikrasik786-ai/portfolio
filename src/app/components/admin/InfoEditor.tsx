import { Plus, Trash2 } from 'lucide-react';
import { InfoItem } from '@/types/caseStudy';

interface InfoEditorProps {
  infoItems: InfoItem[];
  onChange: (items: InfoItem[]) => void;
  disabled?: boolean;
}

export function InfoEditor({ infoItems, onChange, disabled }: InfoEditorProps) {
  const addItem = () => {
    onChange([...infoItems, { label: '', value: '' }]);
  };

  const updateItem = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...infoItems];
    updated[index][field] = value;
    onChange(updated);
  };

  const deleteItem = (index: number) => {
    onChange(infoItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="bg-[#0E0E0E] border border-[#2a2a2a] rounded-lg p-3 group hover:border-[#FFEB01]/30 transition-colors"
        >
          <div className="flex gap-3 items-start">
            {/* Label Input */}
            <div className="flex-1">
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateItem(index, 'label', e.target.value)}
                placeholder="Label (e.g., My role:)"
                className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-sm placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50"
                disabled={disabled}
              />
            </div>

            {/* Value Input */}
            <div className="flex-1">
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateItem(index, 'value', e.target.value)}
                placeholder="Value (e.g., Led end-to-end design)"
                className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-white text-sm placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50"
                disabled={disabled}
              />
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteItem(index)}
              disabled={disabled}
              className="p-2 hover:bg-red-500/10 text-[#737373] hover:text-red-500 rounded transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Add Item Button */}
      <button
        onClick={addItem}
        disabled={disabled}
        className="w-full py-3 px-4 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-dashed border-[#2a2a2a] hover:border-[#FFEB01]/50 rounded-lg text-[#737373] hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
      >
        <Plus size={16} />
        Add Info Item
      </button>
    </div>
  );
}
