'use client';

import React from 'react';

export default function StatusBar({ language, code }) {
  const lineCount = code ? code.split('\n').length : 0;
  const charCount = code.length;
  const wordCount = code.trim() ? code.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <footer className="bg-[#111827] border-t border-slate-800 h-7 px-4 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 font-medium text-sky-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Backend Active
        </span>
        <span>Language: <strong className="text-slate-200 uppercase">{language}</strong></span>
        <span>Lines: <strong className="text-slate-200">{lineCount}</strong></span>
        <span>Words: <strong className="text-slate-200">{wordCount}</strong></span>
        <span>Chars: <strong className="text-slate-200">{charCount}</strong></span>
      </div>
      <div className="flex items-center gap-4">
        <span>Est. Reading Time: <strong className="text-slate-200">{readingTime} min</strong></span>
        <span className="text-slate-500 font-mono">UTF-8</span>
        <span className="text-slate-500 font-mono">Spaces: 4</span>
      </div>
    </footer>
  );
}