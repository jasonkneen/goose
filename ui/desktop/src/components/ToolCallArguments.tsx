import { ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import MarkdownContent from './MarkdownContent';

interface ToolCallArgumentsProps {
  args: Record<string, any>;
}

export function ToolCallArguments({ args }: ToolCallArgumentsProps) {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const toggleKey = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderValue = (key: string, value: any) => {
    if (typeof value === 'string') {
      const needsExpansion = value.length > 60;
      const isExpanded = expandedKeys[key];

      if (!needsExpansion) {
        return (
          <div className="mb-1">
            <div className="flex flex-row items-start">
              <span className="text-sm font-medium text-textSubtle min-w-[140px] pt-0.5">
                {key}
              </span>
              <span className="text-sm text-textStandard font-mono">{value}</span>
            </div>
          </div>
        );
      }

      return (
        <div className="mb-1">
          <div className="flex flex-row">
            <span className="text-sm font-medium text-textSubtle min-w-[140px]">{key}</span>
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <span className="text-sm text-textStandard font-mono mr-2">
                  {isExpanded ? value : value.slice(0, 60) + '...'}
                </span>
                <button
                  onClick={() => toggleKey(key)}
                  className="text-sm hover:opacity-75 text-textStandard"
                  title={isExpanded ? 'Show less' : 'Show more'}
                >
                  <ChevronUp
                    className={`h-5 w-5 transition-all origin-center ${!isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Handle non-string values (arrays, objects, etc.)
    const content = Array.isArray(value)
      ? value.map((item, index) => `${index + 1}. ${JSON.stringify(item)}`).join('\n')
      : typeof value === 'object' && value !== null
        ? JSON.stringify(value, null, 2)
        : String(value);

    return (
      <div className="mb-1">
        <div className="flex flex-row items-start">
          <span className="text-sm font-medium text-textSubtle min-w-[140px] pt-0.5">{key}</span>
          <pre className="text-sm text-textStandard font-mono whitespace-pre-wrap">{content}</pre>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {Object.entries(args).map(([key, value]) => (
        <div key={key}>{renderValue(key, value)}</div>
      ))}
    </div>
  );
}
