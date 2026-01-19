import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import Toolbar from './Toolbar';
import LineNumbers from './LineNumbers';
import { useMarkdownActions } from './useMarkdownActions';
import type { EditorProps } from './types';

export default function Editor({ 
  value, 
  onChange, 
  onGitHubClick, 
  onInsertAtCursor,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo
}: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { insertMarkdown } = useMarkdownActions({
    textareaRef,
    value,
    onChange,
  });

  // Функция для вставки текста в позицию курсора
  const handleInsertAtCursor = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + '\n\n' + text);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + '\n\n' + text + '\n\n' + value.substring(end);
    
    onChange(newValue);

    // Устанавливаем курсор после вставленного текста
    setTimeout(() => {
      const newCursorPos = start + text.length + 4; // +4 для двух \n\n до и после
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [value, onChange]);

  // Экспортируем функцию вставки через prop
  useEffect(() => {
    if (onInsertAtCursor) {
      onInsertAtCursor(handleInsertAtCursor);
    }
  }, [onInsertAtCursor, handleInsertAtCursor]);

  // Синхронизация скролла между textarea, номерами строк и overlay
  const handleScroll = () => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    const overlay = overlayRef.current;

    if (textarea && lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
    if (textarea && overlay) {
      overlay.scrollTop = textarea.scrollTop;
      overlay.scrollLeft = textarea.scrollLeft;
    }
  };

  // Список реальных плейсхолдеров для редактирования
  const editablePlaceholders = [
    'Your Name',
    'Your Role',
    'Your Age',
    'Your Country',
    'Your Bio',
    'Your Degree',
    'Your University Name',
    'Your Certificate',
    'Institution Name',
    'Project Name',
    'New Technology',
    'Your Expertise',
    'Your Title',
    'Your Banner URL',
    'Your Location',
    'Your Tagline',
    'Your Tagline - What makes you unique?',
    'Your Passion Statement',
    'Your Email',
    'Type of Projects',
    'Area of Interest',
    'Fun Fact About You',
    'Your City, Country',
    'Your Job Title',
    'Your Company',
    'Interest 1',
    'Interest 2',
    'Interest 3',
    'Skill 1',
    'Skill 2',
    'Skill 3',
    'Technology 1',
    'Technology 2',
    'Hobby 1',
    'Hobby 2',
    'Hobby 3',
    'First Language',
    'Job Title',
    'Year',
    'Current Focus',
    'Year 1',
    'Year 2',
    'Year 3',
    'Current Year',
    'Your Bio - Tell your story',
    'Repository Name',
    'Repository Name 2',
    'Short Description',
    'Tech Stack',
    'Demo URL',
    'Repo URL',
    'Project Name 1',
    'Project Name 2',
    'Project Name 3',
    'Project 1 URL',
    'Project 2 URL',
    'Project 1 Screenshot URL',
    'Project 2 Screenshot URL',
    'Project 1 Name',
    'Project 2 Name',
    'Project 1 Description',
    'Project 2 Description',
    'Certification Name',
    'Issuing Organization',
    'Certification Name 2',
    'Certification Name 3',
    'Achievement Title',
    'Description',
    'Achievement Title 2',
    'Achievement Title 3',
    'Achievement Title 4',
    'Degree Name',
    'University/College Name',
    'Start Year',
    'End Year',
    'Your GPA',
    'Course 1',
    'Course 2',
    'Course 3',
    'Other Degree/Certificate',
    'Company Name',
    'Start Date',
    'End Date/Present',
    'Achievement or responsibility 1',
    'Achievement or responsibility 2',
    'Achievement or responsibility 3',
    'List of technologies used',
    'Previous Job Title',
    'Previous Company',
    'End Date',
    'Current Position',
    'Previous Position',
    'Position',
    'Your BuyMeACoffee URL',
    'Your PayPal URL',
    'Your Ko-fi URL',
    'Favorite Games',
    'Favorite Topics/Books',
    'Places Visited/Want to Visit',
    'Photography Style',
    'Favorite Genres/Artists',
    'Activities',
    'Interesting fact about you',
    'Something unique about your background',
    'Your goal or aspiration',
    'What you\'re looking for in collaboration',
    'Your Favorite Quote',
    'Author',
    'Your Instagram',
    'Your Website',
    'Your Spotify ID',
    'Demo URL',
    'Your Custom Text',
    'Another Line',
    'Third Line',
    'Your Text',
    'Your Value',
    'Color',
    'Icon Name',
  ];

  // Найти плейсхолдер под курсором
  const findPlaceholderAtPosition = useCallback((cursorPos: number): { start: number; end: number; text: string } | null => {
    // Ищем плейсхолдеры в квадратных скобках
    for (const placeholder of editablePlaceholders) {
      const searchText = `[${placeholder}]`;
      let index = 0;
      while ((index = value.indexOf(searchText, index)) !== -1) {
        const start = index;
        const end = index + searchText.length;
        if (cursorPos >= start && cursorPos <= end) {
          return { start, end, text: searchText };
        }
        index++;
      }
    }

    // Ищем YOUR_USERNAME и подобные
    const upperPlaceholders = ['YOUR_USERNAME', 'YOUR_PROFILE', 'YOUR_HANDLE'];
    for (const placeholder of upperPlaceholders) {
      let index = 0;
      while ((index = value.indexOf(placeholder, index)) !== -1) {
        const start = index;
        const end = index + placeholder.length;
        if (cursorPos >= start && cursorPos <= end) {
          return { start, end, text: placeholder };
        }
        index++;
      }
    }
    
    return null;
  }, [value]);

  // Обработчик клика на textarea - проверяем, не кликнули ли на GitHub плейсхолдер
  const handleClick = useCallback((e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Даем время на обновление позиции курсора
    setTimeout(() => {
      const cursorPos = textarea.selectionStart;
      const result = findPlaceholderAtPosition(cursorPos);

      if (result && textarea.selectionStart === textarea.selectionEnd) {
        // Проверяем, это GitHub-плейсхолдер?
        if (result.text === 'YOUR_USERNAME' || result.text === 'YOUR_PROFILE' || result.text === 'YOUR_HANDLE') {
          // Открываем модальное окно вместо выделения
          if (onGitHubClick) {
            onGitHubClick();
          }
        } else {
          // Обычный плейсхолдер - просто выделяем
          textarea.setSelectionRange(result.start, result.end);
        }
      }
    }, 0);
  }, [findPlaceholderAtPosition, onGitHubClick]);

  // Обработчик изменения текста
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  // Горячие клавиши
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          insertMarkdown('bold');
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('italic');
          break;
        case 'k':
          e.preventDefault();
          insertMarkdown('link');
          break;
      }
    }
  };

  // Создаем HTML с подсвеченными плейсхолдерами для overlay
  const highlightedContent = useMemo(() => {
    let result = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Подсвечиваем только конкретные плейсхолдеры
    editablePlaceholders.forEach(placeholder => {
      const regex = new RegExp(`\\[${placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, 'g');
      result = result.replace(regex, `<span class="placeholder-highlight">[${placeholder}]</span>`);
    });

    // Также подсвечиваем YOUR_USERNAME и подобные
    result = result.replace(/YOUR_USERNAME/g, '<span class="placeholder-highlight">YOUR_USERNAME</span>');
    result = result.replace(/YOUR_PROFILE/g, '<span class="placeholder-highlight">YOUR_PROFILE</span>');
    result = result.replace(/YOUR_HANDLE/g, '<span class="placeholder-highlight">YOUR_HANDLE</span>');
    
    return result + '\n';
  }, [value]);

  const lineCount = value.split('\n').length;

  return (
    <div className="h-full flex flex-col bg-[#27292d] relative">
      <Toolbar 
        onAction={insertMarkdown}
        onGitHubClick={onGitHubClick}
        onUndo={onUndo}
        onRedo={onRedo}
        onClear={onClear}
        canUndo={canUndo}
        canRedo={canRedo}
      />
        
        <div className="flex-1 flex overflow-hidden relative">
          <LineNumbers ref={lineNumbersRef} count={lineCount} />
          
          {/* Overlay для подсветки плейсхолдеров */}
          <div
            ref={overlayRef}
            className="absolute inset-0 p-4 pointer-events-none overflow-hidden whitespace-pre-wrap break-words"
            style={{
              left: '50px', // Ширина номеров строк
              lineHeight: '24px',
              fontSize: '14px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              color: 'transparent',
            }}
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            className="flex-1 p-4 bg-transparent text-gray-100 font-mono text-sm overflow-auto focus:outline-none resize-none relative z-10"
            style={{
              lineHeight: '24px',
              fontSize: '14px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              caretColor: '#60a5fa',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            spellCheck={false}
            placeholder="Start writing your README..."
          />
          
          <style dangerouslySetInnerHTML={{ __html: `
            textarea::-webkit-scrollbar {
              display: none;
            }
            .placeholder-highlight {
              background: rgba(88, 166, 255, 0.15);
              border-radius: 3px;
              color: #58a6ff;
            }
          ` }} />
        </div>

        <div className="px-4 py-2 flex items-center justify-end flex-shrink-0">
        <span className="text-xs text-gray-500">
          {value.length} characters
        </span>
      </div>
    </div>
  );
}

// Re-export types
export type { EditorProps } from './types';
