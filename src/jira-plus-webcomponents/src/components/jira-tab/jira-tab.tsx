import { Component, h, Prop } from '@stencil/core';
import { CopyButton } from '../copy-button/copy-button';

@Component({
  tag: 'jira-tab',
  styleUrl: 'jira-tab.scss',
  shadow: true,
})
export class JiraTab {
  /**
   * Title of the tab, i.e. the title of the jira issue
   */
  @Prop() issueTitle: string;

  /**
   * jira issue key
   */
  @Prop() jiraIssueKey: string;

  /** JIRA url */
  @Prop() jiraBaseUrl: string;

  private getJiraLink(): string {
    return `${this.jiraBaseUrl}/browse/${this.jiraIssueKey}`;
  }

  render() {
    return (
      <div class="jira-tab">
        <div class="issue-title">{this.issueTitle}</div>
        <div class="actions">
          <CopyButton text="Link" copyText={this.getJiraLink()}></CopyButton>
        </div>
      </div>
    );
  }
}
