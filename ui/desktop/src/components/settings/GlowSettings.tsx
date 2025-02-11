import React from 'react';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { GlowSettings as GlowSettingsType } from './types';

interface GlowSettingsProps {
  settings: GlowSettingsType;
  onChange: (settings: GlowSettingsType) => void;
}

export function GlowSettings({ settings, onChange }: GlowSettingsProps) {
  const handleChange = (key: keyof GlowSettingsType, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="glow-enabled">Enable Glow Effect</Label>
        <Switch
          id="glow-enabled"
          checked={settings.enabled}
          onCheckedChange={(checked) => handleChange('enabled', checked)}
        />
      </div>

      {settings.enabled && (
        <>
          <div className="space-y-4">
            <Tabs
              value={settings.style}
              onValueChange={(value) => handleChange('style', value)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="single">Single</TabsTrigger>
                <TabsTrigger value="dual">Dual</TabsTrigger>
                <TabsTrigger value="multi">Multi</TabsTrigger>
                <TabsTrigger value="rainbow">Rainbow</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer"
                    aria-label="Primary glow color"
                  />
                  <Slider
                    id="primaryIntensity"
                    value={[settings.primaryIntensity]}
                    onValueChange={([value]) => handleChange('primaryIntensity', value)}
                    max={30}
                    step={1}
                    aria-label="Primary glow intensity"
                  />
                  <span className="text-sm text-muted-foreground w-12">
                    {(settings.primaryIntensity / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {settings.style !== 'single' && (
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center gap-4">
                    <input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="w-12 h-8 rounded cursor-pointer"
                      aria-label="Secondary glow color"
                    />
                    <Slider
                      id="secondaryIntensity"
                      value={[settings.secondaryIntensity]}
                      onValueChange={([value]) => handleChange('secondaryIntensity', value)}
                      max={20}
                      step={1}
                      aria-label="Secondary glow intensity"
                    />
                    <span className="text-sm text-muted-foreground w-12">
                      {(settings.secondaryIntensity / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation">Animation</Label>
              <Tabs
                id="animation"
                value={settings.animation}
                onValueChange={(value) => handleChange('animation', value)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="none">None</TabsTrigger>
                  <TabsTrigger value="pulse">Pulse</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
