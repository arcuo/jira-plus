import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'copy-button',
  styleUrl: 'copy-button.scss',
  scoped: true,
})
export class CopyButton {
  @State() showStatus: boolean | undefined;
  @Prop() text: string;
  @Prop() copyText: string;

  copyToClipboard = () => {
    navigator.clipboard.writeText(this.copyText);
    this.showStatus = true;
    setTimeout(() => {
      this.showStatus = false;
    }, 3 * 1000);
  };

  render() {
    return (
      <button class={this.showStatus === true ? 'copied' : ''} onClick={this.copyToClipboard}>
        {this.text}

        {/* Copied indicator popup */}
        <div class={'copied-indicator' + (this.showStatus === true ? ' visible' : '') + (this.showStatus === false ? ' hidden' : '')}>Copied</div>
      </button>
    );
  }
}
