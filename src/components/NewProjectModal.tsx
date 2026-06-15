import { useState } from 'react';
import { X, Film, Tv, Globe, Radio, Star, BookOpen } from 'lucide-react';
import { ScriptProject } from '../types/script';

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (project: Omit<ScriptProject, 'id' | 'createdAt' | 'updatedAt' | 'elements' | 'wordCount' | 'pageCount'>) => void;
}

const projectTypes = [
  { id: 'feature-film', label: 'Feature Film', urduLabel: 'فیچر فلم', icon: <Film size={20} />, color: 'yellow' },
  { id: 'tv-drama', label: 'TV Drama', urduLabel: 'ٹی وی ڈرامہ', icon: <Tv size={20} />, color: 'blue' },
  { id: 'web-series', label: 'Web Series', urduLabel: 'ویب سیریز', icon: <Globe size={20} />, color: 'purple' },
  { id: 'telefilm', label: 'Telefilm', urduLabel: 'ٹیلی فلم', icon: <Star size={20} />, color: 'pink' },
  { id: 'short-film', label: 'Short Film', urduLabel: 'مختصر فلم', icon: <Film size={18} />, color: 'green' },
  { id: 'radio-drama', label: 'Radio Drama', urduLabel: 'ریڈیو ڈرامہ', icon: <Radio size={20} />, color: 'orange' },
  { id: 'documentary', label: 'Documentary', urduLabel: 'دستاویزی فلم', icon: <BookOpen size={20} />, color: 'red' },
  { id: 'stage-play', label: 'Stage Play', urduLabel: 'اسٹیج ڈرامہ', icon: <Star size={20} />, color: 'cyan' },
];

const genres = [
  'ڈرامہ', 'کامیڈی', 'تھرلر', 'رومانس', 'ایکشن', 
  'ہارر', 'معاشرتی', 'تاریخی', 'مذہبی', 'سیاسی',
  'جاسوسی', 'خاندانی', 'نفسیاتی', 'بچوں کا'
];

export default function NewProjectModal({ onClose, onCreate }: NewProjectModalProps) {
  const [title, setTitle] = useState('');
  const [urduTitle, setUrduTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedType, setSelectedType] = useState('feature-film');
  const [selectedGenre, setSelectedGenre] = useState('ڈرامہ');
  const [scriptText] = useState('');

  const colorMap: Record<string, string> = {
    yellow: 'border-yellow-400 bg-yellow-400/10 text-yellow-400',
    blue: 'border-blue-400 bg-blue-400/10 text-blue-400',
    purple: 'border-purple-400 bg-purple-400/10 text-purple-400',
    pink: 'border-pink-400 bg-pink-400/10 text-pink-400',
    green: 'border-green-400 bg-green-400/10 text-green-400',
    orange: 'border-orange-400 bg-orange-400/10 text-orange-400',
    red: 'border-red-400 bg-red-400/10 text-red-400',
    cyan: 'border-cyan-400 bg-cyan-400/10 text-cyan-400',
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({
      title: title || 'Untitled',
      urduTitle: urduTitle || title,
      author: author || 'نامعلوم مصنف',
      type: selectedType,
      genre: selectedGenre,
      language: 'urdu',
      scriptText: scriptText,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-1 transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-white font-bold text-lg font-urdu">نئی اسکرپٹ</h2>
          <div className="w-6" />
        </div>

        <div className="p-5 space-y-5">
          {/* Title */}
          <div>
            <label className="text-zinc-400 text-xs font-urdu text-right block mb-1">اسکرپٹ کا عنوان (اردو) *</label>
            <input
              type="text"
              value={urduTitle}
              onChange={e => setUrduTitle(e.target.value)}
              placeholder="مثلاً: آخری موڑ"
              dir="rtl"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 text-right font-urdu focus:outline-none focus:border-yellow-400 placeholder-zinc-600"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs font-urdu text-right block mb-1">عنوان (انگریزی / رومن)</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Aakhri Mor"
              dir="ltr"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 placeholder-zinc-600"
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-zinc-400 text-xs font-urdu text-right block mb-1">مصنف کا نام</label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="آپ کا نام"
              dir="rtl"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 text-right font-urdu focus:outline-none focus:border-yellow-400 placeholder-zinc-600"
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="text-zinc-400 text-xs font-urdu text-right block mb-2">اسکرپٹ کی قسم</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {projectTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    selectedType === type.id
                      ? colorMap[type.color]
                      : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {type.icon}
                  <span className="text-xs font-urdu">{type.urduLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="text-zinc-400 text-xs font-urdu text-right block mb-2">صنف</label>
            <div className="flex flex-wrap gap-2 justify-end">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-xs font-urdu transition-all ${
                    selectedGenre === genre
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={!urduTitle.trim() && !title.trim()}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl text-base font-urdu transition-colors"
          >
            اسکرپٹ شروع کریں ✍️
          </button>
        </div>
      </div>
    </div>
  );
}
