import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Copy, Download } from 'lucide-react';
import { createMarkdownComponents, previewStyles } from './MarkdownComponents';
import type { PreviewProps } from './types';

export default function Preview({ markdown, onCopy, onDownload }: PreviewProps) {
  // Простая функция для getSourcePos (больше не используется для подсветки)
  const getSourcePos = () => undefined;

  // Мемоизируем компоненты для предотвращения пересоздания
  const components = useMemo(
    () => createMarkdownComponents(getSourcePos),
    []
  );

  return (
    <div className="h-full flex flex-col bg-[#1f2125]">
      {/* Action Toolbar */}
      <div className="px-3 bg-[#1f2125] flex items-center justify-between flex-shrink-0 border-b border-[#30363d]" style={{ height: '49px' }}>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#1a1c1f] rounded flex items-center border border-[#30363d]">
            <button
              onClick={onCopy}
              className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-white transition-colors"
              title="Copy to Clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={onDownload}
              className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-white transition-colors"
              title="Download README.md"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="flex-1 overflow-auto p-6"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .flex-1.overflow-auto::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        ` }} />
        <div
          className="preview-content max-w-4xl mx-auto"
          style={{ wordBreak: 'break-word', lineHeight: '1.6' }}
        >
          <style dangerouslySetInnerHTML={{ __html: previewStyles }} />
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            skipHtml={false}
            components={components}
          >
            {markdown || '*Preview will appear here...*'}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

// Re-export types
export type { PreviewProps } from './types';
