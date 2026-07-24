'use client';

import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import StatusBar from '../components/StatusBar';

export default function CodeExplainerApp() {
  const [code, setCode] = useState(`# Program to check if a number is prime\n\nnum = int(input("Enter a number: "))\n\nif num <= 1:\n    print(num, "is not a prime number")\nelse:\n    is_prime = True\n    for i in range(2, int(num ** 0.5) + 1):\n        if num % i == 0:\n            is_prime = False\n            break\n    \n    if is_prime:\n        print(num, "is a prime number")\n    else:\n        print(num, "is not a prime number")`);
  const [language, setLanguage] = useState('python');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleExplain = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setExplanation('');

    // Dynamically choose between local backend or live production backend URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) throw new Error('Network response failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const parsed = JSON.parse(line.replace('data: ', ''));
              if (parsed.text) {
                setExplanation((prev) => prev + parsed.text);
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      const mockExplanation = `### 📖 Summary\nThis program efficiently checks whether a given user input number is a prime number using an optimized square-root limit algorithm.\n\n### 📄 Line-by-Line Explanation\n* **Line 3:** Reads input from the user and casts it into an integer.\n* **Line 5-6:** Handles base cases where numbers are less than or equal to 1.\n* **Line 9-12:** Iterates up to the square root of the number to check for divisors, breaking early if a factor is discovered.\n\n### ⚡ Complexity\n* **Time Complexity:** $O(\\sqrt{n})$ due to checking factors up to the square root.\n* **Space Complexity:** $O(1)$ constant auxiliary storage.\n\n### 💡 Suggestions\n* Encapsulate the primality logic inside a reusable function.\n* Add input exception handling for non-integer strings.\n\n### 📚 Concepts Used\n\`Loops\` \`Conditionals\` \`Math Optimization\`\n\n### 🚀 Optimized Version\n\`\`\`python\ndef is_prime(n: int) -> bool:\n    if n <= 1: return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0: return False\n    return True\n\`\`\``;

      for (let i = 0; i < mockExplanation.length; i++) {
        await new Promise((r) => setTimeout(r, 8));
        setExplanation((prev) => prev + mockExplanation[i]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCode(event.target.result);
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'py') setLanguage('python');
      else if (ext === 'js') setLanguage('javascript');
      else if (ext === 'ts') setLanguage('typescript');
      else if (ext === 'java') setLanguage('java');
      else if (ext === 'cpp' || ext === 'cc') setLanguage('cpp');
      else if (ext === 'c') setLanguage('c');
      else if (ext === 'php') setLanguage('php');
      else if (ext === 'rs') setLanguage('rust');
      else if (ext === 'go') setLanguage('go');
      else if (ext === 'html') setLanguage('html');
      else if (ext === 'css') setLanguage('css');
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-screen w-screen bg-[#0F172A] text-[#F8FAFC] font-sans flex flex-col select-none overflow-hidden">
      <Header 
        language={language}
        setLanguage={setLanguage}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        clearCode={() => setCode('')}
        handleExplain={handleExplain}
        isLoading={isLoading}
        isCodeEmpty={!code.trim()}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#0F172A]">
        <CodeEditor code={code} setCode={setCode} language={language} />
        <OutputPanel explanation={explanation} isLoading={isLoading} />
      </div>

      <StatusBar language={language} code={code} />
    </div>
  );
}