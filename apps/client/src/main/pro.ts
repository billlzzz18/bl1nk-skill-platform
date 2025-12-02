import { readSettings, writeSettings } from "./settings";

export function handleBl1nkProReturn({ apiKey }: { apiKey: string }) {
  const settings = readSettings();
  writeSettings({
    providerSettings: {
      ...settings.providerSettings,
      auto: {
        ...settings.providerSettings.auto,
        apiKey: {
          value: apiKey,
        },
      },
    },
    enableBl1nkPro: true,
    enableBl1nkPro: true,
  });
}

// Backward compatibility alias
export const handleDyadProReturn = handleBl1nkProReturn;
