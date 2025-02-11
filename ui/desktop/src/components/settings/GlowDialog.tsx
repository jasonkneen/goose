import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GlowSettings as GlowSettingsType } from './types';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface GlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: GlowSettingsType;
  onChange: (settings: GlowSettingsType) => void;
}

export function GlowDialog({ open, onOpenChange, settings, onChange }: GlowDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[300px] p-4">
          <div className="flex flex-col space-y-4">
            <Dialog.Title className="text-lg font-semibold">Background Effect</Dialog.Title>

            <div className="flex items-center justify-between">
              <Label htmlFor="glow-enabled">Enable Glow</Label>
              <Switch
                id="glow-enabled"
                checked={settings.enabled}
                onCheckedChange={(checked) => onChange({ ...settings, enabled: checked })}
              />
            </div>

            {settings.enabled && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="glow-style">Style</Label>
                  <div className="grid grid-cols-2 gap-2" id="glow-style">
                    {(['single', 'dual', 'multi', 'rainbow'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => onChange({ ...settings, style })}
                        className={`px-3 py-1.5 text-sm rounded-md capitalize ${
                          settings.style === style
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="glow-animation">Animation</Label>
                  <div className="grid grid-cols-2 gap-2" id="glow-animation">
                    {(['none', 'pulse'] as const).map((anim) => (
                      <button
                        key={anim}
                        onClick={() => onChange({ ...settings, animation: anim })}
                        className={`px-3 py-1.5 text-sm rounded-md capitalize ${
                          settings.animation === anim
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {anim}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="glow-colors">Colors</Label>
                  <div className="grid grid-cols-2 gap-4" id="glow-colors">
                    <div>
                      <input
                        type="color"
                        id="primary-color"
                        value={settings.primaryColor}
                        onChange={(e) => onChange({ ...settings, primaryColor: e.target.value })}
                        className="w-full h-8 rounded cursor-pointer"
                        aria-label="Primary color"
                        title="Primary color"
                      />
                      <div className="text-xs text-center mt-1 text-gray-500">Primary</div>
                    </div>
                    {settings.style !== 'single' && (
                      <div>
                        <input
                          type="color"
                          id="secondary-color"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            onChange({ ...settings, secondaryColor: e.target.value })
                          }
                          className="w-full h-8 rounded cursor-pointer"
                          aria-label="Secondary color"
                          title="Secondary color"
                        />
                        <div className="text-xs text-center mt-1 text-gray-500">Secondary</div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <Dialog.Close className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
