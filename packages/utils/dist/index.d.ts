declare enum SettingId {
    EPIC_LINKS = "jira_plus_epic_links",
    COLORED_EPICS = "jira_plus_colored_epics",
    STYLING = "jira_plus_styling",
    BRANCHNAMES = "jira_plus_branchnames"
}

declare class SettingsStorage {
    getSetting: <T>(settingKey: SettingId, cb?: ((result: T) => void) | undefined) => void;
    getSettings: <T>(settingKeys: SettingId[], cb?: ((result: Record<SettingId, T>) => void) | undefined) => void;
    setSetting: <T>(settingKey: SettingId, value: T, onSuccess?: ((value: T) => void) | undefined) => void;
}

declare const settingsStorage: SettingsStorage;
declare const listenForSettingChanges: (callbacks: {
    jira_plus_epic_links?: ((value: boolean) => void) | undefined;
    jira_plus_colored_epics?: ((value: boolean) => void) | undefined;
    jira_plus_styling?: ((value: boolean) => void) | undefined;
    jira_plus_branchnames?: ((value: boolean) => void) | undefined;
}) => void;
declare const listenForAllSettingsChanges: (callback: (settings: Record<SettingId, boolean>) => void) => void;

export { SettingsStorage, listenForAllSettingsChanges, listenForSettingChanges, settingsStorage };
