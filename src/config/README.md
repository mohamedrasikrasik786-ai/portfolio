# Firebase Integration Guide

This document explains how to use Firebase in your application.

## 📁 Project Structure

```
src/
├── config/
│   ├── firebase.ts      # Firebase initialization
│   ├── firestore.ts     # Firestore database operations
│   ├── auth.ts          # Authentication operations
│   ├── storage.ts       # Storage operations
│   ├── hooks.ts         # Custom React hooks
│   └── index.ts         # Central export
├── types/
│   ├── firebase.ts      # Firebase-related types
│   ├── common.ts        # Common application types
│   └── index.ts         # Central type export
```

## 🚀 Quick Start

### Import Firebase Services

```typescript
// Import everything
import { db, auth, storage } from '@/config/firebase';

// Or import specific functions
import { 
  getPublishedProjects, 
  addProject,
  signIn,
  uploadProjectImage 
} from '@/config';
```

### Using Types

```typescript
import type { Project, ContactMessage, User } from '@/types';
```

## 📚 Usage Examples

### 1. Authentication

#### Sign Up
```typescript
import { signUp } from '@/config';

async function handleSignUp() {
  try {
    const userCredential = await signUp(
      'user@example.com',
      'password123',
      'John Doe'
    );
    console.log('User created:', userCredential.user);
  } catch (error) {
    console.error('Sign up error:', error);
  }
}
```

#### Sign In
```typescript
import { signIn } from '@/config';

async function handleSignIn() {
  try {
    const userCredential = await signIn('user@example.com', 'password123');
    console.log('Signed in:', userCredential.user);
  } catch (error) {
    console.error('Sign in error:', error);
  }
}
```

#### Sign Out
```typescript
import { logOut } from '@/config';

async function handleSignOut() {
  try {
    await logOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
  }
}
```

#### Use Auth Hook
```typescript
import { useAuth } from '@/config';

function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!isAuthenticated) return <div>Please sign in</div>;
  
  return <div>Welcome, {user?.displayName}!</div>;
}
```

### 2. Firestore Database

#### Get All Published Projects
```typescript
import { getPublishedProjects } from '@/config';
import type { Project } from '@/types';

async function fetchProjects() {
  try {
    const projects: Project[] = await getPublishedProjects();
    console.log('Projects:', projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}
```

#### Get Featured Projects
```typescript
import { getFeaturedProjects } from '@/config';

async function fetchFeatured() {
  const featured = await getFeaturedProjects(6); // Limit to 6
  console.log('Featured projects:', featured);
}
```

#### Get Single Project
```typescript
import { getProjectById } from '@/config';
import type { ProjectDetails } from '@/types';

async function fetchProject(id: string) {
  const project: ProjectDetails | null = await getProjectById(id);
  if (project) {
    console.log('Project:', project);
  }
}
```

#### Add New Project
```typescript
import { addProject } from '@/config';
import type { CreateDocument, ProjectDetails } from '@/types';

async function createProject() {
  const newProject: CreateDocument<ProjectDetails> = {
    title: 'My New Project',
    description: 'A great project description',
    category: 'Web Design',
    tags: ['design', 'web', 'ui'],
    imageUrl: 'https://example.com/image.jpg',
    year: 2026,
    featured: true,
    status: 'published',
    authorId: 'user-id-here',
    content: 'Full project content...',
    tools: ['Figma', 'React', 'Tailwind']
  };
  
  try {
    const projectId = await addProject(newProject);
    console.log('Project created with ID:', projectId);
  } catch (error) {
    console.error('Error creating project:', error);
  }
}
```

#### Update Project
```typescript
import { updateProject } from '@/config';
import type { UpdateDocument, ProjectDetails } from '@/types';

async function updateExistingProject(projectId: string) {
  const updates: UpdateDocument<ProjectDetails> = {
    title: 'Updated Title',
    featured: true
  };
  
  try {
    await updateProject(projectId, updates);
    console.log('Project updated');
  } catch (error) {
    console.error('Error updating project:', error);
  }
}
```

### 3. Contact Messages

#### Submit Contact Form
```typescript
import { submitContactMessage } from '@/config';
import type { WithoutId, ContactMessage } from '@/types';

async function handleContactSubmit(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const message: WithoutId<ContactMessage> = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    status: 'new',
    createdAt: Timestamp.now() // Import Timestamp from 'firebase/firestore'
  };
  
  try {
    const messageId = await submitContactMessage(message);
    console.log('Message sent with ID:', messageId);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
```

### 4. File Storage

#### Upload Project Image
```typescript
import { uploadProjectImage } from '@/config';

async function handleImageUpload(file: File, projectId: string) {
  try {
    const imageUrl = await uploadProjectImage(
      file,
      projectId,
      'main',
      (progress) => {
        console.log(`Upload progress: ${progress}%`);
      }
    );
    console.log('Image uploaded:', imageUrl);
  } catch (error) {
    console.error('Upload error:', error);
  }
}
```

#### Upload User Avatar
```typescript
import { uploadUserAvatar } from '@/config';

async function handleAvatarUpload(file: File, userId: string) {
  try {
    const avatarUrl = await uploadUserAvatar(file, userId);
    console.log('Avatar uploaded:', avatarUrl);
  } catch (error) {
    console.error('Upload error:', error);
  }
}
```

#### Validate File Before Upload
```typescript
import { validateFile } from '@/config';

function handleFileSelect(file: File) {
  const validation = validateFile(file, {
    maxSizeMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  });
  
  if (!validation.valid) {
    alert(validation.error);
    return;
  }
  
  // Proceed with upload
}
```

### 5. Analytics

#### Track Page View
```typescript
import { trackPageView } from '@/config';

function MyPage() {
  useEffect(() => {
    trackPageView('/about', document.referrer);
  }, []);
  
  return <div>About Page</div>;
}
```

#### Track Project View
```typescript
import { trackProjectView } from '@/config';

function ProjectPage({ projectId, projectTitle }: Props) {
  useEffect(() => {
    trackProjectView(projectId, projectTitle);
  }, [projectId, projectTitle]);
  
  return <div>Project Details</div>;
}
```

## 🔐 Security Rules

### Firestore Rules (Example)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects - Read public, Write authenticated
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contact Messages - Create public, Read/Update admin only
    match /contactMessages/{messageId} {
      allow create: if true;
      allow read, update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users - Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules (Example)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Project images - Public read, authenticated write
    match /projects/{projectId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User avatars - Public read, owner write
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📝 Environment Variables

If you want to move Firebase config to environment variables:

```typescript
// .env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

// src/config/firebase.ts
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## 🎯 Best Practices

1. **Always use try-catch blocks** for Firebase operations
2. **Validate data** before sending to Firebase
3. **Use TypeScript types** for type safety
4. **Handle loading states** in your UI
5. **Implement proper error handling** and user feedback
6. **Use indexes** for complex Firestore queries
7. **Optimize storage costs** by compressing images before upload
8. **Track analytics** silently (don't block user experience on analytics failures)

## 🔧 Troubleshooting

### Common Errors

1. **Permission Denied**: Check Firestore/Storage security rules
2. **Network Error**: Check Firebase project configuration and internet connection
3. **Invalid Credentials**: Verify email/password format
4. **Quota Exceeded**: Check Firebase usage quotas in console

### Debug Mode

Enable debug logging:
```typescript
import { setLogLevel } from 'firebase/firestore';
setLogLevel('debug');
```

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Storage Best Practices](https://firebase.google.com/docs/storage/web/best-practices)
