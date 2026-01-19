export interface ToolboxProps {
  onInsert: (text: string) => void;
  markdown: string;
}

export interface Template {
  name: string;
  icon: string;
  content: string;
}

export interface ToolboxItem {
  name: string;
  content: string;
}

export interface ToolboxSection {
  id: string;
  icon: string;
  title: string;
  items: ToolboxItem[];
}
