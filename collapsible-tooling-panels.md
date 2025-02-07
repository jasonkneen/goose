# Collapsible Tooling Panels Implementation Plan

## Current State Analysis
The tooling panels currently have partial collapsible functionality:
- Tool results (output) can be collapsed/expanded
- Long argument values can be collapsed/expanded
- The main tool call panel (input) is always expanded

## Implementation Plan

### 1. Component Modifications

#### ToolInvocation Component
```typescript
function ToolInvocation({ toolInvocation }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full">
      <Card>
        {/* Header with collapse button */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Box size={16} />
            <span className="ml-2 text-textStandard">
              {snakeToTitleCase(toolInvocation.toolName)}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-textStandard"
            aria-expanded={isExpanded}
          >
            <ChevronUp
              className={`h-5 w-5 transition-all origin-center ${
                !isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Collapsible content */}
        {isExpanded && (
          <>
            <ToolCall call={toolInvocation} />
            {toolInvocation.state === 'result' ? (
              <ToolResult result={toolInvocation} />
            ) : (
              <LoadingPlaceholder />
            )}
          </>
        )}
      </Card>
    </div>
  );
}
```

### 2. Features

- **Collapsible State**: Each tool panel maintains its own collapse state
- **Smooth Transitions**: Reuse existing transition classes for consistent animations
- **Accessibility**: Proper ARIA attributes for better screen reader support
- **Preserved Functionality**: Maintain existing collapsible features for arguments and results

### 3. UI/UX Considerations

- **Visual Consistency**: Use the same ChevronUp icon and animation style
- **Intuitive Interaction**: Click header or dedicated button to collapse/expand
- **State Persistence**: Panel state persists until user interaction
- **Visual Feedback**: Icon rotation indicates current state

### 4. Implementation Steps

1. Add collapse state to ToolInvocation component
2. Create collapsible header with expand/collapse button
3. Wrap existing content in conditional render
4. Add transition animations
5. Implement accessibility attributes
6. Test across different tool types and states

### 5. Benefits

- **Cleaner Interface**: Reduce visual clutter in chat
- **Better Navigation**: Easily collapse irrelevant or completed tool calls
- **Consistent UX**: Matches existing collapsible patterns
- **Improved Readability**: Focus on relevant content