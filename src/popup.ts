'use strict';

import $ from 'jquery';
import './popup.css';
import { SettingId } from './types';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const settingsStorage = {
    get: <T>(settingKey: SettingId, cb: (result: T) => void) => {
      chrome.storage.sync.get([settingKey], (result) => {
        cb(result[settingKey] as T);
      });
    },
    set: <T>(settingKey: SettingId, value: T, onSuccess?: (value: T) => void) => {
      chrome.storage.sync.set(
        {
          [settingKey]: value,
        },
        () => onSuccess && onSuccess(value)
      );
    },
  };

  const setSettingInput = (settingId: SettingId) => {

    settingsStorage.get<boolean>(settingId, (result) => {
      const settingInput = $<HTMLInputElement>(`#${settingId} input`);
      settingInput.prop('checked', result);
      settingInput.on('change', (e) => {
        settingsStorage.set(settingId, (e.target as HTMLInputElement).checked);
      })
    });


  }

  // Epics links 
  setSettingInput(SettingId.EPIC_LINKS);
})();
