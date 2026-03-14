# Vercel Upload Configuration

## Upload Size Limits

The application has been configured to support **10MB** image uploads. However, Vercel has platform-level request body size limits:

### Vercel Plan Limits:
- **Hobby Plan**: 4.5MB maximum request body size
- **Pro Plan**: 4.5MB (can request increase from support)
- **Enterprise Plan**: Customizable limits

### Current Configuration:
- Application code: Supports **10MB** uploads
- Vercel deployment: Limited by your plan (likely **4.5MB**)

### Options to Support 10MB Uploads:

#### Option 1: Use Cloud Storage (Recommended)
Instead of uploading directly to Vercel, use a cloud storage service:
- **Cloudinary** (Free tier: 25GB storage, 25GB bandwidth/month)
- **AWS S3** (Pay as you go)
- **Vercel Blob Storage** (Pro plan required)

#### Option 2: Request Vercel Limit Increase
If you're on a Pro or Enterprise plan:
1. Contact Vercel support
2. Request body size limit increase
3. Specify your use case (image uploads up to 10MB)

#### Option 3: Keep 4.5MB Limit
Reduce the max upload size back to 4.5MB to match Vercel's limits:
- Update `app/api/upload/route.ts` (line 29)
- Update `components/admin/ImageUpload.tsx` (line 33)

## Testing Upload Limits

Test your deployment with different file sizes:
- 1MB: ✅ Should work
- 4.5MB: ✅ Should work on Hobby plan
- 10MB: ⚠️ Will fail on Hobby plan, may work on Pro with increase

## Current Setup

The code is ready for 10MB uploads. Once you upgrade your Vercel plan or implement cloud storage, the larger uploads will work automatically.
