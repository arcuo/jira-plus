'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const settingsStorage = {
    get: (cb: any) => {
      chrome.storage.sync.get(['jira-plus:epic-links'], (result) => {
        cb(result['jira-plus:epic-links']);
      });
    },
    set: (value: any, cb: any) => {
      chrome.storage.sync.set(
        {
          "jira-plus:epic-links": value,
        },
        () => {
          cb();
        }
      );
    },
  };
})();
