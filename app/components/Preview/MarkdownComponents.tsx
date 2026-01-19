import React from 'react';

type GetSourcePos = (node: any) => string | undefined;

export const createMarkdownComponents = (getSourcePos: GetSourcePos) => ({
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
      {children}
    </h1>
  ),

  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold mb-3 mt-8 text-white border-b border-gray-700 pb-2">
      {children}
    </h2>
  ),

  h3: ({ children }: any) => (
    <h3 className="text-2xl font-bold mb-2 mt-6 text-white">
      {children}
    </h3>
  ),

  p: ({ children }: any) => (
    <p className="mb-4 text-gray-300 leading-relaxed">
      {children}
    </p>
  ),

  strong: ({ children }: any) => <strong>{children}</strong>,

  em: ({ children }: any) => <em>{children}</em>,

  div: ({ children, ...props }: any) => (
    <div {...props} style={{ textAlign: props.align || 'left' }}>
      {children}
    </div>
  ),

  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">
      {children}
    </ul>
  ),

  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2">
      {children}
    </ol>
  ),

  li: ({ children }: any) => (
    <li className="ml-4">{children}</li>
  ),

  code: ({ className, children }: any) => {
    const isInline = !className;
    return isInline ? (
      <code className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ) : (
      <code className="block bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto font-mono text-sm">
        {children}
      </code>
    );
  },

  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
      {children}
    </blockquote>
  ),

  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-blue-400 hover:text-blue-300 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  img: ({ ...props }: any) => (
    <img
      {...props}
      className="inline-block max-w-full h-auto align-middle"
      style={{ margin: '4px 2px', verticalAlign: 'middle' }}
    />
  ),

  table: ({ children }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-700">{children}</table>
    </div>
  ),

  th: ({ children }: any) => (
    <th className="border border-gray-700 px-4 py-2 bg-gray-800 text-white font-semibold text-left">
      {children}
    </th>
  ),

  td: ({ children }: any) => (
    <td className="border border-gray-700 px-4 py-2 text-gray-300">
      {children}
    </td>
  ),
});

// Стили для изображений
export const previewStyles = `
  .preview-content img {
    display: inline-block !important;
    vertical-align: middle !important;
    margin: 4px 2px !important;
    max-width: 100% !important;
    height: auto !important;
  }
  .preview-content p img,
  .preview-content div img {
    display: inline-block !important;
  }
`;
