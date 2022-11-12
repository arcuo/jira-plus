'use strict';

import { settingsStorage } from '../settings';
import { SettingId } from '../types';

// Content script file will run in the context of web page.

const portalObserver = new MutationObserver(function () {
  settingsStorage.getSetting(SettingId.BRANCHNAMES, (enabled) => {
    if (!enabled) return;
    detectCreateBranchDropdownInput();
  });
});

/** Observer that finds the portalContainer */
new MutationObserver(function (_, p_observer) {
  const portalContainer = document.querySelector('.atlaskit-portal-container');
  if (portalContainer) {
    portalObserver.observe(portalContainer as Node, {
      subtree: true,
      childList: true,
    });
    p_observer.disconnect();
  }
}).observe(document.body, { childList: true });

const detectCreateBranchDropdownInput = () => {
  const createBranchDropdown = document.querySelector(
    '[data-testid="development-summary-branch.ui.create-branch-dropdown.git-command-section"]'
  );

  if (createBranchDropdown) {
    const input = createBranchDropdown.querySelector<HTMLInputElement>(
      'input[data-testid*="platform-copy-text-field"]'
    );
    const currentCopy = input?.value;
    if (!currentCopy) return;

    // Get breadcrumb string
    const breadcrumbs = document.querySelectorAll(
      '#jira-issue-header nav ol > div'
    );

    if (!breadcrumbs) return;
    const issueList = Array.from(breadcrumbs)
      .map((breadcrumb) => breadcrumb.textContent)
      .filter((text) => /([A-Z]+-[0-9]+)/.test(text ?? ''))
      .join('/');

    const newCopy = currentCopy?.replace(
      /^(git checkout -b )([A-Z]+-[0-9]+)\/(.*)$/g,
      `$1${issueList}/$3`
    );

    console.debug(`Replacing copy from '${currentCopy}' to ${newCopy}`);
    input.value = newCopy;
  }
};
