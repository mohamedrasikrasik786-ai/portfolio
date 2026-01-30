# Digital Flux Portfolio

A modern, production-ready portfolio website built with React, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Quick Start

### Running in Figma Make

The app is pre-configured with default Firebase credentials and will work immediately in Figma Make without any setup.

### Running Locally

#### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Firebase account (optional - defaults provided)
- Cloudinary account (optional - for image uploads)

#### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Firebase credentials to .env
# See "Environment Variables" section below

# Run development server
npm run dev
```

The app will open at `http://localhost:3000`

## 📋 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration (Required)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Cloudinary Configuration (Optional - for image uploads in admin panel)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Admin Panel Password (Required for admin access)
VITE_ADMIN_PASSWORD=your_secure_password
```

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings → General → Your apps
4. Click "Add app" → Web (</>) icon
5. Register your app and copy the config values
6. Paste them into your `.env` file

### Getting Cloudinary Credentials (Optional)

1. Go to [Cloudinary Console](https://cloudinary.com/)
2. Sign up or log in
3. Go to Settings → Upload
4. Create an unsigned upload preset
5. Copy Cloud Name and Upload Preset to `.env`

## 🏗️ Project Structure

```
portfolio-digital-flux/
├── src/
│   ├── app/
│   │   ├── components/         # React components
│   │   │   ├── admin/          # Admin panel components
│   │   │   └── figma/          # Figma-imported components
│   │   ├── constants/          # Constants and config
│   │   └── App.tsx            # Main app component
│   ├── config/                # Firebase and service configs
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom React hooks
│   ├── imports/               # Imported assets and components
│   ├── styles/                # Global styles and theme
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   └── main.tsx              # App entry point
├── public/                    # Static assets
├── .env                       # Environment variables (create this)
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── package.json              # Dependencies and scripts
```

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Production
npm run build           # Build for production
npm run preview         # Preview production build locally

# SEO
npm run generate-sitemap # Generate sitemap.xml
```

## 🔧 Configuration Files

### tsconfig.json
TypeScript configuration with path aliases and strict type checking enabled.

### vite.config.ts
Vite build configuration with:
- React plugin
- Tailwind CSS v4
- Path alias (`@/` → `./src/`)
- Code splitting for optimal bundle size

## 🎨 Features

### Public Pages
- **Landing Page**: Hero section with parallax effects and interactive distortion
- **Selected Work**: Portfolio case studies with filtering
- **About Section**: Profile and tools showcase
- **Case Study Details**: Full case study viewer with table of contents

### Admin Panel
Access at `/admin` with password authentication:
- Landing page editor
- Case study builder with drag-and-drop blocks
- About me editor
- Footer editor
- Resume upload
- Image management with Cloudinary integration

### Technical Features
- ⚡ Vite for fast development and optimized builds
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS v4 for styling
- 🔥 Firebase Firestore for database
- 📦 Firebase Storage for file uploads
- 🖼️ Cloudinary for image optimization
- 📱 Fully responsive design
- 🌓 Dark/light theme support
- 🔍 SEO optimized with meta tags
- ♿ Accessible components
- 🎭 Smooth animations with Framer Motion

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment Variables in Production

Add all `.env` variables to your hosting platform:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Build & deploy → Environment

## 🔒 Security

- Admin panel protected by password
- Firebase Security Rules recommended for production
- Environment variables for sensitive data
- HTTPS required for production

### Recommended Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all published content
    match /{document=**} {
      allow read: if true;
    }
    
    // Restrict write access (use Firebase Authentication in production)
    match /{document=**} {
      allow write: if false; // Update with proper auth rules
    }
  }
}
```

## 🐛 Troubleshooting

### Build Fails

1. Clear cache: `rm -rf node_modules dist .vite && npm install`
2. Check Node version: `node -v` (should be 18+)
3. Verify all `.env` variables are set

### Firebase Connection Issues

1. Verify Firebase credentials in `.env`
2. Check Firebase Console for project status
3. Ensure Firebase services are enabled (Firestore, Storage, Analytics)

### Images Not Loading

1. Check Cloudinary credentials if using image uploads
2. Verify image URLs in database are accessible
3. Check browser console for CORS errors

### TypeScript Errors

1. Run `npx tsc --noEmit` to check for type errors
2. Ensure all dependencies have type definitions
3. Check `tsconfig.json` for proper configuration

## 📝 Development Guidelines

### Adding New Components

```tsx
// src/app/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  isDark?: boolean;
}

export function MyComponent({ title, isDark = false }: MyComponentProps) {
  return (
    <div className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>
      <h1>{title}</h1>
    </div>
  );
}
```

### Adding New Routes

```tsx
// src/main.tsx
import { MyNewPage } from './app/components/MyNewPage';

// Add to router configuration
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow existing color scheme in `src/styles/theme.css`
- Maintain responsive design (mobile-first)
- Test in both light and dark themes

## 📄 License

Private portfolio project. All rights reserved.

## 🆘 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review Firebase and Cloudinary documentation
3. Check browser console for error messages

---

Built with ❤️ using React + TypeScript + Tailwind CSS + Firebase