import { useEffect, useState } from 'react';
import type { ThemeMode } from '../theme/theme';

const STORAGE_KEY = 'mini-market-theme';

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggle = () => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return { mode, toggle };
}