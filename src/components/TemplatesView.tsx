import React, { useState } from 'react';
import { ChevronRight, Film, Tv, Radio, BookOpen, Star, Globe } from 'lucide-react';
import { scriptTemplates, ScriptTemplate } from '../data/templates';

interface TemplatesViewProps {
  onUseTemplate: (content: string, templateId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Film': <Film size={16} />,
  'Drama': <Tv size={16} />,
  'Digital': <Globe size={16} />,
  'Radio': <Radio size={16} />,
  'Theatre': <Star size={16} />,
  'Documentary': <BookOpen size={16} />,
};

const categoryColors: Record<string, string> = {
  'Film': 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30',
  'Drama': 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
  'Digital': 'from-purple-500/20 to-violet-500/10 border-purple-500/30',
  'Radio': 'from-green-500/20 to-emerald-500/10 border-green-500/30',
  'Theatre': 'from-pink-500/20 to-rose-500/10 border-pink-500/30',
  'Documentary': 'from-orange-500/20 to-red-500/10 border-orange-500/30',
};

export default function TemplatesView({ onUseTemplate }: TemplatesViewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ScriptTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...new Set(scriptTemplates.map(t => t.category))];
  const filtered = activeCategory === 'all' 
    ? scriptTemplates 
    : scriptTemplates.filter(t => t.category === activeCategory);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900">
        <h2 className="text-white font-bold text-lg font-urdu text-right mb-1">ٹیمپلیٹس</h2>
        <p className="text-zinc-500 text-sm text-right font-urdu">اپنی اسکرپٹ کے لیے ٹیمپلیٹ منتخب کریں</p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${
                activeCategory === cat
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat !== 'all' && categoryIcons[cat]}
              <span className="font-urdu">{cat === 'all' ? 'سب' : cat}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(template => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`relative rounded-xl border bg-gradient-to-br ${categoryColors[template.category] || 'from-zinc-800 to-zinc-900 border-zinc-700'} 
                  p-4 cursor-pointer hover:scale-[1.02] transition-all duration-200 group
                  ${selectedTemplate?.id === template.id ? 'ring-2 ring-yellow-400' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{template.icon}</span>
                  <div className="flex items-center gap-1 text-zinc-500 text-xs">
                    {categoryIcons[template.category]}
                    <span>{template.urduCategory}</span>
                  </div>
                </div>
                
                <h3 className="text-white font-bold font-urdu text-right text-base mb-1">
                  {template.urduTitle}
                </h3>
                <p className="text-zinc-400 text-xs font-urdu text-right leading-relaxed mb-4">
                  {template.description}
                </p>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUseTemplate(template.content, template.id);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 font-urdu"
                >
                  استعمال کریں
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Panel */}
        {selectedTemplate && (
          <div className="hidden lg:flex w-80 border-l border-zinc-800 flex-col bg-zinc-900">
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedTemplate.icon}</span>
                <div>
                  <h3 className="text-white font-bold font-urdu text-right">{selectedTemplate.urduTitle}</h3>
                  <p className="text-zinc-500 text-xs">{selectedTemplate.title}</p>
                </div>
              </div>
              <button
                onClick={() => onUseTemplate(selectedTemplate.content, selectedTemplate.id)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-lg text-sm font-urdu transition-colors"
              >
                یہ ٹیمپلیٹ استعمال کریں
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-zinc-500 text-xs mb-2 font-urdu text-right">پیش نظارہ:</p>
              <pre className="text-zinc-300 text-xs font-urdu text-right whitespace-pre-wrap leading-loose" dir="rtl">
                {selectedTemplate.content}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
