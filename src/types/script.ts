export interface ScriptElement {
  id: string;
  type: 'scene-heading' | 'action' | 'character' | 'dialogue' | 'parenthetical' | 'transition' | 'shot' | 'note';
  content: string;
  urduContent?: string;
}

export interface ScriptProject {
  id: string;
  title: string;
  urduTitle: string;
  author: string;
  type: string;
  genre: string;
  language: 'urdu' | 'roman';
  createdAt: string;
  updatedAt: string;
  elements: ScriptElement[];
  scriptText: string;
  wordCount: number;
  pageCount: number;
}

export type ElementType = ScriptElement['type'];

export interface ElementConfig {
  label: string;
  urduLabel: string;
  placeholder: string;
  urduPlaceholder: string;
  style: string;
  shortcut: string;
}

export const elementConfigs: Record<ElementType, ElementConfig> = {
  'scene-heading': {
    label: 'Scene Heading',
    urduLabel: 'منظر کا عنوان',
    placeholder: 'INT. LOCATION - DAY / EXT. LOCATION - NIGHT',
    urduPlaceholder: 'اندرونی / مقام - دن',
    style: 'text-yellow-400 font-bold uppercase tracking-widest text-sm border-b border-yellow-400/30 pb-1',
    shortcut: '1',
  },
  'action': {
    label: 'Action / Description',
    urduLabel: 'عمل / تفصیل',
    placeholder: 'Describe what we see on screen...',
    urduPlaceholder: 'پردے پر کیا نظر آتا ہے...',
    style: 'text-gray-200 text-sm leading-relaxed',
    shortcut: '2',
  },
  'character': {
    label: 'Character Name',
    urduLabel: 'کردار کا نام',
    placeholder: 'CHARACTER NAME',
    urduPlaceholder: 'کردار کا نام',
    style: 'text-amber-300 font-bold text-center uppercase tracking-wider text-sm',
    shortcut: '3',
  },
  'dialogue': {
    label: 'Dialogue',
    urduLabel: 'مکالمہ',
    placeholder: 'Character speaks...',
    urduPlaceholder: 'کردار بولتا ہے...',
    style: 'text-white text-sm leading-relaxed',
    shortcut: '4',
  },
  'parenthetical': {
    label: 'Parenthetical',
    urduLabel: 'قوسین',
    placeholder: '(softly) / (angrily)',
    urduPlaceholder: '(دھیمے سے) / (غصے سے)',
    style: 'text-gray-400 italic text-sm text-center',
    shortcut: '5',
  },
  'transition': {
    label: 'Transition',
    urduLabel: 'منتقلی',
    placeholder: 'CUT TO: / FADE OUT / DISSOLVE TO:',
    urduPlaceholder: 'کٹ ٹو: / فیڈ آؤٹ',
    style: 'text-purple-400 font-semibold uppercase text-right text-sm tracking-wider',
    shortcut: '6',
  },
  'shot': {
    label: 'Shot Description',
    urduLabel: 'شاٹ',
    placeholder: 'CLOSE UP / WIDE SHOT / POV',
    urduPlaceholder: 'کلوز اپ / وائڈ شاٹ',
    style: 'text-cyan-400 font-semibold uppercase text-sm tracking-wide',
    shortcut: '7',
  },
  'note': {
    label: 'Writer\'s Note',
    urduLabel: 'مصنف کا نوٹ',
    placeholder: 'Private note (not in final script)...',
    urduPlaceholder: 'ذاتی نوٹ (حتمی اسکرپٹ میں شامل نہیں)...',
    style: 'text-green-400 italic text-xs border border-green-400/20 rounded p-2 bg-green-400/5',
    shortcut: '8',
  },
};
