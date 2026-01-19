import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight,
  ChevronDown,
  User,
  Code,
  Image,
  BarChart3,
  Link,
  Briefcase,
  Sparkles,
  FileText,
  Layout,
  LayoutTemplate,
  Layers,
  PlusCircle,
  Award
} from 'lucide-react';
import { toolboxSections } from './templates';
import type { ToolboxProps } from './types';

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'LayoutTemplate': <LayoutTemplate className="w-4 h-4" />,
    'User': <User className="w-4 h-4" />,
    'Code': <Code className="w-4 h-4" />,
    'BarChart3': <BarChart3 className="w-4 h-4" />,
    'Link': <Link className="w-4 h-4" />,
    'Image': <Image className="w-4 h-4" />,
    'Layers': <Layers className="w-4 h-4" />,
    'PlusCircle': <PlusCircle className="w-4 h-4" />,
    'Award': <Award className="w-4 h-4" />,
    'Briefcase': <Briefcase className="w-4 h-4" />,
    'Sparkles': <Sparkles className="w-4 h-4" />,
    'FileText': <FileText className="w-4 h-4" />,
    'Layout': <Layout className="w-4 h-4" />,
  };
  return iconMap[iconName] || <FileText className="w-4 h-4" />;
};

// Convert toolboxSections to accordionData
const accordionData = toolboxSections.map(section => ({
  ...section,
  icon: getIcon(section.icon),
}));

export default function Toolbox({ onInsert }: ToolboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['templates']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    );
  };

  const filteredData = accordionData.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => 
    section.items.length > 0 || 
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#1f2125]">
      {/* Search Bar */}
      <div className="p-3 border-b border-[#30363d]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#27292d] border border-[#30363d] rounded-md text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>
      </div>

      {/* Accordion Menu */}
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          {filteredData.map((section) => (
            <div key={section.id} className="mb-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#27292d] rounded-md transition-colors"
              >
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                {section.icon}
                <span className="font-medium">{section.title}</span>
                <span className="ml-auto text-xs text-gray-600 bg-[#27292d] px-2 py-0.5 rounded">
                  {section.items.length}
                </span>
              </button>

              {/* Section Items */}
              {expandedSections.includes(section.id) && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {section.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => onInsert(item.content)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-[#30363d] rounded-md transition-colors text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#30363d]">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>README Generator</span>
          <span>v1.0</span>
        </div>
      </div>
    </div>
  );
}

// Re-export types
export type { ToolboxProps } from './types';
