import type { Components, JSX } from "../dist/types/components";

interface JiraTab extends Components.JiraTab, HTMLElement {}
export const JiraTab: {
  prototype: JiraTab;
  new (): JiraTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
