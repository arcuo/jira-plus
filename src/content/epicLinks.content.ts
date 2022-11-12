'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts
import $ from 'jquery';
import { listenForSettingsChanges, settingsStorage } from '../settings';
import { SettingId } from '../types';

/** Storing whether or not the epics setting is enabled. Updated on first call to `setEpicLinks` */
let epicsSettingEnabled = false;

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

const startObserve = () => {
  observer.observe(document.querySelector('#jira-frontend') as Node, {
    subtree: true,
    childList: true,
  });
};

const getEpics = () => {
  const board = $('#ghx-work #ghx-pool-column');
  let epics = board.find('.ghx-swimlane');

  // Remove issues without epics
  epics = epics.filter((index, epic) => {
    return (
      $(epic).find('.ghx-swimlane-header.ghx-swimlane-default').length !== 1
    );
  });

  return epics;
};

/** Set epic links */
const setEpicLinks = (enabled: boolean) => {
  epicsSettingEnabled = enabled;
  if (!enabled) return;

  const epics = getEpics();

  const epicsInfo = epics.map((index, epic) => fetchEpicInfo(epic)).toArray();

  // Add buttons
  epicsInfo.forEach(({ title, epicKey, element }) => {
    const heading = $(element).find('.ghx-heading span[role="button"]');
    heading.text('');

    const link = document.createElement('a');
    link.textContent = title;
    link.target = '_blank';
    link.href = `/browse/${epicKey}`;
    link.style.color = 'inherit';

    heading.append(link);
  });

  startObserve();
};

/** Fetch information for the epic */
const fetchEpicInfo = (epic: HTMLElement) => {
  const title = $(epic).find('.ghx-heading > span[role="button"]').text(); // Epic title
  const epicKey = $(epic).find('[data-epickey]').attr('data-epickey'); // Epic key

  return { title, epicKey, element: epic };
};

// Epics
settingsStorage.getSetting<boolean>(SettingId.EPIC_LINKS, setEpicLinks);

// Listen for setting changes
listenForSettingsChanges({
  [SettingId.EPIC_LINKS]: setEpicLinks,
});
