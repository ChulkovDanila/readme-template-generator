import React, { useState } from "react";
import type { Route } from "./+types/home";
import Editor from "../components/Editor/index";
import Preview from "../components/Preview/index";
import Toolbox from "../components/Toolbox/index";
import GitHubModal from "../components/Editor/GitHubModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GitHub README Generator" },
    { name: "description", content: "Create the perfect README for your GitHub profile" },
  ];
}

const DEFAULT_MARKDOWN = `<div align="center">


<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&pause=1000&color=58A6FF&center=true&vCenter=true&width=500&lines=Hi+there!+I'm+[Your+Name];Welcome+to+my+GitHub" alt="Typing SVG" />
</h1>

<img src="https://dotnetcopilot.com/wp-content/uploads/2021/07/github.png" alt="Banner" width="100%" />

<div align="center">

<div align="center">

## 🎓 Education

**[Your Degree]** - [Your University Name]

**[Your Certificate]** - [Institution Name]

</div>

## 💻 Tech Stack

<!-- Frontend -->
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

<!-- CSS Frameworks -->
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

<!-- Backend -->
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)

<!-- Databases -->
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

<!-- DevOps -->
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

<!-- Tools -->
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

</div>


## 📊 My stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=dark&hide_border=true)![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&layout=compact&theme=dark&hide_border=true)





<div align="center">

## 📫 Connect With Me

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_PROFILE)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/YOUR_HANDLE)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

</div>




`;

export default function Home() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [leftWidth, setLeftWidth] = useState(320); // Toolbox width
  const [middleWidth, setMiddleWidth] = useState(50); // Editor width in percentage
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const insertAtCursorRef = React.useRef<((text: string) => void) | null>(null);
  
  // History management for undo/redo
  const [history, setHistory] = useState<string[]>([DEFAULT_MARKDOWN]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Saved GitHub data
  const [savedGithubUsername, setSavedGithubUsername] = useState('');
  const [savedLinkedinProfile, setSavedLinkedinProfile] = useState('');
  const [savedTwitterHandle, setSavedTwitterHandle] = useState('');

  const handleInsert = (text: string) => {
    // Автоматически заменяем плейсхолдеры на сохраненные значения
    let processedText = text;
    
    if (savedGithubUsername) {
      processedText = processedText.replace(/YOUR_USERNAME/g, savedGithubUsername);
    }
    
    if (savedLinkedinProfile) {
      processedText = processedText.replace(/YOUR_PROFILE/g, savedLinkedinProfile);
    }
    
    if (savedTwitterHandle) {
      processedText = processedText.replace(/YOUR_HANDLE/g, savedTwitterHandle);
    }
    
    // Если есть функция вставки в курсор - используем её
    if (insertAtCursorRef.current) {
      insertAtCursorRef.current(processedText);
    } else {
      // Fallback - вставляем в конец
      setMarkdown(prev => prev + "\n\n" + processedText);
    }
  };

  const handleInsertAtCursorSet = (fn: (text: string) => void) => {
    insertAtCursorRef.current = fn;
  };

  // Update markdown with history tracking
  const updateMarkdownWithHistory = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newMarkdown]);
    setHistoryIndex(prev => prev + 1);
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  // Clear all
  const handleClear = () => {
    if (confirm('Are you sure you want to clear all content?')) {
      updateMarkdownWithHistory('');
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert("✅ Copied to clipboard!");
    } catch (err) {
      console.error("Copy error:", err);
      alert("❌ Failed to copy");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "README.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("❌ Failed to download file");
    }
  };

  const handleGitHubSave = (username: string, profile: string, handle: string) => {
    // Сохраняем значения для будущих вставок
    setSavedGithubUsername(username);
    if (profile) {
      setSavedLinkedinProfile(profile);
    }
    if (handle) {
      setSavedTwitterHandle(handle);
    }
    
    let newMarkdown = markdown;
    // Всегда заменяем YOUR_USERNAME
    newMarkdown = newMarkdown.replace(/YOUR_USERNAME/g, username);
    // Заменяем YOUR_PROFILE только если указан LinkedIn profile
    if (profile) {
      newMarkdown = newMarkdown.replace(/YOUR_PROFILE/g, profile);
    }
    // Заменяем YOUR_HANDLE только если указан Twitter handle
    if (handle) {
      newMarkdown = newMarkdown.replace(/YOUR_HANDLE/g, handle);
    }
    updateMarkdownWithHistory(newMarkdown);
  };

  // Handle left resizer drag (Toolbox)
  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleLeftMouseMove = (e: MouseEvent) => {
    if (isDraggingLeft) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 500) {
        setLeftWidth(newWidth);
      }
    }
  };

  const handleLeftMouseUp = () => {
    setIsDraggingLeft(false);
  };

  // Handle right resizer drag (between Editor and Preview)
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleRightMouseMove = (e: MouseEvent) => {
    if (isDraggingRight) {
      const containerWidth = window.innerWidth - leftWidth;
      const newMiddleWidth = ((e.clientX - leftWidth) / containerWidth) * 100;
      if (newMiddleWidth >= 20 && newMiddleWidth <= 80) {
        setMiddleWidth(newMiddleWidth);
      }
    }
  };

  const handleRightMouseUp = () => {
    setIsDraggingRight(false);
  };

  // Add and remove event listeners
  React.useEffect(() => {
    if (isDraggingLeft) {
      window.addEventListener("mousemove", handleLeftMouseMove);
      window.addEventListener("mouseup", handleLeftMouseUp);
    } else {
      window.removeEventListener("mousemove", handleLeftMouseMove);
      window.removeEventListener("mouseup", handleLeftMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleLeftMouseMove);
      window.removeEventListener("mouseup", handleLeftMouseUp);
    };
  }, [isDraggingLeft]);

  React.useEffect(() => {
    if (isDraggingRight) {
      window.addEventListener("mousemove", handleRightMouseMove);
      window.addEventListener("mouseup", handleRightMouseUp);
    } else {
      window.removeEventListener("mousemove", handleRightMouseMove);
      window.removeEventListener("mouseup", handleRightMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleRightMouseMove);
      window.removeEventListener("mouseup", handleRightMouseUp);
    };
  }, [isDraggingRight, leftWidth]);

      return (
        <div className="h-screen flex flex-col bg-[#1f2125] overflow-hidden">
          {/* Header */}
          <header className="bg-[#1f2125] border-b border-[#30363d] px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                GitHub README Generator
              </h1>
              <p className="text-sm text-gray-400">
                Create the perfect README for your profile
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden" style={{ userSelect: isDraggingLeft || isDraggingRight ? 'none' : 'auto' }}>
        {/* Toolbox - Left Sidebar */}
        <div style={{ width: `${leftWidth}px`, flexShrink: 0 }}>
          <Toolbox
            onInsert={handleInsert}
            markdown={markdown}
          />
        </div>

            {/* Left Resizer */}
            <div
              className="w-px bg-[#30363d] hover:bg-gray-500 cursor-col-resize transition-colors relative group"
              onMouseDown={handleLeftMouseDown}
            >
              <div className="absolute inset-0 w-2 -mx-1" />
            </div>

        {/* Editor and Preview - Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor */}
              <div style={{ width: `${middleWidth}%`, flexShrink: 0 }}>
                <Editor
                  value={markdown}
                  onChange={updateMarkdownWithHistory}
                  onGitHubClick={() => setIsGitHubModalOpen(true)}
                  onInsertAtCursor={handleInsertAtCursorSet}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  onClear={handleClear}
                  canUndo={canUndo}
                  canRedo={canRedo}
                />
              </div>

              {/* Right Resizer */}
              <div
                className="w-px bg-[#30363d] hover:bg-gray-500 cursor-col-resize transition-colors relative group"
                onMouseDown={handleRightMouseDown}
                style={{ marginTop: '49px' }}
              >
                <div className="absolute inset-0 w-2 -mx-1" />
              </div>

          {/* Preview */}
          <div className="flex-1">
            <Preview 
              markdown={markdown}
              onCopy={handleCopy}
              onDownload={handleDownload}
            />
          </div>
            </div>
          </div>

          {/* GitHub Settings Modal */}
          <GitHubModal
            isOpen={isGitHubModalOpen}
            onClose={() => setIsGitHubModalOpen(false)}
            onSave={handleGitHubSave}
          />
        </div>
      );
    }
