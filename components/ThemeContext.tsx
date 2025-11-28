import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '@/services/StorageService';

export type ThemeType = 'light' | 'dark';

export const colors = {
  light: {
    bg: '#F7F8FA',
    card: '#FFFFFF',
    cardBorder: '#EDEDED',
    text: '#1A1A1A',
    textSecondary: '#707070',
    textTertiary: '#A8A8A8',
    textSubtle: '#9A9A9A',
    accent: '#4A6CF7',
    accentMint: '#A8E6CF',
    shadowColor: 'rgba(0,0,0,0.05)',
    inputBg: '#FFFFFF',
    inputBorder: '#EDEDED',
  },
  dark: {
    bg: '#0D0D0D',
    card: '#1A1A1A',
    cardBorder: 'rgba(255,255,255,0.08)',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#888888',
    textSubtle: '#757575',
    accent: '#3A7AFE',
    accentMint: '#5EDBBB',
    shadowColor: 'transparent',
    inputBg: '#1F1F1F',
    inputBorder: 'rgba(255,255,255,0.1)',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof colors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await StorageService.getTheme();
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await StorageService.setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: colors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
