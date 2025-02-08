import React from 'react';
import { Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Document } from './icons';
import { useModel } from './settings/models/ModelContext';
import { useRecentModels } from './settings/models/RecentModels';

export default function BottomMenu({ hasMessages }) {
  const navigate = useNavigate();
  const { currentModel, switchModel } = useModel();
  const { recentModels } = useRecentModels();

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

        <div className="flex items-center gap-4">
          {/* Simple Model Selector */}
          <select
            value={currentModel?.name || ''}
            onChange={(e) => {
              const model = recentModels.find((m) => m.name === e.target.value);
              if (model) {
                switchModel(model);
              }
            }}
            className="bg-transparent text-sm text-muted-foreground hover:text-foreground border border-border/30 rounded px-2 py-1"
            aria-label="Select AI Model"
          >
            {recentModels.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>

          {/* Settings Button */}
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Sliders className="h-4 w-4 rotate-90" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
