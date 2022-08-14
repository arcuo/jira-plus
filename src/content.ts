'use strict';

import "./content.scss";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts
import $ from 'jquery';
import { SettingsStorage } from './storage';
import { Messages, SettingId } from './types';

const settingsStorage = new SettingsStorage();

/** Storing whether or not the epics setting is enabled. Updated on first call to `setEpicLinks` */
let epicsSettingEnabled = false;

/** Enable the custom styling feature */
const enableStyling = (enabled: boolean) => {
  if (enabled) {
    $('#jira-frontend').addClass('jira-plus-styling');
  } else {
    $('#jira-frontend').removeClass('jira-plus-styling');
  }
}

// Detect dom changes for react re-renders
const observer = new MutationObserver(function (mutations_list) {
  mutations_list.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (added_node) {
      const element = added_node as Element;
      if (element.classList && element.classList.contains('ghx-swimlane')) {
        observer.disconnect();
        setEpicLinks(epicsSettingEnabled);
      }
    });
  });
});

const startObserve = () => observer.observe(document.querySelector('#jira-frontend') as Node, { subtree: true, childList: true, });

/** Set epic links */
const setEpicLinks = (enabled: boolean) => {
  epicsSettingEnabled = enabled;
  if (!enabled) return;

  const board = $('#ghx-work #ghx-pool-column');
  let epics = board.find('.ghx-swimlane')

  // Remove issues without epics
  epics = epics.filter((index, epic) => {
    return $(epic).find('.ghx-swimlane-header.ghx-swimlane-default').length !== 1;
  });

  const epicsInfo = epics.map((index, epic) => fetchEpicInfo(epic)).toArray();

  // Add buttons
  epicsInfo.forEach(({ title, epicKey, element }) => {

    const heading = $(element).find('.ghx-heading span[role="button"]');
    heading.text('')

    const link = document.createElement('a');
    link.textContent = title;
    link.target = "_blank";
    link.href = `/browse/${epicKey}`;
    link.style.color = 'inherit';

    heading.append(link);

  })

  startObserve();

}


/** Fetch information for the epic */
const fetchEpicInfo = (epic: HTMLElement) => {
  const title = $(epic).find('.ghx-heading > span[role="button"]').text(); // Epic title
  const epicKey = $(epic).find('[data-epickey]').attr('data-epickey'); // Epic key

  return { title, epicKey, element: epic }
}

// Epics
settingsStorage.getSetting<boolean>(SettingId.EPIC_LINKS, setEpicLinks);

// Styling
settingsStorage.getSetting<boolean>(SettingId.STYLING, enableStyling);


// Listen for setting changes

chrome.runtime.onMessage.addListener((request: {
  message: Messages,
  settingId: SettingId,
  value: boolean,
}, sender, sendResponse) => {
  if (request.message === Messages.SETTING_CHANGED) {
    const { settingId, value } = request;

    switch (settingId) {
      case SettingId.EPIC_LINKS: {
        setEpicLinks(value);
        break;
      }
      case SettingId.STYLING: {
        enableStyling(value);
        break;
      }
    }
  }
})
