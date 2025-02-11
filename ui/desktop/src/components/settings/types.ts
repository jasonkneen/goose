import { FullExtensionConfig } from '../../extensions';

export interface Model {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface GlowSettings {
  enabled: boolean;
  style: 'single' | 'dual' | 'multi' | 'rainbow';
  animation: 'none' | 'pulse';
  primaryColor: string;
  primaryIntensity: number;
  secondaryColor: string;
  secondaryIntensity: number;
}

export interface Settings {
  models: Model[];
  extensions: FullExtensionConfig[];
  glow: GlowSettings;
}
