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
export {
  SettingsStorage,
  listenForAllSettingsChanges,
  listenForSettingChanges,
  settingsStorage
};
