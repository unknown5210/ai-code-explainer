"use client";

import { useRef } from "react";
import { FolderOpen } from "lucide-react";

const ACCEPTED_EXTENSIONS = [".py", ".cpp", ".java", ".js", ".html", ".css", ".c"];

const EXT_TO_LANGUAGE = {
  ".py": "python",
  ".cpp": "cpp",
  ".java": "java",
  ".js": "javascript",
  ".html": "html",
  ".css": "css",
  ".c": "c",
};

export default function FileUpload({ onFileLoaded, onError }) {
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file) return;
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      onError?.(
        `Unsupported file type "${ext}". Accepted: ${ACCEPTED_EXTENSIONS.join(", ")}`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onFileLoaded({
        content: String(reader.result ?? ""),
        language: EXT_TO_LANGUAGE[ext],
        fileName: file.name,
      });
    };
    reader.onerror = () => onError?.("Could not read that file. Please try again.");
    reader.readAsText(file);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        title="Upload a code file"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium glass text-ink/80 hover:text-ink hover:border-accent-light/40 border border-transparent transition-colors"
      >
        <FolderOpen size={15} />
        <span className="hidden sm:inline">Upload File</span>
      </button>
    </>
  );
}
