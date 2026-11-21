export type ThemeMode = 'light' | 'dark';

export interface AppTheme {
  mode: ThemeMode;
  colors: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryHover: string;
    onPrimary: string;
    secondary: string;
    secondaryHover: string;
    onSecondary: string;
    border: string;
    danger: string;
    dangerHover: string;
    onDanger: string;
    disabledBg: string;
    disabledText: string;
    badgeBg: string;
    badgeText: string;
    shadow: string;
    shadowHover: string;
    focusRing: string;
  };
  space: (n: number) => string;
  radii: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  fontSizes: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

const base = {
  space: (n: number) => `${n * 4}px`,
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '999px',
  },
  fontSizes: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
};

export const lightTheme: AppTheme = {
  mode: 'light',
  ...base,
  colors: {
    bg: '#f6f7f9',
    surface: '#ffffff',
    surfaceAlt: '#eef1f5',
    text: '#14161a',
    textMuted: '#5c6572',
    primary: '#3b5bdb',
    primaryHover: '#2f4ac4',
    onPrimary: '#ffffff',
    secondary: '#e8ecf5',
    secondaryHover: '#dbe1ee',
    onSecondary: '#14161a',
    border: '#d9dee7',
    danger: '#d6336c',
    dangerHover: '#b82a5b',
    onDanger: '#ffffff',
    disabledBg: '#e5e8ee',
    disabledText: '#8b93a1',
    badgeBg: '#e7f5ff',
    badgeText: '#1864ab',
    shadow: '0 1px 2px #0000000d',
    shadowHover: '0 8px 24px #0000001a',
    focusRing: '#3b5bdb33',
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  ...base,
  colors: {
    bg: '#0f1115',
    surface: '#171a21',
    surfaceAlt: '#222733',
    text: '#e8eaee',
    textMuted: '#9aa4b2',
    primary: '#7c9aff',
    primaryHover: '#93aaff',
    onPrimary: '#0f1115',
    secondary: '#2a303c',
    secondaryHover: '#343c4a',
    onSecondary: '#e8eaee',
    border: '#303746',
    danger: '#ff6b9a',
    dangerHover: '#ff85ac',
    onDanger: '#0f1115',
    disabledBg: '#262b35',
    disabledText: '#6f7887',
    badgeBg: '#1c2f4a',
    badgeText: '#9ec5ff',
    shadow: '0 1px 2px #00000066',
    shadowHover: '0 8px 24px #00000099',
    focusRing: '#7c9aff33',
  },
};