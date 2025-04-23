# Multilingual System Documentation

## Overview
Sahayata Kiran implements a custom internationalization (i18n) system that enables the application to display content in multiple languages. Currently, the system supports English and Hindi, with a framework designed for easy extension to more languages.

## Key Components

### 1. I18n Context Provider (`i18nContext.tsx`)
The core of the multilingual system is the `I18nProvider` context that wraps the entire application. It provides:

- Language state management
- Translation function (`t`)
- Language switching capability
- Persistent language preferences (via localStorage)

```tsx
// How the provider works
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  // t function handles nested key lookups
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
```

### 2. Translation Files
Each supported language has its own translation file with identical structure:

- `src/lib/i18n/translations/en.ts` - English translations
- `src/lib/i18n/translations/hi.ts` - Hindi translations

The structure is hierarchical, organized by feature areas:

```typescript
export const en = {
  common: {
    appName: "Sahayata Kiran",
    emergency: "Emergency Help",
    // ...more common terms
  },
  mood: {
    howAreYou: "How are you feeling today?",
    // ...more mood tracker related terms
  },
  // ...other feature areas
};
```

### 3. Language Selector Component
The `LanguageSelector` component provides the UI for switching between languages:

- Dropdown menu with language options
- Displays current language
- Fixed position for easy access from any page
- Automatically updates content when a new language is selected

## Using the i18n System

### Basic Usage
To translate text in a component:

```tsx
import { useI18n } from "@/lib/i18n/i18nContext";

function MyComponent() {
  const { t } = useI18n();
  
  return (
    <div>
      <h1>{t('common.appName')}</h1>
      <p>{t('mood.howAreYou')}</p>
    </div>
  );
}
```

### Changing the Language
To programmatically change the language:

```tsx
import { useI18n } from "@/lib/i18n/i18nContext";

function LanguageSwitcher() {
  const { setLanguage } = useI18n();
  
  return (
    <button onClick={() => setLanguage('hi')}>
      Switch to Hindi
    </button>
  );
}
```

## Adding a New Language

1. **Create a new translation file:**

```typescript
// src/lib/i18n/translations/es.ts
export const es = {
  common: {
    appName: "Sahayata Kiran",
    emergency: "Ayuda de Emergencia",
    // Copy the structure from en.ts and translate each string
  },
  // ...other sections matching the English structure
};
```

2. **Update the i18nContext.tsx file:**

```typescript
// Add the new language to the type definition
export type Language = 'en' | 'hi' | 'es';

// Import the new translations
import { en } from './translations/en';
import { hi } from './translations/hi';
import { es } from './translations/es';

// Add to the translations object
const translations = {
  en,
  hi,
  es,
};
```

3. **Update the LanguageSelector component:**

```typescript
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "es", name: "Español (Spanish)" },
];
```

## Best Practices

1. **Translation Keys**: Use consistent, hierarchical naming:
   - `feature.subfeature.element` (e.g., `mood.journal.title`)
   
2. **Dynamic Content**: For text with variables, use template literals:
   ```tsx
   t('welcome.greeting').replace('{name}', userName)
   ```

3. **Testing**: Regularly switch languages during development to ensure all strings are properly translated.

4. **Missing Translations**: The system falls back to using the key if a translation is missing.

5. **Localization**: Consider adding locale-specific formatting for dates, numbers, etc., as the application grows.

## Future Enhancements

1. **RTL Support**: Adding support for right-to-left languages
2. **Pluralization**: Handling plural forms based on language rules
3. **Date/Time Formatting**: Locale-specific date formatting
4. **Auto-detection**: Detecting user's preferred language from browser settings
