
# Developer Guide for Sahayata Kiran

This document provides detailed information for developers who want to contribute to or modify the Sahayata Kiran platform.

## Development Environment Setup

1. **Prerequisites:**
   - Node.js (v18+)
   - npm or yarn
   - Git

2. **Clone and Install:**
   ```bash
   git clone https://github.com/yourusername/sahayata-kiran.git
   cd sahayata-kiran
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the root directory
   - For Supabase integration:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Running Development Server:**
   ```bash
   npm run dev
   ```

## Project Architecture

### Folder Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Core UI components from shadcn
│   ├── mood-tracker/   # Mood tracking components
│   └── emergency/      # Emergency support components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
│   ├── i18n/           # Internationalization
│   │   ├── translations/  # Language files
│   │   └── i18nContext.tsx
│   ├── crisis-detection.ts  # Crisis detection utilities
│   └── utils.ts        # General utilities
├── pages/              # Page components (routes)
│   ├── Index.tsx       # Home page
│   ├── MoodTracker.tsx # Mood tracking page
│   └── ...
└── integrations/       # Third-party integrations
    └── supabase/       # Supabase client and types
```

### Key Design Patterns

1. **Component Composition:**
   - Small, focused components
   - Container/Presentational pattern for complex features

2. **State Management:**
   - React Context for global state (user, language)
   - Local state for component-specific concerns
   - Tanstack Query for data fetching and caching

3. **Internationalization Strategy:**
   - i18nContext provides translation function
   - Component-level usage of translations
   - Organized by feature area in translation files

## Feature Implementation Guidelines

### Adding a New Page

1. Create a new file in `src/pages/` (e.g., `NewFeature.tsx`)
2. Add route in `App.tsx`:
   ```tsx
   <Route path="/new-feature" element={<NewFeature />} />
   ```
3. Add navigation links in relevant places (e.g., Header.tsx)

### Extending the Multilingual System

1. Add new translations in `src/lib/i18n/translations/`
2. Update language type in `i18nContext.tsx`
3. Add language option in `LanguageSelector.tsx`

### Adding New Components

1. Create component in appropriate directory
2. Use Tailwind for styling
3. Add internationalization with the `t` function
4. Consider component variants with Tailwind's variant approach

## Supabase Integration

### Database Schema

#### User Profiles Table
```sql
create table public.profiles (
  id uuid references auth.users not null primary key,
  name text,
  created_at timestamp with time zone default now()
);
```

#### Mood Entries Table
```sql
create table public.mood_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  date text not null,
  mood text not null,
  journal text,
  timestamp bigint not null,
  crisis_level text default 'none'::text
);
```

### Authentication

The app uses Supabase Authentication with email/password:

```tsx
// Example login flow
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### Row Level Security (RLS)

Mood entries have RLS policies to ensure users can only access their own data:

```sql
-- Enable RLS
alter table public.mood_entries enable row level security;

-- Create policy
create policy "Users can only access their own mood entries"
on public.mood_entries for all
using (auth.uid() = user_id);
```

## Testing Strategy

1. **Component Testing:**
   - Test components in isolation
   - Focus on user interactions and rendering

2. **Integration Testing:**
   - Test key user flows (e.g., mood tracking journey)
   - Test language switching

3. **Accessibility Testing:**
   - Ensure keyboard navigation works
   - Test with screen readers
   - Maintain appropriate contrast ratios

## Code Style and Standards

1. **TypeScript:**
   - Use proper typing
   - Avoid `any` when possible
   - Create interfaces for props and state

2. **Component Organization:**
   ```tsx
   // Imports
   import { useState } from 'react';
   
   // Types/Interfaces
   interface MyComponentProps {
     title: string;
   }
   
   // Component
   export function MyComponent({ title }: MyComponentProps) {
     // State, hooks
     const [state, setState] = useState('');
     
     // Event handlers
     const handleClick = () => {
       // ...
     };
     
     // JSX
     return (
       <div>...</div>
     );
   }
   ```

3. **Naming Conventions:**
   - PascalCase for components
   - camelCase for functions, variables
   - ALL_CAPS for constants
   - kebab-case for CSS classes and files

## Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with static assets.

### Deployment Options

1. **GitHub Pages:**
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Add to package.json:
     ```json
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
     ```
   - Run: `npm run deploy`

2. **Vercel/Netlify:**
   - Connect GitHub repo to deployment platform
   - Configure build settings:
     - Build command: `npm run build`
     - Output directory: `dist`

## Performance Optimization

1. **Code Splitting:**
   - Use React.lazy for route-based code splitting
   - Consider dynamic imports for large components

2. **Memoization:**
   - Use React.memo for pure components
   - Use useMemo/useCallback for expensive computations

3. **Image Optimization:**
   - Compress images
   - Consider lazy loading images

## Security Considerations

1. **Authentication:**
   - Protected routes for authenticated content
   - Secure session management via Supabase

2. **Data Privacy:**
   - Client-side encryption for sensitive data
   - Clear privacy policy for users

3. **API Security:**
   - Rate limiting
   - Input validation
   - Proper error handling

## Troubleshooting Common Issues

1. **Supabase Authentication Issues:**
   - Check environment variables
   - Verify RLS policies
   - Check browser console for errors

2. **Build Errors:**
   - Clean node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors

3. **Styling Issues:**
   - Run Tailwind build: `npx tailwindcss -i ./src/index.css -o ./dist/output.css`
   - Check for conflicting styles

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
