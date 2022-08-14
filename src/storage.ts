import { SettingId } from './types';

export class SettingsStorage {
  getSetting = <T>(settingKey: SettingId, cb: (result: T) => void) => {
    chrome.storage.sync.get([settingKey], (result) => {
      cb(result[settingKey] as T);
    });
  }

  setSetting = <T>(settingKey: SettingId, value: T, onSuccess?: (value: T) => void) => {
    console.log('value:', value);

    chrome.storage.sync.set(
      {
        [settingKey]: value,
      },
      async () => {
        // Notify content script that settings have been changed
        const tabs = await chrome.tabs.query({ url: '*://*.atlassian.net/*' });

        tabs.forEach((tab) => {
          if (!tab?.id) return;
          chrome.tabs.sendMessage(tab.id, {
            message: 'settings_changed',
            settingId: settingKey,
            value,
          });
        });

        onSuccess && onSuccess(value)
      }
    );
  }
}