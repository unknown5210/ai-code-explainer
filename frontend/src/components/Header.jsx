'use client';

import React from 'react';
import { Sparkles, Upload, Trash2, Layers, Code2 } from 'lucide-react';

export default function Header({ language, setLanguage, fileInputRef, handleFileUpload, clearCode, handleExplain, isLoading, isCodeEmpty }) {
  return (
    <header className="bg-[#111827] border-b border-slate-800 h-12 px-4 flex items-center justify-between text-xs shrink-0 shadow-lg overflow-hidden">
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
            CodeSense <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">AI v2.0</span>
          </span>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

        {/* Language Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#1E293B] border border-slate-700/60 rounded-lg px-2.5 py-1 shadow-inner shrink-0">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="python" className="bg-slate-900">Python</option>
            <option value="javascript" className="bg-slate-900">JavaScript</option>
            <option value="typescript" className="bg-slate-900">TypeScript</option>
            <option value="java" className="bg-slate-900">Java</option>
            <option value="c" className="bg-slate-900">C</option>
            <option value="cpp" className="bg-slate-900">C++</option>
            <option value="csharp" className="bg-slate-900">C#</option>
            <option value="go" className="bg-slate-900">Go</option>
            <option value="rust" className="bg-slate-900">Rust</option>
            <option value="php" className="bg-slate-900">PHP</option>
            <option value="html" className="bg-slate-900">HTML</option>
            <option value="css" className="bg-slate-900">CSS</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
          accept=".py,.cpp,.java,.js,.html,.css,.c,.ts,.go,.rs,.php"
        />
        <button 
          onClick={() => fileInputRef.current.click()}
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1E293B] hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Upload className="w-3.5 h-3.5 text-sky-400" /> Upload File
        </button>

        <button 
          onClick={clearCode}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1E293B] hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" /> Clear
        </button>

        <button
          onClick={handleExplain}
          disabled={isLoading || isCodeEmpty}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold text-xs px-4 py-1.5 rounded-lg shadow-md shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 cursor-pointer active:scale-95 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 fill-current" /> ✨ Explain Code
            </>
          )}
        </button>
      </div>
    </header>
  );
}