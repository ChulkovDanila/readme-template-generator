import React from 'react';
import {
  Heading1,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Braces,
  Table,
  Quote,
  Undo,
  Redo,
  Trash2,
} from 'lucide-react';
import type { MarkdownAction } from './types';

interface ToolbarProps {
  onAction: (action: MarkdownAction) => void;
  onGitHubClick?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

interface ToolbarButton {
  action: MarkdownAction;
  title: string;
  icon: React.ReactNode;
}

const TOOLBAR_BUTTONS: ToolbarButton[] = [
  { action: 'heading', title: 'Heading (## text)', icon: <Heading1 size={16} /> },
  { action: 'bold', title: 'Bold (**text**)', icon: <Bold size={16} /> },
  { action: 'italic', title: 'Italic (*text*)', icon: <Italic size={16} /> },
  { action: 'strikethrough', title: 'Strikethrough (~~text~~)', icon: <Strikethrough size={16} /> },
];

const LIST_BUTTONS: ToolbarButton[] = [
  { action: 'bulletList', title: 'Bullet list (- item)', icon: <List size={16} /> },
  { action: 'numberedList', title: 'Numbered list (1. item)', icon: <ListOrdered size={16} /> },
];

const INSERT_BUTTONS: ToolbarButton[] = [
  { action: 'link', title: 'Link ([text](url))', icon: <Link size={16} /> },
  { action: 'image', title: 'Image (![alt](url))', icon: <Image size={16} /> },
  { action: 'code', title: 'Inline code (`code`)', icon: <Code size={16} /> },
  { action: 'codeBlock', title: 'Code block (```code```)', icon: <Braces size={16} /> },
  { action: 'table', title: 'Table', icon: <Table size={16} /> },
  { action: 'quote', title: 'Quote (> text)', icon: <Quote size={16} /> },
];

const ToolbarButtonComponent: React.FC<{
  button: ToolbarButton;
  onClick: () => void;
}> = ({ button, onClick }) => (
  <button
    onClick={onClick}
    className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-white transition-colors"
    title={button.title}
  >
    {button.icon}
  </button>
);

const ButtonGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-[#1a1c1f] rounded flex items-center border border-[#30363d]">
    {children}
  </div>
);

export default function Toolbar({ onAction, onGitHubClick, onUndo, onRedo, onClear, canUndo = true, canRedo = true }: ToolbarProps) {
  return (
    <div className="px-3 bg-[#1f2125] flex items-center gap-2 flex-shrink-0 border-b border-[#30363d]" style={{ height: '49px' }}>
      {/* History Actions */}
      <ButtonGroup>
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
        >
          <Redo size={16} />
        </button>
        <button
          onClick={onClear}
          className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-red-400 transition-colors"
          title="Clear All"
        >
          <Trash2 size={16} />
        </button>
      </ButtonGroup>

      <ButtonGroup>
        {TOOLBAR_BUTTONS.map((button) => (
          <ToolbarButtonComponent
            key={button.action}
            button={button}
            onClick={() => onAction(button.action)}
          />
        ))}
      </ButtonGroup>
      
      <ButtonGroup>
        {LIST_BUTTONS.map((button) => (
          <ToolbarButtonComponent
            key={button.action}
            button={button}
            onClick={() => onAction(button.action)}
          />
        ))}
      </ButtonGroup>
      
      <ButtonGroup>
        {INSERT_BUTTONS.map((button) => (
          <ToolbarButtonComponent
            key={button.action}
            button={button}
            onClick={() => onAction(button.action)}
          />
        ))}
      </ButtonGroup>

      {onGitHubClick && (
        <ButtonGroup>
          <button
            onClick={onGitHubClick}
            className="p-2 hover:bg-[#30363d] rounded text-gray-400 hover:text-white transition-colors"
            title="GitHub Settings"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </button>
        </ButtonGroup>
      )}
    </div>
  );
}
