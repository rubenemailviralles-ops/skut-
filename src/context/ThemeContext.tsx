import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeType, GenderFilter } from '../types';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  gender: GenderFilter;
  setGender: (gender: GenderFilter) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('industrial');
  const [gender, setGender] = useState<GenderFilter>('male');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === theme) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setThemeState(newTheme);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, gender, setGender, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
