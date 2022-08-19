import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './copy-button2.js';

const jiraTabCss = ".jira-tab.sc-jira-tab{display:flex;flex-direction:column;gap:0.5em}.jira-tab.sc-jira-tab .issue-title.sc-jira-tab{font-family:inherit;background:#fff;-webkit-box-shadow:0 1px 2px 0 rgba(34, 36, 38, 0.15);box-shadow:0 1px 2px 0 rgba(34, 36, 38, 0.15);padding:0.3em;border-radius:0.28571429rem;border:1px solid rgba(34, 36, 38, 0.15);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.jira-tab.sc-jira-tab .actions.sc-jira-tab{display:flex;flex-direction:row;gap:0.5em}";

const JiraTab$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  getJiraLink() {
    return `${this.jiraBaseUrl}/browse/${this.jiraIssueKey}`;
  }
  getOtherActions() {
    switch (typeof this.actions) {
      case 'string':
        return JSON.parse(this.actions);
      case 'object':
        return this.actions;
    }
  }
  render() {
    var _a;
    console.log('this.actions:', this.actions);
    const otherActions = this.getOtherActions();
    console.log('otherActions:', otherActions);
    return (h("div", { class: "jira-tab" }, h("div", { class: "issue-title" }, this.issueTitle), h("div", { class: "actions" }, h("copy-button", { text: "Link", copyText: this.getJiraLink() }), (_a = otherActions.map(action => h("copy-button", { text: action.name, copyText: action.content }))) !== null && _a !== void 0 ? _a : null)));
  }
  static get style() { return jiraTabCss; }
}, [2, "jira-tab", {
    "issueTitle": [1, "issue-title"],
    "actions": [1],
    "jiraIssueKey": [1, "jira-issue-key"],
    "jiraBaseUrl": [1, "jira-base-url"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["jira-tab", "copy-button"];
  components.forEach(tagName => { switch (tagName) {
    case "jira-tab":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, JiraTab$1);
      }
      break;
    case "copy-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const JiraTab = JiraTab$1;
const defineCustomElement = defineCustomElement$1;

export { JiraTab, defineCustomElement };
