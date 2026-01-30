import { useState } from 'react';
import { X, Upload, FileText, Copy, Check, AlertTriangle } from 'lucide-react';
import type { CaseStudy } from '@/types/caseStudy';

interface AIImportModalProps {
  onImport: (data: Partial<CaseStudy>) => void;
  onClose: () => void;
}

const CHATGPT_PROMPT = `I need you to create a case study in JSON format. Please structure it EXACTLY like this example:

{
  "title": "Project Name",
  "description": "Brief 1-2 sentence description of the project",
  "category": "Web Design",
  "tags": ["UX", "UI", "Branding"],
  "sections": [
    {
      "heading": "Overview",
      "tocLabel": "Overview",
      "showInToc": true,
      "blocks": [
        {
          "type": "info",
          "infoItems": [
            { "label": "My Role", "value": "Lead Designer" },
            { "label": "Timeline", "value": "4 Weeks" },
            { "label": "Tools", "value": "Figma, React" }
          ]
        },
        {
          "type": "paragraph",
          "content": "High-level overview of the project..."
        }
      ]
    },
    {
      "heading": "The Challenge",
      "tocLabel": "Challenge",
      "showInToc": true,
      "blocks": [
        {
          "type": "paragraph",
          "content": "Describe the challenge or problem you were solving..."
        },
        {
          "type": "users",
          "personas": [
            {
              "id": "persona1",
              "name": "Sarah (Busy Professional)",
              "description": "Needs quick access to data...",
              "image": "PLACEHOLDER_PERSONA_1"
            },
            {
              "id": "persona2",
              "name": "Mike (Student)",
              "description": "Looking for affordable options...",
              "image": "PLACEHOLDER_PERSONA_2"
            }
          ]
        }
      ]
    },
    {
      "heading": "Research & Discovery",
      "tocLabel": "Research",
      "showInToc": true,
      "blocks": [
        {
          "type": "paragraph",
          "content": "Research findings..."
        },
        {
          "type": "image",
          "content": "PLACEHOLDER_IMAGE_1",
          "metadata": { "imageAlt": "Research Analysis Graph" }
        }
      ]
    },
    {
      "heading": "The Solution",
      "tocLabel": "Solution",
      "showInToc": true,
      "blocks": [
        {
          "type": "paragraph",
          "content": "Solution description..."
        },
        {
          "type": "userflow",
          "content": "PLACEHOLDER_USERFLOW_IMAGE"
        },
        {
          "type": "image",
          "content": "PLACEHOLDER_IMAGE_2",
          "metadata": { "imageAlt": "Final Design Mockup" }
        }
      ]
    },
    {
      "heading": "Results & Impact",
      "tocLabel": "Results",
      "showInToc": true,
      "blocks": [
        {
          "type": "list",
          "content": "• 50% increase in engagement\\n• 30% faster task completion\\n• 95% user satisfaction"
        }
      ]
    }
  ]
}

BLOCK TYPES YOU CAN USE:
- "paragraph": Regular text content
- "heading": Sub-headings within sections
- "list": Bullet points (use \\n for new lines, start each with •)
- "quote": Important quotes or testimonials
- "image": Use "PLACEHOLDER_IMAGE_X" (I'll replace manually). optional: "metadata": { "imageAlt": "..." }
- "users": User personas with "personas" array (name, description, image)
- "userflow": Large diagram/flowchart image. Use "PLACEHOLDER_USERFLOW_IMAGE"
- "info": Grid of key-value pairs (use "infoItems" array with label/value)

IMPORTANT RULES:
1. Return ONLY valid JSON, no extra text
2. Use \\n for line breaks in lists
3. Keep descriptions clear and professional
4. Use "PLACEHOLDER_..." for all images
5. Set "showInToc": true for sections you want in navigation

Now, create a case study for: [YOUR PROJECT DESCRIPTION HERE]`;

export function AIImportModal({ onImport, onClose }: AIImportModalProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  const copyPrompt = () => {
    navigator.clipboard.writeText(CHATGPT_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    try {
      setError(null);
      
      // Parse JSON
      const data = JSON.parse(jsonInput);
      
      // Validate required fields
      if (!data.title) {
        throw new Error('Missing required field: title');
      }
      
      if (!data.sections || !Array.isArray(data.sections)) {
        throw new Error('Missing or invalid sections array');
      }

      // Validate sections
      data.sections.forEach((section: any, index: number) => {
        if (!section.heading) {
          throw new Error(`Section ${index + 1} is missing a heading`);
        }
        if (!section.blocks || !Array.isArray(section.blocks)) {
          throw new Error(`Section "${section.heading}" is missing blocks array`);
        }
        
        // Add IDs and defaults
        section.id = Date.now().toString() + Math.random();
        section.title = section.heading;
        section.collapsed = false;
        section.order = index;
        section.showInToc = section.showInToc !== false;
        
        section.blocks.forEach((block: any, blockIndex: number) => {
          if (!block.type) {
            throw new Error(`Block ${blockIndex + 1} in section "${section.heading}" is missing type`);
          }
          block.id = Date.now().toString() + Math.random() + blockIndex;
          block.content = block.content || '';
          block.metadata = block.metadata || {};
        });
      });

      // Add defaults
      const caseStudyData: Partial<CaseStudy> = {
        title: data.title,
        description: data.description || '',
        category: data.category || '',
        tags: data.tags || [],
        sections: data.sections,
        status: 'draft',
        featured: false,
        comingSoon: false,
        thumbnail: ''
      };

      console.log('✅ Imported case study:', caseStudyData);
      onImport(caseStudyData);
      onClose();
      
    } catch (err) {
      console.error('Import error:', err);
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFEB01]/10 rounded-lg">
              <Upload size={20} className="text-[#FFEB01]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Import from ChatGPT</h2>
              <p className="text-sm text-[#737373] mt-0.5">Generate your case study with AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-[#737373] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Toggle */}
          <div className="p-6 border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPrompt(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  showPrompt 
                    ? 'bg-[#FFEB01] text-[#0E0E0E]' 
                    : 'bg-[#0E0E0E] text-[#737373] hover:text-white'
                }`}
              >
                <FileText size={16} className="inline mr-2" />
                Step 1: Get Prompt
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  !showPrompt 
                    ? 'bg-[#FFEB01] text-[#0E0E0E]' 
                    : 'bg-[#0E0E0E] text-[#737373] hover:text-white'
                }`}
              >
                <Upload size={16} className="inline mr-2" />
                Step 2: Import JSON
              </button>
            </div>
          </div>

          {showPrompt ? (
            /* Step 1: ChatGPT Prompt */
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    ChatGPT Prompt Template
                  </h3>
                  <button
                    onClick={copyPrompt}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-semibold rounded-lg transition-colors text-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy Prompt
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-[#0E0E0E] border border-[#2a2a2a] rounded-xl p-4 max-h-[400px] overflow-y-auto">
                  <pre className="text-xs text-[#737373] whitespace-pre-wrap font-mono leading-relaxed">
                    {CHATGPT_PROMPT}
                  </pre>
                </div>
              </div>

              <div className="bg-[#FFEB01]/5 border border-[#FFEB01]/20 rounded-xl p-4">
                <h4 className="text-sm font-bold text-[#FFEB01] mb-2 flex items-center gap-2">
                  <FileText size={16} />
                  How to Use:
                </h4>
                <ol className="text-xs text-[#FFEB01]/80 space-y-1.5 leading-relaxed">
                  <li><strong>1.</strong> Click "Copy Prompt" above</li>
                  <li><strong>2.</strong> Open ChatGPT (GPT-4 recommended)</li>
                  <li><strong>3.</strong> Paste the prompt and add your project details at the end</li>
                  <li><strong>4.</strong> Copy the JSON response from ChatGPT</li>
                  <li><strong>5.</strong> Click "Step 2: Import JSON" and paste it there</li>
                </ol>
              </div>
            </div>
          ) : (
            /* Step 2: JSON Import */
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Paste ChatGPT JSON Output
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"title": "Your Project", "description": "...", "sections": [...]}'
                  className="w-full h-[400px] bg-[#0E0E0E] border border-[#2a2a2a] rounded-xl p-4 text-white placeholder:text-[#737373]/50 focus:outline-none focus:border-[#FFEB01]/50 transition-colors font-mono text-xs resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-500 font-semibold text-sm">Import Error</p>
                    <p className="text-red-500/80 text-xs mt-1">{error}</p>
                  </div>
                </div>
              )}

              <div className="bg-[#FFEB01]/5 border border-[#FFEB01]/20 rounded-xl p-4">
                <p className="text-xs text-[#FFEB01]/80 leading-relaxed">
                  💡 <strong>Tip:</strong> Make sure to paste the complete JSON including the opening and closing curly braces. 
                  All images will be set as placeholders - you can replace them after import.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#2a2a2a] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          
          {!showPrompt && (
            <button
              onClick={handleImport}
              disabled={!jsonInput.trim()}
              className="px-6 py-2.5 bg-[#FFEB01] hover:bg-[#FFD700] text-[#0E0E0E] font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload size={16} />
              Import Case Study
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
