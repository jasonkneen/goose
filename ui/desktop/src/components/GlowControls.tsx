import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface GlowControlsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  glowStyle: string;
  onGlowStyleChange: (style: string) => void;
  glowAnimation: string;
  onGlowAnimationChange: (animation: string) => void;
}

export function GlowControls({
  open,
  onOpenChange,
  glowStyle,
  onGlowStyleChange,
  glowAnimation,
  onGlowAnimationChange,
}: GlowControlsProps) {
  const [primaryColor, setPrimaryColor] = React.useState('#60a5fa');
  const [secondaryColor, setSecondaryColor] = React.useState('#3b82f6');
  const [primaryIntensity, setPrimaryIntensity] = React.useState(15);
  const [secondaryIntensity, setSecondaryIntensity] = React.useState(8);

  React.useEffect(() => {
    const root = document.documentElement;
    const rgb1 = hexToRgb(primaryColor);
    const rgb2 = hexToRgb(secondaryColor);

    root.style.setProperty(
      '--primary-glow',
      `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, ${primaryIntensity / 100})`
    );
    root.style.setProperty(
      '--secondary-glow',
      `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${secondaryIntensity / 100})`
    );
  }, [primaryColor, secondaryColor, primaryIntensity, secondaryIntensity]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Glow Effect Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Tabs value={glowStyle} onValueChange={onGlowStyleChange} className="w-full">
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
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer"
                    aria-label="Primary glow color"
                  />
                  <Slider
                    id="primaryIntensity"
                    value={[primaryIntensity]}
                    onValueChange={([value]) => setPrimaryIntensity(value)}
                    max={30}
                    step={1}
                    aria-label="Primary glow intensity"
                  />
                  <span className="text-sm text-muted-foreground w-12">
                    {(primaryIntensity / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {glowStyle !== 'single' && (
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center gap-4">
                    <input
                      id="secondaryColor"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-8 rounded cursor-pointer"
                      aria-label="Secondary glow color"
                    />
                    <Slider
                      id="secondaryIntensity"
                      value={[secondaryIntensity]}
                      onValueChange={([value]) => setSecondaryIntensity(value)}
                      max={20}
                      step={1}
                      aria-label="Secondary glow intensity"
                    />
                    <span className="text-sm text-muted-foreground w-12">
                      {(secondaryIntensity / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation">Animation</Label>
              <Tabs
                id="animation"
                value={glowAnimation}
                onValueChange={onGlowAnimationChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="none">None</TabsTrigger>
                  <TabsTrigger value="pulse">Pulse</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
