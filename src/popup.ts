'use strict';

import $ from 'jquery';
import './popup.scss';
import { SettingsStorage } from './storage';
import { SettingId } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {  } from "jira-plus-webcomponents";
defineCustomElement();

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

    settingsStorage.getSetting<boolean | undefined>(settingId, (result) => {
      const settingInput = $<HTMLInputElement>(`#${settingId} input`);
      if (result === undefined) {
        settingInput.prop('checked', true);
        settingsStorage.setSetting(settingId, true);
      }

      if (typeof result === 'boolean') {
        settingInput.prop('checked', result);
      }

      settingInput.on('change', (e) => {
        settingsStorage.setSetting<boolean>(settingId, (e.target as HTMLInputElement).checked, callback);
      })
    });

  }

  // Requires reload button handling
  const showReloadButton = (reloadRequired: boolean) => {
    if (reloadRequired) {
      $(`div.requires-reload`)[0].style.display = 'flex';
    } else {
      $(`div.requires-reload`)[0].style.display = 'none';
    }
  }

  // Epics links 
  handleCheckbox(SettingId.EPIC_LINKS, () => {
    epicSettingChanged = !epicSettingChanged;
    showReloadButton(epicSettingChanged);
  });

  // Github markdown
  handleCheckbox(SettingId.GITHUB_MARKDOWN);

  // Styling
  handleCheckbox(SettingId.STYLING);

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
            showReloadButton(false);
            reloadButton.removeClass('loading');
          }
        })
      }
    })
  });

  // Export JIRA content handling

  // Get JIRA tabs for features

  const setJiraTabs = () => {
    const jiraTabsElement = $('#copy-from-jira .jira-tabs');
    jiraTabsElement.empty();
    chrome.tabs.query({ url: '*://*.atlassian.net/browse/*' }, (tabs) => {
      if (tabs.length === 0) {
        jiraTabsElement.addClass('no-tabs');
        return;
      }

      tabs.forEach(tab => {
        const { title } = tab;
        const component = document.createElement('my-component');
        component.setAttribute('first', title ?? "");
        jiraTabsElement.append(component);
      })
    })
  }

  setJiraTabs();

  chrome.tabs.onUpdated.addListener(() => setJiraTabs());

})();
