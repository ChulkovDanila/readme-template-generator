import React, { forwardRef } from 'react';

interface LineNumbersProps {
  count: number;
}

const LineNumbers = forwardRef<HTMLDivElement, LineNumbersProps>(
  ({ count }, ref) => {
    const lines = Array.from({ length: count }, (_, i) => i + 1);

    return (
      <div
        ref={ref}
        className="py-4 px-2 bg-[#27292d] overflow-hidden select-none flex-shrink-0"
        style={{ minWidth: '50px', textAlign: 'right' }}
      >
        {lines.map((num) => (
          <div
            key={num}
            className="text-gray-600 font-mono text-sm"
            style={{ height: '24px', lineHeight: '24px' }}
          >
            {num}
          </div>
        ))}
      </div>
    );
  }
);

LineNumbers.displayName = 'LineNumbers';

export default LineNumbers;
