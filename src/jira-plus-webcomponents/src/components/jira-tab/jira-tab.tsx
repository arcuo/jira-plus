import { Component, h, Prop } from '@stencil/core';

export type Action = { name: string; content: string };

@Component({
  tag: 'jira-tab',
  styleUrl: 'jira-tab.scss',
  scoped: true,
})
export class JiraTab {
  /**
   * Title of the tab, i.e. the title of the jira issue
   */
  @Prop() issueTitle: string;

  @Prop() actions?: string | Action[];

  /**
   * jira issue key
   */
  @Prop() jiraIssueKey: string;

  /** JIRA url */
  @Prop() jiraBaseUrl: string;

  private getJiraLink(): string {
    return `${this.jiraBaseUrl}/browse/${this.jiraIssueKey}`;
  }

  getOtherActions(): Action[] {
    switch (typeof this.actions) {
      case 'string':
        return JSON.parse(this.actions);
      case 'object':
        return this.actions;
    }
  }

  render() {
    console.log('this.actions:', this.actions);
    const otherActions = this.getOtherActions();
    console.log('otherActions:', otherActions);
    return (
      <div class="jira-tab">
        <div class="issue-title">{this.issueTitle}</div>
        <div class="actions">
          <copy-button text="Link" copyText={this.getJiraLink()}></copy-button>

          {otherActions.map(action => <copy-button text={action.name} copyText={action.content}></copy-button>) ?? null}
        </div>
      </div>
    );
  }
}
