import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const copyButtonCss = "*.sc-copy-button{font-family:\"Amazon Ember\", sans-serif}button.sc-copy-button{background-color:#fff;border:1px solid #d5d9d9;border-radius:0.275rem;box-shadow:rgba(213, 217, 217, 0.5) 0 2px 5px 0;box-sizing:border-box;color:#0f1111;cursor:pointer;display:inline-block;padding:0.3em 0.8em;position:relative;text-align:center;text-decoration:none;user-select:none;-webkit-user-select:none;touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;transition:background-color 0.2s ease-in-out, color 0.2s ease-in-out}button.sc-copy-button:hover{background-color:#f7fafa}button.sc-copy-button:focus{border-color:#008296;box-shadow:rgba(213, 217, 217, 0.5) 0 2px 5px 0;outline:0}button.copied.sc-copy-button{background-color:#b3e7b3}div.copied-indicator.sc-copy-button{position:absolute;top:calc(100% + 0.5em);left:50%;transform:translateX(-50%);opacity:0;background-color:#0f1111;color:white;padding:0.3em 0.6em;border-radius:0.245rem;animation-duration:0.15s}div.copied-indicator.hidden.sc-copy-button{animation-name:fadeOutUp}div.copied-indicator.visible.sc-copy-button{opacity:1;animation-name:fadeInDown}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-20px) translateX(-50%)}100%{opacity:1;transform:translateY(0) translateX(-50%)}}@keyframes fadeOutUp{0%{opacity:1;transform:translateY(0) translateX(-50%)}100%{opacity:0;transform:translateY(-20px) translateX(-50%)}}";

const CopyButton = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.copyToClipboard = () => {
      navigator.clipboard.writeText(this.copyText);
      this.showStatus = true;
      setTimeout(() => {
        this.showStatus = false;
      }, 3 * 1000);
    };
  }
  render() {
    return (h("button", { class: this.showStatus === true ? 'copied' : '', onClick: this.copyToClipboard }, this.text, h("div", { class: 'copied-indicator' + (this.showStatus === true ? ' visible' : '') + (this.showStatus === false ? ' hidden' : '') }, "Copied")));
  }
  static get style() { return copyButtonCss; }
}, [2, "copy-button", {
    "text": [1],
    "copyText": [1, "copy-text"],
    "showStatus": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["copy-button"];
  components.forEach(tagName => { switch (tagName) {
    case "copy-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CopyButton);
      }
      break;
  } });
}
defineCustomElement();

export { CopyButton as C, defineCustomElement as d };
