import { writable } from "svelte/store";

export let sidebarShow = writable(false);

export const openSidebar = () => {
  sidebarShow.set(true);
};

export const closeSidebar = () => {
  sidebarShow.set(false);
};
