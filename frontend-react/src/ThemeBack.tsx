import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { getTheme } from './ThemeX';

interface ThemeBackProps {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeBack = createContext<ThemeBackProps | undefined>(undefined);

interface ThemeBackProviderProps {
  children: ReactNode;
}

export const ThemeBackProvider: React.FC<ThemeBackProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (
      prevMode === 'light' ? 'dark' : 'light'
    )
  );
  };

  const theme: Theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeBack.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeBack.Provider>
  );
};
