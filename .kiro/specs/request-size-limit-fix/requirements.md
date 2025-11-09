# Requirements Document

## Introduction

This document outlines the requirements for fixing the "413 Request Entity Too Large" error that occurs when creating or editing cards with images. The issue arises because images are stored as base64 data URLs, causing request payloads to exceed Next.js's default body size limit (typically 4MB). The solution involves increasing the body size limit and implementing proper image compression to prevent future occurrences.

## Glossary

- **Next.js API Routes**: Server-side API endpoints in the Next.js application that handle HTTP requests
- **Body Size Limit**: The maximum allowed size of HTTP request payloads
- **Base64 Data URL**: A method of embedding image data directly in a string format (data:image/png;base64,...)
- **Image Compression**: Reducing image file size while maintaining acceptable quality
- **Request Payload**: The data sent in an HTTP request body

## Requirements

### Requirement 1

**User Story:** As a user, I want to create or edit cards with multiple images without encountering 413 errors, so that I can successfully save my card data.

#### Acceptance Criteria

1. WHEN a user submits a card creation or update request with images, THE Next.js API Routes SHALL accept request payloads up to 10MB in size
2. WHEN a user uploads an image larger than 1MB, THE image upload component SHALL compress the image to reduce file size before including it in the request
3. IF a request payload exceeds 10MB after compression, THEN THE system SHALL display a clear error message instructing the user to reduce the number or size of images
4. THE Next.js API Routes SHALL return appropriate error responses with status code 413 when the body size limit is exceeded

### Requirement 2

**User Story:** As a user, I want my images to be automatically optimized, so that my cards load quickly and I don't encounter size limit errors.

#### Acceptance Criteria

1. WHEN a user selects an image file, THE image upload component SHALL compress images to a maximum width of 1200 pixels while maintaining aspect ratio
2. THE image upload component SHALL compress images to a quality level of 0.85 for JPEG format
3. WHEN compression is applied, THE system SHALL maintain image quality sufficient for profile and gallery display
4. THE image upload component SHALL display the compressed image size to the user before upload

### Requirement 3

**User Story:** As a developer, I want clear configuration for body size limits, so that I can easily adjust limits if needed in the future.

#### Acceptance Criteria

1. THE Next.js configuration SHALL explicitly define the body size limit for API routes
2. THE configuration SHALL be documented with comments explaining the purpose and recommended values
3. WHEN the body size limit is configured, THE system SHALL apply it to all API routes consistently
