import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

// Storage key constant
const STORAGE_KEY = 'logpulse-theme';

// Check if we can use DOM APIs (not in SSR)
const canUseDOM = typeof window !== 'undefined';

// Safe localStorage getter
const safeGetTheme = (): Theme | null => {
  if (!canUseDOM) return null;
  try {
    return localStorage.getItem(STORAGE_KEY) as Theme | null;
  } catch {
    return null;
  }
};

// Safe localStorage setter
const safeSetTheme = (value: Theme) => {
  if (!canUseDOM) return;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // noop - fail silently in private browsing mode
  }
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const stored = safeGetTheme();
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
    
    // Default to system preference
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (!canUseDOM) return;
    
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      // Use system preference with fallback
      try {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch {
        effectiveTheme = 'dark'; // fallback
      }
    } else {
      effectiveTheme = theme;
    }
    
    // Apply theme class
    root.classList.add(effectiveTheme);
    setResolvedTheme(effectiveTheme);
    
    // Save to localStorage
    safeSetTheme(theme);
  }, [theme]);

  // Listen for system theme changes when using 'system'
  useEffect(() => {
    if (!canUseDOM || theme !== 'system') return;

    let mediaQuery: MediaQueryList;
    
    try {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    } catch {
      return; // Exit if matchMedia is not supported
    }
    
    const handleChange = () => {
      if (!canUseDOM) return;
      
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      const effectiveTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(effectiveTheme);
      setResolvedTheme(effectiveTheme);
    };

    // Use modern addEventListener if available, fallback to addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // Legacy support for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
  };
}