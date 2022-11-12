import { SettingsStorage } from './storage';
import { Messages, SettingId } from './types';

export const settingsStorage = new SettingsStorage();

export const listenForSettingsChanges = (callbacks: {
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
