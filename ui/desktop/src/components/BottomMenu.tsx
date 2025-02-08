import React, { useState, useEffect, useRef } from 'react';
import { useModel } from './settings/models/ModelContext';
import { useRecentModels } from './settings/models/RecentModels';
import { Sliders } from 'lucide-react';
import { ModelRadioList } from './settings/models/ModelRadioList';
import { useNavigate } from 'react-router-dom';
import { Document, ChevronUp, ChevronDown } from './icons';

export default function BottomMenu({ hasMessages }) {
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const { currentModel } = useModel();
  const { recentModels } = useRecentModels();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add effect to handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };

    if (isModelMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModelMenuOpen]);

  // Add effect to handle Escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModelMenuOpen(false);
      }
    };

    if (isModelMenuOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModelMenuOpen]);

  let envModelProvider = null;
  if (window.electron.getConfig().GOOSE_MODEL && window.electron.getConfig().GOOSE_PROVIDER) {
    envModelProvider = `${window.electron.getConfig().GOOSE_MODEL}  - ${window.electron.getConfig().GOOSE_PROVIDER}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        {/* Directory Chooser */}
        <button
          onClick={async () => {
            console.log('Opening directory chooser');
            window.electron.directoryChooser(hasMessages ? 'false' : 'true');
          }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Document className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            Working in {window.appConfig.get('GOOSE_WORKING_DIR')}
          </span>
        </button>

        {/* Model Selector */}
        <div className="relative flex items-center" ref={dropdownRef}>
          <button
            onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
            className="flex items-center gap-2 rounded-lg border border-border/30 bg-background/50 backdrop-blur-sm px-3 py-2 text-sm font-medium hover:bg-accent/50 transition-colors"
          >
            <span>{envModelProvider || currentModel?.name || 'Select Model'}</span>
            {isModelMenuOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isModelMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-[300px] rounded-lg border border-border/30 bg-background/50 backdrop-blur-sm p-1 shadow-lg">
              <ModelRadioList
                className="divide-y divide-border"
                renderItem={({ model, isSelected, onSelect }) => (
                  <label key={model.name} className="block cursor-pointer">
                    <div
                      className="flex items-center justify-between rounded-md p-2 hover:bg-accent/80 transition-colors"
                      onClick={onSelect}
                    >
                      <div>
                        <p className="font-medium">{model.name}</p>
                        <p className="text-xs text-muted-foreground">{model.provider}</p>
                      </div>
                      <div className="relative">
                        <input
                          type="radio"
                          name="recentModels"
                          value={model.name}
                          checked={isSelected}
                          onChange={onSelect}
                          className="peer sr-only"
                        />
                        <div className="h-4 w-4 rounded-full border border-primary peer-checked:border-[6px]"></div>
                      </div>
                    </div>
                  </label>
                )}
              />
              <button
                className="mt-1 flex w-full items-center justify-between rounded-md border-t p-2 text-sm hover:bg-accent"
                onClick={() => {
                  setIsModelMenuOpen(false);
                  navigate('/settings');
                }}
              >
                <span>Tools and Settings</span>
                <Sliders className="h-4 w-4 rotate-90" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
