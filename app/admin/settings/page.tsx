'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { useTheme } from '@/lib/context/ThemeContext';
import toast from 'react-hot-toast';
import { FiSave, FiRotateCcw } from 'react-icons/fi';
import AdminCard from '@/components/admin/AdminCard';
import AdminButton from '@/components/admin/AdminButton';

const defaultSettings = {
  theme: {
    primaryBg: '#0C0C08',
    secondaryBg: '#2E2622',
    cardBg: '#C1BFBE',
    borderColor: '#4C4D4E',
    primaryText: '#C1BFBE',
    secondaryText: '#5F5F60',
    buttonBg: '#2E2622',
    buttonText: '#C1BFBE',
    accentColor: '#4C4D4E'
  },
  fonts: {
    family: 'Inter, sans-serif',
    headingSize: '2.5rem',
    bodySize: '1rem',
    animationEnabled: true
  },
  layout: {
    showBorders: false,
    cardSpacing: '1.5rem',
    sectionPadding: '5rem'
  }
};

export default function SettingsPage() {
  const { token } = useAuth();
  const { theme } = useTheme();
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) {
        setSettings({
          theme: data.theme || defaultSettings.theme,
          fonts: data.fonts || defaultSettings.fonts,
          layout: data.layout || defaultSettings.layout
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        toast.success('Settings saved! Applying changes...');
        updateCSSVariables();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('Error saving settings');
    }
  };

  const updateCSSVariables = () => {
    const root = document.documentElement;

    // Theme colors
    Object.entries(settings.theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });

    // Fonts
    root.style.setProperty('--font-family', settings.fonts.family);
    root.style.setProperty('--heading-size', settings.fonts.headingSize);
    root.style.setProperty('--body-size', settings.fonts.bodySize);

    // Layout
    root.style.setProperty('--card-spacing', settings.layout.cardSpacing);
    root.style.setProperty('--section-padding', settings.layout.sectionPadding);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    toast.success('Reset to default settings');
  };

  const colorFields = [
    { key: 'primaryBg', label: 'Primary Background', description: 'Main background color' },
    { key: 'secondaryBg', label: 'Secondary Background', description: 'Section backgrounds' },
    { key: 'cardBg', label: 'Card Background', description: 'Card and box backgrounds' },
    { key: 'borderColor', label: 'Border Color', description: 'Borders and dividers' },
    { key: 'primaryText', label: 'Primary Text', description: 'Main text color' },
    { key: 'secondaryText', label: 'Secondary Text', description: 'Subtle text color' },
    { key: 'buttonBg', label: 'Button Background', description: 'Button fill color' },
    { key: 'buttonText', label: 'Button Text', description: 'Button text color' },
    { key: 'accentColor', label: 'Accent Color', description: 'Highlights and accents' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          theme === 'dark' ? 'border-[#C1BFBE]' : 'border-blue-600'
        }`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Portfolio Settings</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Customize your entire portfolio from here</p>
        </div>
        <div className="flex gap-3">
          <AdminButton variant="secondary" icon={<FiRotateCcw />} onClick={handleReset}>
            Reset to Default
          </AdminButton>
          <AdminButton variant="primary" icon={<FiSave />} onClick={handleSave}>
            Save All Changes
          </AdminButton>
        </div>
      </div>

      {/* Theme Colors */}
      <AdminCard title="Theme Colors" description="Customize your color scheme">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="block">
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{field.label}</span>
                <span className={`block text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{field.description}</span>
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={settings.theme[field.key as keyof typeof settings.theme]}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, [field.key]: e.target.value }
                  })}
                  className={`w-16 h-16 rounded-lg cursor-pointer border-2 ${
                    theme === 'dark' ? 'border-[#4a4a4a]' : 'border-gray-300'
                  }`}
                />
                <input
                  type="text"
                  value={settings.theme[field.key as keyof typeof settings.theme]}
                  onChange={(e) => setSettings({
                    ...settings,
                    theme: { ...settings.theme, [field.key]: e.target.value }
                  })}
                  className={`flex-1 px-3 py-2 border-2 rounded-lg text-sm font-mono focus:outline-none ${
                    theme === 'dark'
                      ? 'border-[#4a4a4a] bg-[#2a2a2a] text-gray-300 focus:border-[#C1BFBE]'
                      : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="#000000"
                />
              </div>
              <div
                className={`h-12 rounded-lg shadow-inner border ${theme === 'dark' ? 'border-[#4a4a4a]' : 'border-gray-200'}`}
                style={{ backgroundColor: settings.theme[field.key as keyof typeof settings.theme] }}
              />
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Font Settings */}
      <AdminCard title="Font Settings" description="Customize typography and animations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Font Family</label>
            <select
              value={settings.fonts.family}
              onChange={(e) => setSettings({
                ...settings,
                fonts: { ...settings.fonts, family: e.target.value }
              })}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                theme === 'dark'
                  ? 'border-[#4a4a4a] bg-[#2a2a2a] text-gray-300 focus:border-[#C1BFBE]'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
              <option value="Verdana, Geneva, sans-serif">Verdana</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Arial, sans-serif">Arial</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Heading Size</label>
            <select
              value={settings.fonts.headingSize}
              onChange={(e) => setSettings({
                ...settings,
                fonts: { ...settings.fonts, headingSize: e.target.value }
              })}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                theme === 'dark'
                  ? 'border-[#4a4a4a] bg-[#2a2a2a] text-gray-300 focus:border-[#C1BFBE]'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="1.5rem">Small (1.5rem)</option>
              <option value="2rem">Medium (2rem)</option>
              <option value="2.5rem">Large (2.5rem)</option>
              <option value="3rem">Extra Large (3rem)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Body Text Size</label>
            <select
              value={settings.fonts.bodySize}
              onChange={(e) => setSettings({
                ...settings,
                fonts: { ...settings.fonts, bodySize: e.target.value }
              })}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                theme === 'dark'
                  ? 'border-[#4a4a4a] bg-[#2a2a2a] text-gray-300 focus:border-[#C1BFBE]'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="0.875rem">Small (0.875rem)</option>
              <option value="1rem">Medium (1rem)</option>
              <option value="1.125rem">Large (1.125rem)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.fonts.animationEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  fonts: { ...settings.fonts, animationEnabled: e.target.checked }
                })}
                className={`w-5 h-5 rounded ${
                  theme === 'dark'
                    ? 'text-[#C1BFBE] border-[#4a4a4a] focus:ring-[#C1BFBE]'
                    : 'text-blue-600 border-gray-300 focus:ring-blue-500'
                }`}
              />
              <div>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Enable Animations</span>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Enable scroll & hover animations</p>
              </div>
            </label>
          </div>
        </div>
      </AdminCard>

      {/* Layout Settings */}
      <AdminCard title="Layout Settings" description="Customize spacing and borders">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.layout.showBorders}
                onChange={(e) => setSettings({
                  ...settings,
                  layout: { ...settings.layout, showBorders: e.target.checked }
                })}
                className={`w-5 h-5 rounded ${
                  theme === 'dark'
                    ? 'text-[#C1BFBE] border-[#4a4a4a] focus:ring-[#C1BFBE]'
                    : 'text-blue-600 border-gray-300 focus:ring-blue-500'
                }`}
              />
              <div>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Show Image Borders</span>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Display borders around images</p>
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Card Spacing</label>
            <select
              value={settings.layout.cardSpacing}
              onChange={(e) => setSettings({
                ...settings,
                layout: { ...settings.layout, cardSpacing: e.target.value }
              })}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                theme === 'dark'
                  ? 'border-[#4a4a4a] bg-[#2a2a2a] text-gray-300 focus:border-[#C1BFBE]'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="1rem">Compact (1rem)</option>
              <option value="1.5rem">Normal (1.5rem)</option>
              <option value="2rem">Spacious (2rem)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Section Padding</label>
            <select
              value={settings.layout.sectionPadding}
              onChange={(e) => setSettings({
                ...settings,
                layout: { ...settings.layout, sectionPadding: e.target.value }
              })}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                theme === 'dark'
                  ? 'border-[#4a4a4a] bg-[#2a2a2a] text-gray-300 focus:border-[#C1BFBE]'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-blue-500'
              }`}
            >
              <option value="3rem">Compact (3rem)</option>
              <option value="5rem">Normal (5rem)</option>
              <option value="7rem">Spacious (7rem)</option>
            </select>
          </div>
        </div>
      </AdminCard>

      {/* Preview */}
      <AdminCard title="Preview" description="See how your changes look">
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: settings.theme.primaryBg,
            fontFamily: settings.fonts.family
          }}
        >
          <div
            className="p-4 rounded-lg mb-4"
            style={{
              backgroundColor: settings.theme.cardBg + '20',
              borderColor: settings.theme.borderColor,
              borderWidth: settings.layout.showBorders ? '2px' : '0',
              borderStyle: 'solid'
            }}
          >
            <h3
              style={{
                color: settings.theme.primaryText,
                fontSize: settings.fonts.headingSize
              }}
              className="font-bold mb-2"
            >
              Sample Heading
            </h3>
            <p
              style={{
                color: settings.theme.secondaryText,
                fontSize: settings.fonts.bodySize
              }}
            >
              This is how your content will look with the current settings
            </p>
          </div>
          <button
            style={{
              backgroundColor: settings.theme.buttonBg,
              color: settings.theme.buttonText
            }}
            className="px-6 py-2 rounded-lg font-medium"
          >
            Sample Button
          </button>
        </div>
      </AdminCard>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <AdminButton variant="secondary" icon={<FiRotateCcw />} onClick={handleReset}>
          Reset to Default
        </AdminButton>
        <AdminButton variant="success" icon={<FiSave />} size="lg" onClick={handleSave}>
          Save All Changes
        </AdminButton>
      </div>
    </div>
  );
}
