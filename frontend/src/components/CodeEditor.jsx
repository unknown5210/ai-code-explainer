'use client';

import React from 'react';
import { FileCode } from 'lucide-react';

export default function CodeEditor({ code, setCode, language }) {
  const lineNumbersArray = Array.from({ length: code ? code.split('\n').length : 1 }, (_, i) => i + 1);

  return (
    <div className="lg:col-span-5 flex flex-col bg-[#111827] border-r border-slate-800 h-full overflow-hidden shadow-2xl">
      <div className="bg-[#1E293B]/60 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 backdrop-blur-md">
        <span className="text-slate-200 flex items-center gap-2 font-mono">
          <FileCode className="w-3.5 h-3.5 text-sky-400" /> editor.{language === 'python' ? 'py' : language === 'java' ? 'java' : language === 'html' ? 'html' : language === 'css' ? 'css' : 'js'}
        </span>
        <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
          Dark Theme Active
        </span>
      </div>

      <div className="flex-1 flex font-mono text-xs leading-6 overflow-hidden bg-[#111827]">
        <div className="w-12 py-4 bg-[#0F172A]/80 text-right pr-3 text-slate-500 select-none border-r border-slate-800/60 overflow-hidden shrink-0">
          {lineNumbersArray.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          placeholder="Paste or write your code here..."
          className="flex-1 p-4 bg-transparent text-[#F8FAFC] focus:outline-none resize-none leading-6 selection:bg-blue-500/30 overflow-auto whitespace-pre font-mono text-sm"
        />
      </div>
    </div>
  );
}