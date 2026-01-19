import React, { useCallback } from 'react';
import type { MarkdownAction, MarkdownInsertConfig } from './types';

const MARKDOWN_CONFIG: Record<MarkdownAction, MarkdownInsertConfig> = {
  bold: { before: '**', after: '**', placeholder: 'bold text' },
  italic: { before: '*', after: '*', placeholder: 'italic text' },
  strikethrough: { before: '~~', after: '~~', placeholder: 'strikethrough' },
  heading: { before: '## ', after: '', placeholder: 'Heading' },
  bulletList: { before: '- ', after: '', placeholder: 'List item' },
  numberedList: { before: '1. ', after: '', placeholder: 'List item' },
  link: { before: '[', after: '](url)', placeholder: 'link text' },
  image: { before: '![', after: '](image-url)', placeholder: 'alt text' },
  code: { before: '`', after: '`', placeholder: 'code' },
  codeBlock: { before: '```\n', after: '\n```', placeholder: 'code block' },
  table: { before: '\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', after: '', placeholder: '' },
  quote: { before: '> ', after: '', placeholder: 'quote' },
};

interface UseMarkdownActionsProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (value: string) => void;
}

export function useMarkdownActions({ textareaRef, value, onChange }: UseMarkdownActionsProps) {
  const insertMarkdown = useCallback((action: MarkdownAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const config = MARKDOWN_CONFIG[action];
    const { before, after, placeholder } = config;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // Если текст выделен - оборачиваем его
    // Если нет - вставляем placeholder
    const textToInsert = selectedText || placeholder;
    const newContent = `${before}${textToInsert}${after}`;

    // Собираем новый текст
    const newValue = value.substring(0, start) + newContent + value.substring(end);
    onChange(newValue);

    // Восстанавливаем фокус и устанавливаем курсор
    requestAnimationFrame(() => {
      textarea.focus();
      
      if (selectedText) {
        // Если был выделен текст - ставим курсор после вставленного блока
        const newCursorPos = start + newContent.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      } else {
        // Если текст не был выделен - выделяем placeholder для удобного редактирования
        const placeholderStart = start + before.length;
        const placeholderEnd = placeholderStart + placeholder.length;
        textarea.setSelectionRange(placeholderStart, placeholderEnd);
      }
    });
  }, [textareaRef, value, onChange]);

  return { insertMarkdown };
}
