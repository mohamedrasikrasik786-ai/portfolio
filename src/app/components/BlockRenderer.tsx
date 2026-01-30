import React from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { ContentBlock, Persona, InfoItem } from '@/types/caseStudy';
import { useTheme } from '@/contexts/ThemeContext';
import { Check, User, Info } from 'lucide-react';

interface BlockRendererProps {
  block: ContentBlock;
  isDark: boolean;
  onOpenLightbox?: (url: string, alt?: string) => void;
}

export function BlockRenderer({ block, isDark, onOpenLightbox }: BlockRendererProps) {
  const { type, content, personas, infoItems } = block;

  switch (type) {
    case 'paragraph':
      return (
        <p className={`font-['DM_Sans:Regular',sans-serif] text-[16px] md:text-[18px] leading-[1.8] mb-6 whitespace-pre-line ${
          isDark ? 'text-[#e5e5e5]' : 'text-gray-700'
        }`}>
          {content}
        </p>
      );

    case 'heading':
      return (
        <h3 className={`font-['Barlow_Condensed',sans-serif] text-[28px] md:text-[32px] lg:text-[36px] tracking-[0px] leading-[1.3] mt-12 mb-6 ${
          isDark ? 'text-[#FFEB01]' : 'text-black'
        }`}>
          {content}
        </h3>
      );

    case 'list':
      const items = content.split('\n').filter(item => item.trim());
      return (
        <ul className={`font-['DM_Sans:Regular',sans-serif] text-[16px] md:text-[18px] leading-[1.8] mb-8 space-y-3 pl-2 ${
          isDark ? 'text-[#e5e5e5]' : 'text-gray-700'
        }`}>
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-[#FFEB01]' : 'bg-black'}`} />
              <span>{item.replace(/^[•-]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className={`border-l-4 pl-6 py-2 my-10 ${
          isDark ? 'border-[#FFEB01] bg-[#FFEB01]/5' : 'border-black bg-gray-50'
        }`}>
          <p className={`font-['DM_Sans:Medium',sans-serif] text-[20px] md:text-[24px] italic leading-[1.6] ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            "{content}"
          </p>
        </blockquote>
      );

    case 'image':
      if (!content) return null;
      return (
        <div 
          className="w-full my-12 rounded-[12px] overflow-hidden cursor-zoom-in"
          onClick={() => onOpenLightbox?.(content, block.metadata?.imageAlt)}
        >
          <ImageWithFallback
            src={content}
            alt={block.metadata?.imageAlt || 'Project image'}
            className="w-full h-auto object-cover"
          />
          {block.metadata?.imageAlt && (
            <p className={`font-['DM_Sans:Regular',sans-serif] text-[14px] mt-3 italic text-center ${
              isDark ? 'text-[#8d8d8d]' : 'text-gray-500'
            }`}>
              {block.metadata.imageAlt}
            </p>
          )}
        </div>
      );

    case 'userflow':
      if (!content) return null;
      return (
        <div 
          className={`w-full my-12 p-6 md:p-12 rounded-[12px] overflow-hidden ${
            isDark ? 'bg-[#1c1c1c]' : 'bg-gray-50'
          }`}
        >
           <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${
             isDark ? 'text-[#737373]' : 'text-gray-500'
           }`}>
             User Flow Diagram
           </h4>
           <div 
             className="cursor-zoom-in rounded-lg overflow-hidden bg-white/5"
             onClick={() => onOpenLightbox?.(content, 'User Flow Diagram')}
           >
            <ImageWithFallback
              src={content}
              alt="User Flow"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      );

    case 'users':
      if (!personas?.length) return null;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          {personas.map(persona => (
            <div key={persona.id} className={`p-6 rounded-xl border ${
              isDark ? 'bg-[#1c1c1c] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ${
                  isDark ? 'bg-[#333]' : 'bg-gray-200'
                }`}>
                  {persona.image ? (
                    <ImageWithFallback src={persona.image} alt={persona.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                  )}
                </div>
                <div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{persona.name}</h4>
                  <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#FFEB01]' : 'text-blue-600'}`}>Persona</span>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-[#b0b0b0]' : 'text-gray-600'}`}>
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      );

    case 'info':
      if (!infoItems?.length) return null;
      return (
        <div className={`flex flex-wrap gap-4 my-8 p-6 rounded-xl border ${
          isDark ? 'bg-[#1c1c1c] border-[#2a2a2a]' : 'bg-blue-50 border-blue-100'
        }`}>
          {infoItems.map((item, idx) => (
            <div key={idx} className={`flex-1 min-w-[200px] ${idx !== infoItems.length - 1 ? 'border-r border-dashed' : ''} ${
              isDark ? 'border-[#333]' : 'border-blue-200'
            } pr-4 mr-4 last:border-0 last:mr-0 last:pr-0`}>
              <span className={`block text-xs uppercase tracking-wider mb-1 ${
                isDark ? 'text-[#737373]' : 'text-blue-500'
              }`}>
                {item.label}
              </span>
              <span className={`font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
