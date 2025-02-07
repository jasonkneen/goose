# Panel Spacing Adjustments Plan

## Current Analysis
The ToolInvocations component currently uses:
- Full width containers (`w-full`)
- Standard padding (`p-4`, `px-4`, `pb-4`)
- Default text sizes
- Standard margins and spacing
- Flexible content areas with markdown and image support

## Proposed Changes

### Width Adjustments
1. Change `w-full` to `max-w-[75%]` on the main container
2. Add `mx-auto` to center the narrower container
3. Reduce horizontal padding from `p-4` to `p-2` or `p-3`

### Height/Vertical Space Reductions
1. Reduce vertical padding in header:
   - Change `p-4` to `py-2 px-3`
2. Tighten content spacing:
   - Adjust `pb-4` to `pb-2`
   - Reduce margin in divider (`my-[10px]` to `my-[6px]`)
3. Adjust markdown content spacing:
   - Modify `p-2` to `p-1.5`

### Typography Adjustments
1. Reduce text sizes while maintaining hierarchy:
   - Tool name: Add `text-sm`
   - Output label: Keep `text-sm`
2. Adjust line heights:
   - Add `leading-tight` where appropriate
   - Use `leading-snug` for markdown content

### Component-Specific Changes
1. Header section:
   - Reduce icon sizes (`h-5 w-5` to `h-4 w-4`)
   - Tighter spacing between icon and text
2. Content section:
   - More compact argument display
   - Tighter spacing in markdown content
   - Maintain image scaling with `max-w-full`

### Functionality Preservation
- Maintain all collapse/expand functionality
- Keep all interactive elements accessible
- Preserve image display and scaling
- Ensure markdown content remains readable

## Implementation Steps
1. Modify container widths and centering
2. Update padding and margins
3. Adjust typography and line heights
4. Fine-tune component-specific spacing
5. Test all interactive features
6. Verify content readability
7. Ensure responsive behavior

## Next Steps
Switch to Code mode to implement these changes in the ToolInvocations.tsx component.