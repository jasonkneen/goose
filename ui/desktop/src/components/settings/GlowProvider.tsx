import React, { createContext, useContext, useEffect, useState } from 'react';
import { GlowSettings } from './types';

const defaultGlowSettings: GlowSettings = {
  enabled: false,
  style: 'single',
  animation: 'none',
  primaryColor: '#60a5fa',
  primaryIntensity: 15,
  secondaryColor: '#3b82f6',
  secondaryIntensity: 8,
};

interface GlowContextType {
  settings: GlowSettings;
  updateSettings: (settings: GlowSettings) => void;
}

const GlowContext = createContext<GlowContextType | null>(null);

export function useGlow() {
  const context = useContext(GlowContext);
  if (!context) {
    throw new Error('useGlow must be used within a GlowProvider');
  }
  return context;
}

export function GlowProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GlowSettings>(() => {
    const saved = localStorage.getItem('user_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.glow || defaultGlowSettings;
    }
    return defaultGlowSettings;
  });

  // Update CSS variables when glow settings change
  useEffect(() => {
    const root = document.documentElement;
    if (settings.enabled) {
      const rgb1 = hexToRgb(settings.primaryColor);
      const rgb2 = hexToRgb(settings.secondaryColor);

      root.style.setProperty(
        '--primary-glow',
        `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, ${settings.primaryIntensity / 100})`
      );
      root.style.setProperty(
        '--secondary-glow',
        `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${settings.secondaryIntensity / 100})`
      );
    } else {
      root.style.removeProperty('--primary-glow');
      root.style.removeProperty('--secondary-glow');
    }
  }, [settings]);

  const updateSettings = (newSettings: GlowSettings) => {
    setSettings(newSettings);
    // Update the settings in localStorage
    const saved = localStorage.getItem('user_settings');
    const currentSettings = saved ? JSON.parse(saved) : {};
    localStorage.setItem(
      'user_settings',
      JSON.stringify({
        ...currentSettings,
        glow: newSettings,
      })
    );
    // Dispatch event for other windows
    window.dispatchEvent(new CustomEvent('settings-updated'));
  };

  return (
    <GlowContext.Provider value={{ settings, updateSettings }}>
      <>
        <div
          className="glow-container"
          data-style={settings.style}
          data-animation={settings.animation}
          style={{
            opacity: settings.enabled ? 1 : 0,
          }}
        />
        {children}
      </>
    </GlowContext.Provider>
  );
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
