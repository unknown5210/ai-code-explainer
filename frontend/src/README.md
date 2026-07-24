# AI Code Explainer

A modern, VS Code–inspired code explainer built with Next.js (App Router), Monaco Editor, Tailwind CSS, and Framer Motion. Paste code, pick a language, and get a streamed, section-by-section AI explanation.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app expects your existing backend to be running at:

```
POST http://localhost:8000/api/explain
```

## Backend contract

**Request body**

```json
{
  "code": "def add(a, b):\n    return a + b",
  "language": "python"
}
```

**Response**: a `text/event-stream` (Server-Sent Events) response. Each event should look like one of:

```
data: {"text": "## 📖 Summary\n"}

data: {"text": "This function adds two numbers.\n"}
```

or plain-text chunks:

```
data: ## 📖 Summary

data: This function adds two numbers.
```

The frontend accumulates chunks in order and re-parses the running markdown after every update, splitting on `## ` headings into cards (Summary, Line-by-Line Explanation, Complexity, Suggestions, Concepts Used, Possible Bugs, Optimized Version). No specific heading set is required — any `## ` sections you stream will render as their own card, in order.

## Project structure

```
app/
  layout.jsx        Root layout, imports global styles
  page.jsx           Main page: state, SSE streaming, layout composition
components/
  Header.jsx          Logo, language dropdown, Explain/Clear actions
  CodeEditor.jsx       Monaco editor, upload, copy, paste
  OutputPanel.jsx      Explanation cards, empty & loading states
  LanguageDropdown.jsx Language selector
  FileUpload.jsx       File upload (.py .cpp .java .js .html .css .c)
  StatusBar.jsx        Bottom status bar (metrics + backend status)
  TypingAnimation.jsx  "AI is analyzing your code…" loader
  MarkdownRenderer.jsx Markdown + syntax-highlighted code blocks
hooks/
  useToast.jsx         Toast notification system
lib/
  parseExplanation.js  Splits streamed markdown into card sections
styles/
  globals.css          Theme tokens, glassmorphism, markdown styling
```

## Notes

- If the backend is unreachable, the status bar and output panel show an offline indicator and a toast explains what happened — the UI never fails silently.
- Reduced-motion preferences are respected throughout.
- All interactive elements are keyboard-reachable with visible focus states.
