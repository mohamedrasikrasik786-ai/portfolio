import { FileText } from 'lucide-react';
import type { CaseStudy } from '@/types/caseStudy';

interface CaseStudyPreviewCardProps {
  caseStudy: Partial<CaseStudy>;
}

export function CaseStudyPreviewCard({ caseStudy }: CaseStudyPreviewCardProps) {
  const sectionCount = caseStudy.sections?.length || 0;
  const blockCount = caseStudy.sections?.reduce((total, section) => total + (section.blocks?.length || 0), 0) || 0;

  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#FFEB01]/30 transition-all">
      <div className="flex items-start gap-6">
        {/* Thumbnail Preview */}
        <div className="w-32 h-32 bg-[#0E0E0E] rounded-xl overflow-hidden flex-shrink-0 border border-[#2a2a2a]">
          {caseStudy.thumbnail ? (
            <img 
              src={caseStudy.thumbnail} 
              alt={caseStudy.title || 'Case Study'}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="text-[#737373]" size={32} />
            </div>
          )}
        </div>

        {/* Content Preview */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white truncate">
                  {caseStudy.title || 'Untitled Case Study'}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                    caseStudy.status === 'published'
                      ? 'bg-[#FFEB01]/10 text-[#FFEB01] border border-[#FFEB01]/20'
                      : 'bg-[#2a2a2a] text-[#737373]'
                  }`}
                >
                  {caseStudy.status || 'draft'}
                </span>
              </div>
              
              {caseStudy.description && (
                <p className="text-sm text-[#737373] mb-3 line-clamp-2">
                  {caseStudy.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-[#737373]">
                {caseStudy.category && (
                  <span className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#FFEB01]" />
                    {caseStudy.category}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#737373]" />
                  {sectionCount} section{sectionCount !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#737373]" />
                  {blockCount} block{blockCount !== 1 ? 's' : ''}
                </span>
                {caseStudy.slug && (
                  <span className="flex items-center gap-1.5 font-mono text-xs">
                    <div className="w-1 h-1 rounded-full bg-[#737373]" />
                    /{caseStudy.slug}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#2a2a2a]">
              {caseStudy.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-[#2a2a2a] text-[#737373] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
