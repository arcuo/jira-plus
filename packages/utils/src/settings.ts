import { SettingsStorage } from './storage';
import { Messages, SettingId } from './types';

export const settingsStorage = new SettingsStorage();

export const listenForSettingChanges = (callbacks: {
  [key in SettingId]?: (value: boolean) => void;
}) => {
  chrome.runtime.onMessage.addListener(
    (
      request: {
        message: Messages;
        settingId: SettingId;
        value: boolean;
      },
      sender,
      sendResponse
    ) => {
      if (request.message === Messages.SETTING_CHANGED) {
        const { settingId, value } = request;
        if (callbacks[settingId]) callbacks[settingId]!(value);
      }
    }
  );
};

export const listenForAllSettingsChanges = (
  callback: (settings: Record<SettingId, boolean>) => void
) => {
  chrome.runtime.onMessage.addListener(
    (
      request: {
        message: Messages;
        settingId: SettingId;
        value: boolean;
      },
      sender,
      sendResponse
    ) => {
      if (request.message === Messages.SETTING_CHANGED) {
        chrome.storage.sync.get(Object.values(SettingId), (result) => {
          callback(result as Record<SettingId, boolean>);
        });
      }
    }
  );
};
