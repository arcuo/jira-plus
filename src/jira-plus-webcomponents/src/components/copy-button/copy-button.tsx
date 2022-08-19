import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'copy-button',
  styleUrl: 'copy-button.scss',
})
export class CopyButton {
  @State() copied = false;
  @Prop() text: string;
  @Prop() copyText: string;

  copyToClipboard = () => {
    navigator.clipboard.writeText(this.copyText);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2 * 1000);
  };

  render() {
    return (
      <Host>
        <button class={this.copied ? 'copied' : ''} onClick={this.copyToClipboard}>
          {this.text}
        </button>
        {this.copied && <span class="copied-indicator">Copied</span>}
      </Host>
    );
  }
}
