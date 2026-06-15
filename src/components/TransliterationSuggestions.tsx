import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getAlternatives } from '../utils/romanToUrdu';

interface TransliterationSuggestionsProps {
  word: string;
  urduText: string;
  onSelect: (selected: string) => void;
}

export default function TransliterationSuggestions({
  word,
  urduText,
  onSelect,
}: TransliterationSuggestionsProps) {
  const [showOptions, setShowOptions] = useState(false);
  const alternatives = getAlternatives(word);

  if (alternatives.length <= 1) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-900 text-xs font-medium hover:bg-yellow-200 transition-colors relative group"
        title="Click to see alternative transliterations"
      >
        {urduText}
        <ChevronDown size={12} className={showOptions ? "rotate-180" : ""} />
      </button>

      {showOptions && (
        <div
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
          className="absolute top-full left-0 mt-1 bg-white border border-yellow-300 rounded-lg shadow-lg z-50 min-w-max"
        >
          {alternatives.map((alt, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(alt);
                setShowOptions(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 transition-colors font-urdu ${
                idx === 0 ? 'border-b border-yellow-200' : ''
              }`}
            >
              {alt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
