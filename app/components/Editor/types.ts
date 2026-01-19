export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onGitHubClick?: () => void;
  onInsertAtCursor?: (text: string) => void;
  onClear?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export interface ToolbarProps {
  onAction: (action: MarkdownAction) => void;
}

export type MarkdownAction =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'heading'
  | 'bulletList'
  | 'numberedList'
  | 'link'
  | 'image'
  | 'code'
  | 'codeBlock'
  | 'table'
  | 'quote';

export interface MarkdownInsertConfig {
  before: string;
  after: string;
  placeholder: string;
}
