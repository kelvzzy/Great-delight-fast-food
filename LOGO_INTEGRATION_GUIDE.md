# 🎨 Logo Integration Guide

## Overview
The GREAT DELIGHT application uses a centralized logo component system that makes it easy to replace the placeholder logo with your actual brand logo.

## Current Status
- ✅ Logo component created: `src/components/Logo.tsx`
- ⏳ Custom logo: **NOT YET ADDED** (using sparkle icon placeholder)
- ✅ Component integrated across: Homepage, Admin Dashboard, Menu Pages

## Quick Start: Adding Your Logo

### Step 1: Prepare Your Logo File
**Recommended Specifications:**
- **Format**: PNG with transparent background (preferred) or JPG
- **Size**: 512x512px or larger (square aspect ratio recommended)
- **File Size**: Under 200KB for optimal performance
- **Name**: `logo.png`

**Optional - Light/Dark Variants:**
If your logo needs different versions for light and dark backgrounds:
- `logo-light.png` - For dark backgrounds
- `logo-dark.png` - For light backgrounds

### Step 2: Add Logo to Project
1. Copy your logo file to: `/public/logo.png`
2. If using variants, also add:
   - `/public/logo-light.png`
   - `/public/logo-dark.png`

### Step 3: Enable Custom Logo
Open `src/components/Logo.tsx` and change:

```typescript
// Change this line from:
const HAS_CUSTOM_LOGO = false;

// To:
const HAS_CUSTOM_LOGO = true;
```

### Step 4: Test & Deploy
```bash
# Test locally
npm run dev

# Build and deploy
npm run build
git add public/logo.png src/components/Logo.tsx
git commit -m "chore: Add custom logo"
git push
```

## Logo Usage Across Application

### Where Logo Appears

1. **Homepage** (`/`)
   - Header: Large logo with text
   - Hero section branding

2. **Customer Menu Pages** (`/menu/...`)
   - Top navigation bar
   - Size: Medium (32px icon)

3. **Admin Dashboard** (`/admin/dashboard`)
   - Sidebar/Header
   - Size: Large (48px icon)

4. **Browser Notifications**
   - Icon in notification popup
   - Uses `/logo.png` directly

5. **Favicon** (Future)
   - Browser tab icon
   - Size: 32x32px

### Component Usage Examples

```tsx
import { Logo, LogoIcon } from '@/components/Logo';

// Full logo with text (default)
<Logo size="md" showText={true} />

// Logo sizes
<Logo size="sm" />  // 24px icon
<Logo size="md" />  // 32px icon
<Logo size="lg" />  // 48px icon
<Logo size="xl" />  // 64px icon

// Icon only (no text)
<Logo showText={false} />

// Light/Dark variants
<Logo variant="dark" />  // White text for dark backgrounds
<Logo variant="light" /> // Dark text for light backgrounds

// Custom styling
<Logo className="hover:scale-110 transition-transform" />

// Icon component (minimal)
<LogoIcon size={32} />
```

## Logo Component Features

### Built-in Features
- ✅ Responsive sizing (sm, md, lg, xl)
- ✅ Light/Dark theme variants
- ✅ Optional text display
- ✅ Image optimization via Next.js Image
- ✅ Graceful fallback (sparkle icon)
- ✅ Custom className support
- ✅ Priority loading for above-the-fold logos

### Fallback System
If no custom logo is provided, the component displays:
- **Icon**: Sparkle (✨) on gradient background
- **Colors**: Orange to red gradient (matches brand colors)
- **Text**: "GREAT DELIGHT" + subtitle

## Advanced Customization

### Different Logos for Different Sections

If you want different logos in different areas:

```tsx
// Homepage logo
<Logo size="xl" showText={true} />

// Admin dashboard logo
<Logo size="lg" showText={false} />

// Mobile menu logo
<Logo size="sm" showText={false} />
```

### Animated Logo

```tsx
<Logo 
  size="md" 
  className="hover:scale-110 hover:rotate-3 transition-all duration-300"
/>
```

### Logo with Link

```tsx
import Link from 'next/link';

<Link href="/" className="cursor-pointer">
  <Logo size="md" />
</Link>
```

## File Structure

```
great-delight-fastfood/
├── public/
│   ├── logo.png              ← Add your logo here
│   ├── logo-light.png        ← Optional: Light variant
│   └── logo-dark.png         ← Optional: Dark variant
├── src/
│   └── components/
│       └── Logo.tsx          ← Logo component (edit HAS_CUSTOM_LOGO)
```

## Troubleshooting

### Logo Not Showing?
1. ✅ Check file name is exactly `logo.png` (lowercase)
2. ✅ Verify file is in `/public/` directory
3. ✅ Confirm `HAS_CUSTOM_LOGO = true` in `Logo.tsx`
4. ✅ Clear Next.js cache: `rm -rf .next` and rebuild
5. ✅ Check browser console for image load errors

### Logo Looks Blurry?
- Use higher resolution image (min 512x512px)
- Ensure PNG format for transparency
- Check image compression settings

### Logo Too Large/Small?
- Adjust size prop: `<Logo size="sm|md|lg|xl" />`
- For custom sizes, use className: `className="w-20 h-20"`

### Background Conflicts?
- For dark backgrounds: Use `variant="dark"`
- For transparent PNGs: Ensure logo has proper contrast
- Add white/dark border if needed in your image editor

## Next Steps After Adding Logo

1. **Update Favicon**
   - Generate favicon from logo: https://realfavicongenerator.net/
   - Add to `/public/favicon.ico`

2. **Social Media Preview**
   - Create og-image.png (1200x630px)
   - Add to `/public/og-image.png`
   - Update meta tags in layout.tsx

3. **Print Styles**
   - Ensure logo looks good in print/PDF
   - Consider black & white version

4. **Mobile App Icons**
   - Generate PWA icons if needed
   - Add to manifest.json

## Support

If you need help with logo integration:
1. Check this guide thoroughly
2. Verify file paths and naming
3. Test in local development first
4. Deploy only after local testing succeeds

---
**Last Updated:** August 27, 2026  
**Status:** Ready for custom logo  
**Component Path:** `src/components/Logo.tsx`  
