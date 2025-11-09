# Implementation Plan

- [x] 1. Configure Next.js body size limits

  - Update `next.config.ts` to set API route body size limit to 10MB
  - Add configuration for both API routes and server actions
  - Add comments documenting the configuration and rationale
  - _Requirements: 1.1, 3.1, 3.2, 3.3_

- [x] 2. Implement client-side image compression in ImageUpload component

  - [x] 2.1 Add image compression utility function

    - Create `compressImage` function using HTML5 Canvas API
    - Implement dimension calculation to maintain aspect ratio
    - Set maximum dimensions to 1200x1200 pixels
    - Set JPEG quality to 0.85
    - Handle compression errors gracefully
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 2.2 Integrate compression into file upload flow

    - Modify `handleFileSelect` to call compression before base64 conversion
    - Update loading state to show "Compressing..." during compression
    - Calculate and store compressed size
    - _Requirements: 1.2, 2.1_

  - [x] 2.3 Add compressed size display to UI

    - Show compressed size in KB/MB to user after compression
    - Update help text to mention automatic compression
    - _Requirements: 2.4_

  - [x] 2.4 Enhance error handling for compression failures

    - Add specific error message for compression failures
    - Handle edge cases (corrupted images, unsupported formats)
    - Maintain existing file size validation (5MB original)
    - _Requirements: 1.3_

- [ ] 3. Update error handling for 413 responses

  - Add user-friendly error message when 413 status is received
  - Display guidance to reduce number of images if limit exceeded
  - Update error handling in card form submission
  - _Requirements: 1.3, 1.4_

- [ ]\* 4. Add compression logging for monitoring
  - Log original and compressed sizes to console in development
  - Calculate and log compression ratio
  - _Requirements: 2.3_
