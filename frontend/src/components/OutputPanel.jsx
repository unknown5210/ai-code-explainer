'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Cpu } from 'lucide-react';

export default function OutputPanel({ explanation, isLoading }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-7 flex flex-col bg-[#1E293B] h-full overflow-hidden shadow-2xl">
      <div className="bg-[#111827]/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 backdrop-blur-md">
        <span className="text-slate-200 flex items-center gap-2 font-semibold">
          <Cpu className="w-3.5 h-3.5 text-sky-400" /> AI Insights Breakdown & Markdown Output
        </span>
        {explanation && (
          <button
            onClick={() => copyToClipboard(explanation)}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-[#1E293B] hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded transition cursor-pointer shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : '📋 Copy'}
          </button>
        )}
      </div>

      <div className="flex-1 p-6 overflow-y-auto text-sm leading-relaxed text-[#F8FAFC] font-sans selection:bg-blue-500/30">
        {!explanation && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 shadow-xl shadow-blue-500/5">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">🤖 AI Code Explainer Ready</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Paste your code on the left and click <span className="text-sky-400 font-medium">✨ Explain Code</span> to generate comprehensive line-by-line intelligence, complexity analysis, and optimizations.
            </p>
          </div>
        )}

        {isLoading && !explanation && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">AI is analyzing your code...</p>
              <p className="text-xs text-slate-400">Parsing syntax tree, complexity metrics, and potential bugs.</p>
            </div>
          </div>
        )}

        {explanation && (
          <div className="prose prose-invert max-w-none space-y-4 text-xs sm:text-sm leading-relaxed bg-[#111827]/40 border border-slate-700/60 p-5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="whitespace-pre-wrap font-sans text-slate-200">
              {explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}