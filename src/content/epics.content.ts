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
import { debounce } from 'ts-debounce';
import { listenForAllSettingsChanges, settingsStorage } from '../settings';
import { SettingId } from '../types';
import type { EpicInfo } from '../utils';
import { fetchEpicInfo, getEpics } from '../utils';

/** Storing whether or not the epics settings are enabled. */
const settings = {
  [SettingId.EPIC_LINKS]: false,
  [SettingId.COLORED_EPICS]: false,
};

// Detect dom changes for react re-renders
const observer = new MutationObserver(function (mutations_list) {
  mutations_list.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (added_node) {
      const element = added_node as Element;
      if (element.classList && element.classList.contains('ghx-swimlane')) {
        observer.disconnect();
        debounceRunThroughEpics(settings);
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

const runThroughEpics = (options: {
  [SettingId.EPIC_LINKS]: boolean;
  [SettingId.COLORED_EPICS]: boolean;
}) => {
  const epicsSettingEnabled = options[SettingId.EPIC_LINKS];
  const coloredEpicsEnabled = options[SettingId.COLORED_EPICS];

  settings[SettingId.EPIC_LINKS] = epicsSettingEnabled;
  settings[SettingId.COLORED_EPICS] = epicsSettingEnabled;

  const nonEnabled = !epicsSettingEnabled && !coloredEpicsEnabled;
  if (nonEnabled) return;

  const epics = getEpics();
  const epicsInfo = epics.toArray().map((epic) => fetchEpicInfo(epic));

  epicsInfo.forEach((info) => {
    if (epicsSettingEnabled) {
      setEpicLink(info);
    }
    if (coloredEpicsEnabled) {
      setColoredEpic(info);
    }
  });

  startObserve();
};

const debounceRunThroughEpics = debounce(runThroughEpics, 500);

/** Set epic links */
const setEpicLink = (info: EpicInfo) => {
  const { element, title, epicKey } = info;
  const heading = $(element).find('.ghx-heading span[role="button"]');
  heading.text('');

  const link = document.createElement('a');
  link.textContent = title;
  link.target = '_blank';
  link.href = `/browse/${epicKey}`;
  link.style.color = 'inherit';

  heading.append(link);
};

// TODO - allow setting colors in settings
const colors = {
  MP: {color: '#ff5630', textColor: '#000'},
  FEAT: {color: '#6555c0', textColor: '#fff'},
  INCID: {color: '#00c7e6', textColor: '#000'},
  QA: {color: '#2684ff', textColor: '#000'},
};

type ProjectColor = Partial<typeof colors[keyof typeof colors]>;
type ProjectKey = keyof typeof colors;

/** Set color of epics by their type */
const setColoredEpic = (info: EpicInfo) => {
  const { element, title, epicKey } = info;
  const heading = $(element).find('.ghx-heading span[role="button"]');

  // Get project key from epic key
  const projectKey: ProjectKey | undefined = epicKey?.split('-')[0] as
    | ProjectKey
    | undefined;

  const {color, textColor}: ProjectColor = projectKey ? colors[projectKey] : {};

  if (!heading.length) return;

  color && heading.css('background-color', color);
  textColor && heading.css('color', textColor);
  heading.css('padding', '0.2em 0.5em');
  heading.css('border-radius', '0.28em');
};

// Settings

// Epics
settingsStorage.getSettings<boolean>(
  [SettingId.EPIC_LINKS, SettingId.COLORED_EPICS],
  (results) => {
    settings[SettingId.EPIC_LINKS] = results[SettingId.EPIC_LINKS];
    settings[SettingId.COLORED_EPICS] = results[SettingId.COLORED_EPICS];
    runThroughEpics(results);
  }
);

// Listen for setting changes
listenForAllSettingsChanges((results) => {
  runThroughEpics(results);
});
