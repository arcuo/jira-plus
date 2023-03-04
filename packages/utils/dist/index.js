"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  SettingsStorage: () => SettingsStorage,
  listenForAllSettingsChanges: () => listenForAllSettingsChanges,
  listenForSettingChanges: () => listenForSettingChanges,
  settingsStorage: () => settingsStorage
});
module.exports = __toCommonJS(src_exports);

// src/storage.ts
var SettingsStorage = class {
  constructor() {
    this.getSetting = (settingKey, cb) => {
      chrome.storage.sync.get([settingKey], (result) => {
        cb && cb(result[settingKey]);
      });
    };
    this.getSettings = (settingKeys, cb) => {
      chrome.storage.sync.get(settingKeys, (result) => {
        const results = result;
        cb && cb(results);
      });
    };
    this.setSetting = (settingKey, value, onSuccess) => {
      chrome.storage.sync.set(
        {
          [settingKey]: value
        },
        async () => {
          const tabs = await chrome.tabs.query({ url: "*://*.atlassian.net/*" });
          tabs.forEach((tab) => {
            if (!tab?.id)
              return;
            chrome.tabs.sendMessage(tab.id, {
              message: "settings_changed",
              settingId: settingKey,
              value
            });
          });
          onSuccess && onSuccess(value);
        }
      );
    };
  }
};

// src/types.ts
var SettingId = /* @__PURE__ */ ((SettingId2) => {
  SettingId2["EPIC_LINKS"] = "jira_plus_epic_links";
  SettingId2["COLORED_EPICS"] = "jira_plus_colored_epics";
  SettingId2["STYLING"] = "jira_plus_styling";
  SettingId2["BRANCHNAMES"] = "jira_plus_branchnames";
  return SettingId2;
})(SettingId || {});

// src/settings.ts
var settingsStorage = new SettingsStorage();
var listenForSettingChanges = (callbacks) => {
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "settings_changed" /* SETTING_CHANGED */) {
        const { settingId, value } = request;
        if (callbacks[settingId])
          callbacks[settingId](value);
      }
    }
  );
};
var listenForAllSettingsChanges = (callback) => {
  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.message === "settings_changed" /* SETTING_CHANGED */) {
        chrome.storage.sync.get(Object.values(SettingId), (result) => {
          callback(result);
        });
      }
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SettingsStorage,
  listenForAllSettingsChanges,
  listenForSettingChanges,
  settingsStorage
});
