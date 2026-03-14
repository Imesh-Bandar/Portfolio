'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeColors {
  primaryBg: string;
  secondaryBg: string;
  cardBg: string;
  borderColor: string;
  primaryText: string;
  secondaryText: string;
  buttonBg: string;
  buttonText: string;
  accentColor: string;
}

interface FontSettings {
  family: string;
  headingSize: string;
  bodySize: string;
  animationEnabled: boolean;
}

interface LayoutSettings {
  showBorders: boolean;
  cardSpacing: string;
  sectionPadding: string;
}

interface SettingsContextType {
  colors: ThemeColors;
  fonts: FontSettings;
  layout: LayoutSettings;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultColors: ThemeColors = {
  primaryBg: '#0C0C08',
  secondaryBg: '#2E2622',
  cardBg: '#C1BFBE',
  borderColor: '#4C4D4E',
  primaryText: '#C1BFBE',
  secondaryText: '#5F5F60',
  buttonBg: '#2E2622',
  buttonText: '#C1BFBE',
  accentColor: '#4C4D4E'
};

const defaultFonts: FontSettings = {
  family: 'Inter, sans-serif',
  headingSize: '2.5rem',
  bodySize: '1rem',
  animationEnabled: true
};

const defaultLayout: LayoutSettings = {
  showBorders: false,
  cardSpacing: '1.5rem',
  sectionPadding: '5rem'
};

const SettingsContext = createContext<SettingsContextType>({
  colors: defaultColors,
  fonts: defaultFonts,
  layout: defaultLayout,
  loading: true,
  refreshSettings: async () => {}
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [fonts, setFonts] = useState<FontSettings>(defaultFonts);
  const [layout, setLayout] = useState<LayoutSettings>(defaultLayout);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();

      if (data.theme) {
        setColors(data.theme);
      }
      if (data.fonts) {
        setFonts(data.fonts);
      }
      if (data.layout) {
        setLayout(data.layout);
      }

      applySettings(
        data.theme || defaultColors,
        data.fonts || defaultFonts,
        data.layout || defaultLayout
      );
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      applySettings(defaultColors, defaultFonts, defaultLayout);
    } finally {
      setLoading(false);
    }
  };

  const applySettings = (theme: ThemeColors, fonts: FontSettings, layout: LayoutSettings) => {
    const root = document.documentElement;

    // Apply theme colors
    root.style.setProperty('--bg-primary', theme.primaryBg);
    root.style.setProperty('--bg-secondary', theme.secondaryBg);
    root.style.setProperty('--bg-card', theme.cardBg);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--text-primary', theme.primaryText);
    root.style.setProperty('--text-secondary', theme.secondaryText);
    root.style.setProperty('--button-bg', theme.buttonBg);
    root.style.setProperty('--button-text', theme.buttonText);
    root.style.setProperty('--accent-color', theme.accentColor);

    // Apply font settings
    root.style.setProperty('--font-family', fonts.family);
    root.style.setProperty('--heading-size', fonts.headingSize);
    root.style.setProperty('--body-size', fonts.bodySize);

    // Apply font family to body
    document.body.style.fontFamily = fonts.family;

    // Apply layout settings
    root.style.setProperty('--card-spacing', layout.cardSpacing);
    root.style.setProperty('--section-padding', layout.sectionPadding);

    // Apply border visibility
    root.style.setProperty('--image-border', layout.showBorders ? '2px solid ' + theme.borderColor : 'none');

    // Update gradient background
    root.style.setProperty('--background',
      `linear-gradient(135deg, ${theme.primaryBg} 0%, ${theme.secondaryBg} 25%, ${theme.primaryBg} 50%, ${theme.secondaryBg} 75%, ${theme.primaryBg} 100%)`
    );
    root.style.setProperty('--foreground', theme.primaryText);

    // Apply animation class to body
    if (fonts.animationEnabled) {
      document.body.classList.add('animations-enabled');
    } else {
      document.body.classList.remove('animations-enabled');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refreshSettings = async () => {
    await fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ colors, fonts, layout, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
