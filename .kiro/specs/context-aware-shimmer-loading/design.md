# Context-Aware Shimmer Loading Design

## Overview

The context-aware shimmer loading system replaces generic loading indicators with structured placeholder content that matches the expected UI layout. This creates a more intuitive loading experience by showing users exactly what type of content is being loaded.

## Architecture

### Component Structure

```
components/ui/
├── skeleton/
│   ├── skeleton-base.tsx          # Core shimmer animation component
│   ├── skeleton-card.tsx          # Card layout skeletons
│   ├── skeleton-list.tsx          # List/table layout skeletons
│   ├── skeleton-form.tsx          # Form layout skeletons
│   ├── skeleton-profile.tsx       # Profile/user info skeletons
│   └── index.ts                   # Exports
```

### Design Patterns

1. **Compositional Design**: Each skeleton component is built from smaller, reusable skeleton elements
2. **Variant-Based System**: Different skeleton types for different content patterns
3. **Responsive Layout**: Skeletons adapt to different screen sizes
4. **Theme Integration**: Skeletons respect light/dark mode themes

## Components and Interfaces

### SkeletonBase Component

```typescript
interface SkeletonBaseProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animate?: boolean;
}
```

### SkeletonCard Component

```typescript
interface SkeletonCardProps {
  variant?: "default" | "compact" | "detailed";
  showImage?: boolean;
  showActions?: boolean;
  lines?: number;
  className?: string;
}
```

### SkeletonList Component

```typescript
interface SkeletonListProps {
  items?: number;
  variant?: "simple" | "detailed" | "table";
  showAvatar?: boolean;
  showActions?: boolean;
  className?: string;
}
```

### SkeletonForm Component

```typescript
interface SkeletonFormProps {
  fields?: number;
  showLabels?: boolean;
  showButtons?: boolean;
  variant?: "vertical" | "horizontal";
  className?: string;
}
```

### SkeletonProfile Component

```typescript
interface SkeletonProfileProps {
  variant?: "compact" | "detailed" | "card";
  showAvatar?: boolean;
  showStats?: boolean;
  showBio?: boolean;
  className?: string;
}
```

## Data Models

### Skeleton Configuration

```typescript
type SkeletonVariant = "card" | "list" | "form" | "profile" | "custom";

interface SkeletonConfig {
  variant: SkeletonVariant;
  count?: number;
  animate?: boolean;
  className?: string;
  customProps?: Record<string, any>;
}
```

### Animation Configuration

```typescript
interface ShimmerAnimation {
  duration: string;
  direction: "ltr" | "rtl";
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}
```

## Implementation Strategy

### 1. Core Shimmer Animation

- Use CSS-based animations for performance
- Implement gradient-based shimmer effect
- Support theme-aware color schemes
- Ensure smooth 60fps animations

### 2. Skeleton Variants

#### Card Skeletons

- **Default**: Image placeholder + title + description + actions
- **Compact**: Title + subtitle + small actions
- **Detailed**: Large image + multiple text lines + metadata + actions

#### List Skeletons

- **Simple**: Avatar + single line text
- **Detailed**: Avatar + title + subtitle + metadata
- **Table**: Multiple columns with varying widths

#### Form Skeletons

- **Vertical**: Stacked form fields with labels
- **Horizontal**: Side-by-side label and input pairs
- **Complex**: Mixed field types with sections

#### Profile Skeletons

- **Compact**: Small avatar + name + role
- **Detailed**: Large avatar + name + bio + stats
- **Card**: Profile card with background + avatar + info

### 3. Responsive Design

- Mobile-first approach
- Adaptive sizing based on container
- Flexible grid layouts
- Touch-friendly spacing

### 4. Performance Optimization

- CSS-only animations (no JavaScript)
- Minimal DOM manipulation
- Efficient re-renders
- Lazy loading for complex skeletons

## Error Handling

### Fallback Strategies

1. **Animation Failure**: Fall back to static placeholder
2. **Variant Not Found**: Use default skeleton variant
3. **Invalid Props**: Apply sensible defaults
4. **Performance Issues**: Disable animations on low-end devices

### Error Boundaries

- Wrap skeleton components in error boundaries
- Provide fallback to simple loading indicator
- Log errors for debugging

## Testing Strategy

### Unit Tests

- Component rendering with different props
- Animation behavior verification
- Responsive layout testing
- Theme integration testing

### Visual Regression Tests

- Screenshot comparisons for each variant
- Animation frame testing
- Cross-browser compatibility
- Dark/light mode consistency

### Performance Tests

- Animation frame rate monitoring
- Memory usage during long animations
- CPU usage optimization
- Bundle size impact

### Integration Tests

- Loading state transitions
- Real data replacement
- Multiple skeleton instances
- Accessibility compliance

## Accessibility Considerations

### ARIA Support

- `aria-busy="true"` during loading
- `aria-label` for screen readers
- `role="status"` for loading announcements

### Motion Preferences

- Respect `prefers-reduced-motion`
- Provide static alternatives
- Configurable animation settings

### Color Contrast

- Ensure sufficient contrast in all themes
- Support high contrast mode
- Avoid relying solely on color

## Integration Points

### Existing Loading System

- Replace current `<Loading />` components gradually
- Maintain backward compatibility
- Provide migration path

### Data Fetching Hooks

- Integrate with existing loading states
- Support React Query/SWR patterns
- Handle error states gracefully

### Theme System

- Use existing CSS custom properties
- Support dynamic theme switching
- Maintain design system consistency
