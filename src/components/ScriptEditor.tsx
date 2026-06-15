import React, { useState, useRef, useCallback } from 'react';
import { 
  Type, AlignLeft, User, MessageSquare, 
  Parentheses, ArrowRight, Camera, StickyNote,
  Wand2, Eye, EyeOff, RotateCcw, Languages
} from 'lucide-react';
import { ScriptProject, ScriptElement, ElementType, elementConfigs } from '../types/script';
import { romanToUrdu } from '../utils/romanToUrdu';

interface ScriptEditorProps {
  project: ScriptProject;
  onUpdate: (project: ScriptProject) => void;
}

const elementIcons: Record<ElementType, React.ReactNode> = {
  'scene-heading': <Camera size={13} />,
  'action': <AlignLeft size={13} />,
  'character': <User size={13} />,
  'dialogue': <MessageSquare size={13} />,
  'parenthetical': <Parentheses size={13} />,
  'transition': <ArrowRight size={13} />,
  'shot': <Type size={13} />,
  'note': <StickyNote size={13} />,
};

const elementOrder: ElementType[] = [
  'scene-heading', 'action', 'character', 'dialogue',
  'parenthetical', 'transition', 'shot', 'note'
];

export default function ScriptEditor({ project, onUpdate }: ScriptEditorProps) {
  const [activeElementType, setActiveElementType] = useState<ElementType>('scene-heading');
  const [showPreview, setShowPreview] = useState(false);
  const [inputMode, setInputMode] = useState<'urdu' | 'roman'>('urdu');
  const [liveRomanInput, setLiveRomanInput] = useState('');
  const [showTransliterated, setShowTransliterated] = useState('');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const wordCount = project.elements.reduce((acc, el) => {
    return acc + el.content.split(/\s+/).filter(w => w.length > 0).length;
  }, 0);

  const pageCount = Math.max(1, Math.ceil(wordCount / 200));

  const addElement = useCallback((type: ElementType, content: string = '') => {
    if (!content.trim()) return;
    
    const urduContent = inputMode === 'roman' ? romanToUrdu(content) : content;
    
    const newElement: ScriptElement = {
      id: generateId(),
      type,
      content: urduContent,
      urduContent: urduContent,
    };

    const updatedElements = [...project.elements, newElement];
    onUpdate({
      ...project,
      elements: updatedElements,
      updatedAt: new Date().toISOString(),
      wordCount,
      pageCount,
    });
  }, [project, onUpdate, inputMode, wordCount, pageCount]);

  const deleteElement = useCallback((id: string) => {
    onUpdate({
      ...project,
      elements: project.elements.filter(el => el.id !== id),
      updatedAt: new Date().toISOString(),
    });
  }, [project, onUpdate]);

  const updateElement = useCallback((id: string, content: string) => {
    onUpdate({
      ...project,
      elements: project.elements.map(el => 
        el.id === id ? { ...el, content, urduContent: content } : el
      ),
      updatedAt: new Date().toISOString(),
    });
  }, [project, onUpdate]);

  const moveElement = useCallback((id: string, direction: 'up' | 'down') => {
    const idx = project.elements.findIndex(el => el.id === id);
    if (idx === -1) return;
    const newElements = [...project.elements];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newElements.length) return;
    [newElements[idx], newElements[targetIdx]] = [newElements[targetIdx], newElements[idx]];
    onUpdate({ ...project, elements: newElements });
  }, [project, onUpdate]);

  const handleRomanInput = (text: string) => {
    setLiveRomanInput(text);
    if (text.trim()) {
      setShowTransliterated(romanToUrdu(text));
    } else {
      setShowTransliterated('');
    }
  };

  const handleAddFromRoman = () => {
    if (liveRomanInput.trim()) {
      addElement(activeElementType, liveRomanInput);
      setLiveRomanInput('');
      setShowTransliterated('');
    }
  };

  const handleAddDirect = (content: string) => {
    if (content.trim()) {
      addElement(activeElementType, content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMode === 'roman') {
        handleAddFromRoman();
      }
    }
  };

  const handleDirectKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputMode === 'urdu') {
      e.preventDefault();
      handleAddDirect(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  const duplicateElement = (el: ScriptElement) => {
    const newEl: ScriptElement = { ...el, id: generateId() };
    const idx = project.elements.findIndex(e => e.id === el.id);
    const newElements = [...project.elements];
    newElements.splice(idx + 1, 0, newEl);
    onUpdate({ ...project, elements: newElements });
  };

  const typeColors: Record<ElementType, string> = {
    'scene-heading': 'border-l-yellow-400 bg-yellow-400/5',
    'action': 'border-l-zinc-500 bg-zinc-800/30',
    'character': 'border-l-amber-400 bg-amber-400/5',
    'dialogue': 'border-l-blue-400 bg-blue-400/5',
    'parenthetical': 'border-l-gray-500 bg-gray-800/30',
    'transition': 'border-l-purple-400 bg-purple-400/5',
    'shot': 'border-l-cyan-400 bg-cyan-400/5',
    'note': 'border-l-green-400 bg-green-400/5',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-2">
        {/* Element Type Selector */}
        <div className="flex flex-wrap gap-1 mb-2">
          {elementOrder.map(type => {
            const config = elementConfigs[type];
            return (
              <button
                key={type}
                onClick={() => setActiveElementType(type)}
                title={`${config.label} (Alt+${config.shortcut})`}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                  activeElementType === type
                    ? 'bg-yellow-400 text-black'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {elementIcons[type]}
                <span className="hidden sm:inline font-urdu">{config.urduLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Input Mode Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setInputMode('urdu')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-urdu transition-colors ${
                inputMode === 'urdu' ? 'bg-yellow-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setInputMode('roman')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors ${
                inputMode === 'roman' ? 'bg-blue-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Languages size={12} />
              Roman → اردو
            </button>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors ${
              showPreview ? 'bg-zinc-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {showPreview ? <Eye size={12} /> : <EyeOff size={12} />}
            <span className="hidden sm:inline">پیش نظارہ</span>
          </button>

          <div className="ml-auto flex items-center gap-3 text-zinc-600 text-xs">
            <span>{wordCount} الفاظ</span>
            <span>{pageCount} صفحہ</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex flex-col ${showPreview ? 'w-1/2' : 'w-full'} transition-all`}>
          {/* Input Area */}
          <div className="p-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className={`rounded-lg border ${
              activeElementType === 'scene-heading' ? 'border-yellow-400/30' :
              activeElementType === 'dialogue' ? 'border-blue-400/30' :
              activeElementType === 'character' ? 'border-amber-400/30' :
              'border-zinc-700'
            } bg-zinc-950 overflow-hidden`}>
              
              {/* Element type badge */}
              <div className="flex items-center justify-between px-3 pt-2 pb-1">
                <div className="flex items-center gap-2">
                  {elementIcons[activeElementType]}
                  <span className="text-zinc-500 text-xs font-urdu">{elementConfigs[activeElementType].urduLabel}</span>
                </div>
                {inputMode === 'roman' && showTransliterated && (
                  <span className="text-xs text-blue-400 font-urdu">{showTransliterated}</span>
                )}
              </div>

              {inputMode === 'roman' ? (
                <div>
                  <textarea
                    ref={textareaRef}
                    value={liveRomanInput}
                    onChange={e => handleRomanInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={elementConfigs[activeElementType].placeholder}
                    dir="ltr"
                    rows={2}
                    className="w-full bg-transparent text-white px-3 pb-2 text-sm resize-none focus:outline-none placeholder-zinc-700 font-mono"
                  />
                  {showTransliterated && (
                    <div className="px-3 pb-2 border-t border-zinc-800 pt-2">
                      <p className="text-xs text-zinc-500 mb-1">ترجمہ:</p>
                      <p className="text-blue-300 text-sm font-urdu text-right" dir="rtl">{showTransliterated}</p>
                    </div>
                  )}
                  <div className="flex gap-2 px-3 pb-2">
                    <button
                      onClick={handleAddFromRoman}
                      disabled={!liveRomanInput.trim()}
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white px-3 py-1.5 rounded text-xs transition-colors"
                    >
                      <Wand2 size={12} />
                      اردو میں شامل کریں
                    </button>
                    <button
                      onClick={() => { setLiveRomanInput(''); setShowTransliterated(''); }}
                      className="text-zinc-500 hover:text-white px-2 py-1.5 rounded text-xs transition-colors"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <textarea
                  placeholder={elementConfigs[activeElementType].urduPlaceholder}
                  dir="rtl"
                  rows={2}
                  onKeyDown={handleDirectKeyDown}
                  className="w-full bg-transparent text-white px-3 pb-3 text-sm resize-none focus:outline-none placeholder-zinc-700 font-urdu text-right"
                  onBlur={e => {
                    if (e.target.value.trim()) {
                      handleAddDirect(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              )}
            </div>
            <p className="text-zinc-700 text-xs mt-1 text-center">
              {inputMode === 'roman' ? 'Enter دبائیں یا بٹن کلک کریں' : 'Enter دبائیں یا فوکس ہٹائیں'}
            </p>
          </div>

          {/* Script Elements List */}
          <div ref={editorRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 bg-zinc-950">
            {project.elements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-5xl mb-4">✍️</div>
                <p className="text-zinc-500 font-urdu text-lg mb-2">اسکرپٹ لکھنا شروع کریں</p>
                <p className="text-zinc-700 text-sm">اوپر سے عنصر منتخب کریں اور لکھنا شروع کریں</p>
              </div>
            ) : (
              project.elements.map((element, elemIdx) => (
                <div
                  key={element.id}
                  className={`group relative rounded-lg border-l-2 p-3 cursor-pointer transition-all ${
                    typeColors[element.type]
                  } ${selectedElementId === element.id ? 'ring-1 ring-yellow-400/50' : ''}`}
                  onClick={() => setSelectedElementId(element.id === selectedElementId ? null : element.id)}
                >
                  {/* Type badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); moveElement(element.id, 'up'); }}
                        disabled={elemIdx === 0}
                        className="text-zinc-600 hover:text-white disabled:opacity-20 p-0.5"
                      >▲</button>
                      <button
                        onClick={e => { e.stopPropagation(); moveElement(element.id, 'down'); }}
                        disabled={elemIdx === project.elements.length - 1}
                        className="text-zinc-600 hover:text-white disabled:opacity-20 p-0.5"
                      >▼</button>
                    </div>

                    {editingId === element.id ? (
                      <textarea
                        autoFocus
                        defaultValue={element.content}
                        dir="rtl"
                        className="flex-1 bg-zinc-900 text-white p-2 rounded text-sm font-urdu text-right resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400/50 w-full"
                        rows={3}
                        onBlur={e => {
                          updateElement(element.id, e.target.value);
                          setEditingId(null);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                    ) : (
                      <div
                        className={`flex-1 font-urdu text-right ${elementConfigs[element.type].style}`}
                        dir="rtl"
                        onDoubleClick={() => setEditingId(element.id)}
                      >
                        {element.content}
                      </div>
                    )}

                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); setEditingId(element.id); }}
                        className="text-zinc-500 hover:text-yellow-400 p-0.5 text-xs"
                        title="ترمیم"
                      >✏️</button>
                      <button
                        onClick={e => { e.stopPropagation(); duplicateElement(element); }}
                        className="text-zinc-500 hover:text-blue-400 p-0.5 text-xs"
                        title="نقل"
                      >📋</button>
                      <button
                        onClick={e => { e.stopPropagation(); deleteElement(element.id); }}
                        className="text-zinc-500 hover:text-red-400 p-0.5 text-xs"
                        title="حذف"
                      >🗑️</button>
                    </div>
                  </div>

                  {/* Type label */}
                  <div className="mt-1 flex justify-end">
                    <span className="text-zinc-700 text-xs">{elementConfigs[element.type].urduLabel}</span>
                  </div>
                </div>
              ))
            )}
            <div className="h-24" /> {/* Bottom padding */}
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l border-zinc-800 bg-zinc-950 overflow-y-auto p-6" dir="rtl">
            <div className="max-w-lg mx-auto">
              <h2 className="text-white font-urdu text-xl text-center mb-2 font-bold">
                {project.urduTitle || project.title}
              </h2>
              <p className="text-zinc-500 text-center text-sm font-urdu mb-6">{project.author}</p>
              <div className="border-t border-zinc-700 mb-6" />
              
              {project.elements.map((element) => {
                if (element.type === 'note') return null;
                return (
                  <div key={element.id} className="mb-3">
                    <p className={`font-urdu leading-loose ${elementConfigs[element.type].style}`} dir="rtl">
                      {element.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
