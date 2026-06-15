import { X, FileText, User, MessageSquare, Camera, BarChart2 } from 'lucide-react';
import { ScriptProject } from '../types/script';

interface StatsPanelProps {
  project: ScriptProject;
  onClose: () => void;
}

export default function StatsPanel({ project, onClose }: StatsPanelProps) {
  const elements = project.elements;
  
  const counts = {
    'scene-heading': elements.filter(e => e.type === 'scene-heading').length,
    'action': elements.filter(e => e.type === 'action').length,
    'character': elements.filter(e => e.type === 'character').length,
    'dialogue': elements.filter(e => e.type === 'dialogue').length,
    'parenthetical': elements.filter(e => e.type === 'parenthetical').length,
    'transition': elements.filter(e => e.type === 'transition').length,
    'shot': elements.filter(e => e.type === 'shot').length,
    'note': elements.filter(e => e.type === 'note').length,
  };

  // Character analysis
  const characterNames = elements
    .filter(e => e.type === 'character')
    .map(e => e.content.trim());
  const uniqueCharacters = [...new Set(characterNames)];
  const characterCounts = uniqueCharacters.map(char => ({
    name: char,
    count: characterNames.filter(c => c === char).length,
  })).sort((a, b) => b.count - a.count);

  const totalWords = elements.reduce((acc, el) => {
    return acc + el.content.split(/\s+/).filter(w => w.length > 0).length;
  }, 0);

  const estimatedMinutes = Math.round(project.pageCount * 1.2);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 sticky top-0 bg-zinc-900">
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={20} />
          </button>
          <h2 className="text-white font-bold font-urdu flex items-center gap-2">
            <BarChart2 size={18} className="text-yellow-400" />
            اسکرپٹ کے اعداد و شمار
          </h2>
        </div>

        <div className="p-5 space-y-5">
          {/* Overview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{totalWords}</p>
              <p className="text-zinc-500 text-xs font-urdu mt-1">کل الفاظ</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{project.pageCount}</p>
              <p className="text-zinc-500 text-xs font-urdu mt-1">صفحات</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-yellow-400 text-2xl font-bold">{estimatedMinutes}</p>
              <p className="text-zinc-500 text-xs font-urdu mt-1">تخمینی منٹ</p>
            </div>
          </div>

          {/* Element Breakdown */}
          <div>
            <h3 className="text-zinc-400 text-xs font-urdu text-right mb-3">عناصر کی تقسیم</h3>
            <div className="space-y-2">
              {[
                { key: 'scene-heading', label: 'مناظر', icon: <Camera size={13} />, color: 'bg-yellow-400' },
                { key: 'action', label: 'عمل', icon: <FileText size={13} />, color: 'bg-zinc-500' },
                { key: 'character', label: 'کردار', icon: <User size={13} />, color: 'bg-amber-400' },
                { key: 'dialogue', label: 'مکالمے', icon: <MessageSquare size={13} />, color: 'bg-blue-400' },
                { key: 'transition', label: 'منتقلی', icon: <FileText size={13} />, color: 'bg-purple-400' },
              ].map(item => {
                const count = counts[item.key as keyof typeof counts];
                const maxCount = Math.max(...Object.values(counts));
                const width = maxCount > 0 ? (count / maxCount) * 100 : 0;
                return (
                  <div key={item.key} className="flex items-center gap-3">
                    <span className="text-zinc-500">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-zinc-400 text-xs font-urdu">{item.label}</span>
                        <span className="text-white text-xs font-bold">{count}</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Character Frequency */}
          {characterCounts.length > 0 && (
            <div>
              <h3 className="text-zinc-400 text-xs font-urdu text-right mb-3">کردار کی تکرار</h3>
              <div className="space-y-2">
                {characterCounts.slice(0, 8).map((char) => (
                  <div key={char.name} className="flex items-center justify-between bg-zinc-800/50 rounded-lg px-4 py-2">
                    <span className="text-yellow-400 text-sm font-bold">{char.count}x</span>
                    <span className="text-white text-sm font-urdu">{char.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="bg-zinc-800/30 rounded-xl p-4 text-right">
            <h3 className="text-zinc-400 text-xs font-urdu mb-3">پروجیکٹ کی معلومات</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">{new Date(project.updatedAt).toLocaleDateString('ur-PK')}</span>
                <span className="text-zinc-500 font-urdu">آخری ترمیم</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">{new Date(project.createdAt).toLocaleDateString('ur-PK')}</span>
                <span className="text-zinc-500 font-urdu">تخلیق کی تاریخ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white font-urdu">{project.genre}</span>
                <span className="text-zinc-500 font-urdu">صنف</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">{project.author}</span>
                <span className="text-zinc-500 font-urdu">مصنف</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
