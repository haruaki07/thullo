/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickoutside?: (event: MouseEvent) => void;
    onconsider?: (event: any) => void;
    onfinalize?: (event: any) => void;
  }
}
