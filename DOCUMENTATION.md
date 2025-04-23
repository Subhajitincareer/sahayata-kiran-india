# Sahayata Kiran - Mental Health Support Platform

## Project Overview
Sahayata Kiran ("Ray of Help" in Hindi) is a comprehensive mental health platform designed to provide accessible mental wellness resources, self-assessment tools, mood tracking, and crisis support in multiple languages.

## Key Features

### 1. Multilingual Support
- Currently supports English and Hindi
- Easily extensible to more languages
- Language selection persists across sessions
- Responsive language selector component

### 2. Mental Health Self-Assessment
- Scientifically validated assessment tools
- Confidential results and recommendations
- Multiple assessment types for different mental health concerns

### 3. Mood Tracking
- Daily mood journaling with emotion selection
- Visual charts and insights
- Journal history capabilities
- Crisis detection in journal text
- Configurable daily reminders

### 4. Emergency Support
- One-click access to crisis resources
- Helpline information
- Safety check-in tools

### 5. Resource Library
- Curated mental health resources
- Educational content

## Technology Stack
- **Frontend Framework**: React with TypeScript
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **State Management**: React Context API + Tanstack Query
- **Build Tool**: Vite
- **Internationalization**: Custom i18n implementation
- **Database & Auth**: Supabase

## Architecture

### Internationalization System
The project implements a custom i18n solution with the following components:

#### `i18nContext.tsx`
Provides language context to the entire application with key functions:
- `setLanguage`: Changes the application language and stores preference
- `t`: Translation function that retrieves strings based on nested keys
- Language detection and persistence

#### Translation Files
Located in `src/lib/i18n/translations/`:
- `en.ts`: English translations
- `hi.ts`: Hindi translations

Each file contains nested objects of translated strings organized by feature.

#### Usage
```tsx
import { useI18n } from "@/lib/i18n/i18nContext";

function MyComponent() {
  const { t } = useI18n();
  
  return <h1>{t('common.appName')}</h1>;
}
```

### Component Structure
- **Pages**: High-level route components in `/src/pages`
- **Components**: Reusable UI components in `/src/components`
- **Hooks**: Custom React hooks in `/src/hooks`
- **Lib**: Utility functions and services in `/src/lib`

## Data Flow

### Mood Tracking
1. User selects mood via `MoodSelector` component
2. Journal entry is captured in `MoodJournal` component
3. Text is analyzed for crisis indicators using `crisis-detection` utility
4. Data is stored in local storage and/or Supabase
5. Visualized in `MoodCharts` component

### State Management
- User authentication state is managed via `UserProvider`
- Language preferences are managed via `I18nProvider`
- Component-specific state is managed with React's useState/useReducer

## Extending the Language System

To add a new language:

1. Create a new translation file in `src/lib/i18n/translations/`
2. Add the language to the available options in `LanguageSelector.tsx`
3. Update the Language type in `i18nContext.tsx`

Example for adding Spanish support:

```typescript
// src/lib/i18n/translations/es.ts
export const es = {
  common: {
    appName: "Sahayata Kiran",
    emergency: "Ayuda de Emergencia",
    // ...other translations
  },
  // ...other categories
};

// In i18nContext.tsx
export type Language = 'en' | 'hi' | 'es';

// In LanguageSelector.tsx
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "es", name: "Español (Spanish)" },
];
```

## Contributing
Contributions to Sahayata Kiran are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Deployment
The application can be deployed as a static site to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

## License
[MIT License](LICENSE)
