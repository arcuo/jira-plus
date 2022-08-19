import type { Components, JSX } from "../dist/types/components";

interface CopyButton extends Components.CopyButton, HTMLElement {}
export const CopyButton: {
  prototype: CopyButton;
  new (): CopyButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
