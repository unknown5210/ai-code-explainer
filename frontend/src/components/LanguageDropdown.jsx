"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export const LANGUAGES = [
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "c", label: "C" },
  { id: "cpp", label: "C++" },
  { id: "csharp", label: "C#" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "php", label: "PHP" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "jsx", label: "React JSX" },
];

export default function LanguageDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = LANGUAGES.find((l) => l.id === value) ?? LANGUAGES[0];

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm font-medium text-ink hover:border-accent-light/40 border border-transparent transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-accent-light" />
        {current.label}
        <ChevronDown
          size={15}
          className={`text-ink/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 w-48 max-h-72 overflow-y-auto glass rounded-xl shadow-glass p-1 animate-fade-in"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.id}>
              <button
                type="button"
                role="option"
                aria-selected={lang.id === value}
                onClick={() => {
                  onChange(lang.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  lang.id === value
                    ? "bg-accent/20 text-accent-light"
                    : "text-ink/80 hover:bg-white/5"
                }`}
              >
                {lang.label}
                {lang.id === value && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
