import { useState } from 'react';
import { Film, Tv, Star, Tag } from 'lucide-react';
import { scriptReferences, ScriptReference } from '../data/templates';

interface ReferencesViewProps {
  onUseExcerpt: (excerpt: string) => void;
}

export default function ReferencesView({ onUseExcerpt }: ReferencesViewProps) {
  const [selectedRef, setSelectedRef] = useState<ScriptReference | null>(scriptReferences[0]);
  const [activeType, setActiveType] = useState<string>('all');

  const types = ['all', ...new Set(scriptReferences.map(r => r.type))];
  const filtered = activeType === 'all' 
    ? scriptReferences 
    : scriptReferences.filter(r => r.type === activeType);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900">
        <h2 className="text-white font-bold text-lg font-urdu text-right mb-1">مشہور اسکرپٹس</h2>
        <p className="text-zinc-500 text-sm text-right font-urdu">پاکستانی فلموں اور ڈراموں کی مثالیں</p>
        
        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 mt-3">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                activeType === type
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'سب' : type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* References List */}
        <div className="w-full lg:w-72 border-r border-zinc-800 overflow-y-auto">
          {filtered.map(ref => (
            <div
              key={ref.id}
              onClick={() => setSelectedRef(ref)}
              className={`p-4 border-b border-zinc-800/50 cursor-pointer hover:bg-zinc-800/50 transition-colors ${
                selectedRef?.id === ref.id ? 'bg-zinc-800 border-l-2 border-l-yellow-400' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold font-urdu text-right text-sm">
                    {ref.urduTitle}
                  </h3>
                  <p className="text-zinc-400 text-xs text-right">{ref.title}</p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="text-zinc-600 text-xs">{ref.year}</span>
                    <span className="text-yellow-400/60 text-xs font-urdu">{ref.urduGenre}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  ref.type === 'Feature Film' ? 'bg-yellow-400/10 text-yellow-400' :
                  ref.type === 'TV Drama' ? 'bg-blue-400/10 text-blue-400' :
                  'bg-purple-400/10 text-purple-400'
                }`}>
                  {ref.type === 'Feature Film' ? <Film size={16} /> : <Tv size={16} />}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2 justify-end">
                {ref.tags.map(tag => (
                  <span key={tag} className="bg-zinc-700 text-zinc-400 text-xs px-2 py-0.5 rounded-full font-urdu">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reference Detail */}
        {selectedRef && (
          <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
            <div className="p-6 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedRef.type === 'Feature Film' ? 'bg-yellow-400/10 text-yellow-400' :
                    'bg-blue-400/10 text-blue-400'
                  }`}>
                    {selectedRef.type}
                  </span>
                  <span className="text-zinc-500 text-xs ml-2">{selectedRef.year}</span>
                </div>
                <div className="text-right">
                  <h2 className="text-white font-bold text-xl font-urdu">{selectedRef.urduTitle}</h2>
                  <p className="text-zinc-400 text-sm">{selectedRef.title}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-right">
                  <p className="text-zinc-500 text-xs font-urdu">مصنف</p>
                  <p className="text-white">{selectedRef.writer}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500 text-xs font-urdu">صنف</p>
                  <p className="text-yellow-400 font-urdu">{selectedRef.urduGenre}</p>
                </div>
              </div>
              
              <p className="text-zinc-400 text-sm mt-3 text-right font-urdu leading-relaxed">
                {selectedRef.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3 justify-end">
                {selectedRef.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-full font-urdu">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => onUseExcerpt(selectedRef.excerpt)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg text-xs transition-colors font-urdu"
                >
                  اسکرپٹ میں شامل کریں
                </button>
                <h3 className="text-zinc-400 text-sm font-urdu">نمونہ مکالمہ</h3>
              </div>
              
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <pre className="text-zinc-200 text-sm font-urdu text-right whitespace-pre-wrap leading-loose" dir="rtl">
                  {selectedRef.excerpt}
                </pre>
              </div>

              <div className="mt-6 bg-zinc-800/30 rounded-xl p-4 border border-zinc-800">
                <h4 className="text-zinc-400 text-xs font-urdu text-right mb-3">اسکرپٹ رائٹنگ کے اسباق:</h4>
                <ul className="space-y-2 text-right">
                  <li className="text-zinc-500 text-xs font-urdu flex items-start gap-2 justify-end">
                    <span>مضبوط کردار ہمیشہ مکالمے میں جھلکتا ہے</span>
                    <Star size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                  </li>
                  <li className="text-zinc-500 text-xs font-urdu flex items-start gap-2 justify-end">
                    <span>ہر منظر میں ایک واضح مقصد ہونا چاہیے</span>
                    <Star size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                  </li>
                  <li className="text-zinc-500 text-xs font-urdu flex items-start gap-2 justify-end">
                    <span>جذبات دکھائیں، بتائیں نہیں</span>
                    <Star size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
