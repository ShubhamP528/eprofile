# Implementation Plan

- [ ] 1. Create core loading component

  - Create `components/ui/loading.tsx` with all loading variants (fullscreen, inline, button, card, spinner)
  - Implement TypeScript interfaces for LoadingProps with variant, size, message, and className options
  - Add responsive design using Tailwind CSS classes for mobile, tablet, and desktop
  - Include accessibility features with ARIA labels and screen reader support
  - Add smooth animations with respect for reduced motion preferences
  - _Requirements: 1.1, 1.2, 1.5, 2.1, 2.2, 2.5, 3.1, 3.4, 3.5_

- [x] 2. Update dashboard layout loading states

  - Replace existing loading spinner in `app/dashboard/layout.tsx` with standardized loading component
  - Update session loading state to use fullscreen variant with appropriate message
  - Ensure mobile and desktop loading states are consistent
  - _Requirements: 1.1, 1.3, 2.4, 3.2_

- [x] 3. Update authentication page loading states

  - Replace loading states in `app/auth/signin/page.tsx` with standard loading component
  - Update loading states in `app/auth/signup/page.tsx` with button loading variant
  - Implement form submission loading states using button variant
  - _Requirements: 1.1, 1.4, 2.3, 3.2_

- [ ] 4. Update subscription component loading states

  - Replace loading state in `components/subscription/feature-gate.tsx` with card variant
  - Update subscription badge loading in `components/subscription/subscription-badge.tsx`
  - Implement loading states in subscription manager component
  - _Requirements: 1.1, 1.3, 2.3, 3.2_

- [ ] 5. Update card component loading states

  - Replace loading states in `components/cards/card-list.tsx` with card variant
  - Update loading states in card form components with inline variant
  - Implement loading states for card editing and creation pages
  - _Requirements: 1.1, 1.3, 2.3, 3.2_

- [ ] 6. Update template component loading states

  - Replace loading states in template selector with card variant
  - Update individual template components with inline loading states
  - Implement loading states for template preview and selection
  - _Requirements: 1.1, 1.3, 2.3, 3.2_

- [ ] 7. Update form and API loading states

  - Replace loading states in lead form component with button variant
  - Update image upload component loading states with inline variant
  - Implement loading states for all API calls and form submissions
  - _Requirements: 1.1, 1.3, 2.3, 3.2_

- [ ] 8. Update payment and analytics loading states

  - Replace loading states in payment components with appropriate variants
  - Update analytics page loading states with fullscreen or inline variants
  - Implement loading states for payment processing and verification
  - _Requirements: 1.1, 1.3, 2.3, 3.2_

- [ ]\* 9. Add loading state utilities and hooks

  - Create custom hooks for managing loading states across components
  - Add utility functions for common loading patterns
  - Implement loading state management helpers
  - _Requirements: 2.2, 2.4, 2.5_

- [ ]\* 10. Test loading component across all browsers and devices
  - Test loading animations and responsiveness on mobile devices
  - Verify accessibility compliance with screen readers
  - Test performance impact of loading animations
  - Validate consistent behavior across Chrome, Firefox, Safari, and Edge
  - _Requirements: 1.5, 3.4, 3.5_
