'use strict';

import './styling.content.scss';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts
import $ from 'jquery';
import { listenForSettingChanges, settingsStorage } from 'utils';
import { SettingId } from 'utils/src/types';

/** Enable the custom styling feature */
const enableStyling = (enabled: boolean) => {
  if (enabled) {
    $('#jira-frontend').addClass('jira-plus-styling');
  } else {
    $('#jira-frontend').removeClass('jira-plus-styling');
  }
};

// Styling
settingsStorage.getSetting<boolean>(SettingId.STYLING, enableStyling);

// Listen for setting changes
listenForSettingChanges({
  [SettingId.STYLING]: enableStyling,
});
