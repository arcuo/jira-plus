'use strict';

import $ from 'jquery';
import './popup.scss';
import { SettingsStorage } from './storage';
import { SettingId } from './types';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions

  let epicSettingChanged = false;

  const settingsStorage = new SettingsStorage();

  const handleCheckbox = (settingId: SettingId, callback?: (value: boolean) => void) => {

    settingsStorage.getSetting<boolean>(settingId, (result) => {
      const settingInput = $<HTMLInputElement>(`#${settingId} input`);
      if (typeof result === 'boolean') {
        settingInput.prop('checked', result);
      }
      settingInput.on('change', (e) => {
        settingsStorage.setSetting<boolean>(settingId, (e.target as HTMLInputElement).checked, callback);
      })
    });


  }

  // Epics links 
  handleCheckbox(SettingId.EPIC_LINKS, () => {
    epicSettingChanged = !epicSettingChanged;
    if (epicSettingChanged) {
      $(`div.requires-reload`)[0].style.display = 'flex';
    } else {
      $(`div.requires-reload`)[0].style.display = 'none';
    }
  });

  // Styling
  handleCheckbox(SettingId.STYLING);

  // Branch names
  handleCheckbox(SettingId.BRANCHNAMES);

  // Reload page handling
  const reloadButton = $('#reload-button');
  reloadButton.on('click', () => {
    chrome.tabs.query({ url: '*://*.atlassian.net/*' }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        const tabId = tabs[0].id;
        chrome.tabs.reload(tabId);
        reloadButton.addClass('loading');
        chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
          if (id === tabId && changeInfo.status === 'complete') {
            epicSettingChanged = false;
            $(`div.requires-reload`)[0].style.display = 'none';
            reloadButton.removeClass('loading');
          }
        })
      }
    })
  });

})();
