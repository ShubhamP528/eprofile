# Cloudinary Setup for Profile Images

## 🖼️ Profile Image Upload Setup

Your eProfile application now supports profile image uploads! Here's how to configure Cloudinary:

### 1. **Cloudinary Account Setup**

1. Go to [Cloudinary.com](https://cloudinary.com/) and sign up/login
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 2. **Environment Variables**

Add these to your `.env` file:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# For client-side uploads (required for image upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

### 3. **Upload Preset Configuration**

1. Go to Cloudinary Dashboard → Settings → Upload
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Configure:
   - **Preset name**: `eprofile_uploads`
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `eprofile/profiles` (optional, for organization)
   - **Transformation**:
     - Width: 400px
     - Height: 400px
     - Crop: Fill
     - Quality: Auto
     - Format: Auto

### 4. **Update Image Upload Component**

If you created a custom upload preset, update the component:

```typescript
// In components/ui/image-upload.tsx
formData.append("upload_preset", "eprofile_uploads"); // Your preset name
```

### 5. **Security Settings (Optional)**

For production, you may want to:

1. **Enable folder restrictions**:

   - Go to Settings → Security
   - Add allowed folders: `eprofile/profiles`

2. **Set file size limits**:

   - Max file size: 5MB
   - Allowed formats: jpg, png, webp

3. **Add transformation restrictions**:
   - Max dimensions: 1000x1000px

## 🎯 **Current Configuration**

Your app is currently configured to:

- ✅ Upload images to Cloudinary
- ✅ Display profile images in all 5 templates
- ✅ Validate image URLs
- ✅ Handle upload errors gracefully
- ✅ Show upload progress

## 🔧 **Template Support**

Profile images are now supported in:

- ✅ **Template 1**: Circular profile in gradient header
- ✅ **Template 2**: Overlapping profile image (already had support)
- ✅ **Template 3**: Circular profile with gold ring (already had support)
- ✅ **Template 4**: Simple circular profile (already had support)
- ✅ **Template 5**: Centered circular profile with emerald border

## 🚨 **Troubleshooting**

### Upload Fails

1. Check if `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
2. Verify upload preset exists and is unsigned
3. Check file size (must be < 5MB)
4. Ensure file is an image format

### Images Don't Display

1. Check if the URL is valid
2. Verify Cloudinary delivery settings
3. Check browser console for CORS errors

### Environment Variables

```bash
# Required for uploads to work
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dgsjppp4a"  # Your current cloud name

# Optional: For server-side operations
CLOUDINARY_API_KEY="655944819687743"
CLOUDINARY_API_SECRET="I-lIFUXiMUJW-Rc7rN7C4H3gbGA"
```

## 🎉 **You're Ready!**

Profile image uploads are now fully functional across all templates. Users can:

- Upload profile images during card creation
- Change profile images when editing cards
- See live preview in the form
- View profile images on all card templates

The feature works with your existing Cloudinary account and is ready for production use!
