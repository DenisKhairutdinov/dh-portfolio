export const dom = {
  menu: document.querySelector<HTMLElement>('[data-tab-menu]')!,
  tabs: document.querySelectorAll<HTMLButtonElement>('[data-tab-menu] button'),
  panels: document.querySelectorAll<HTMLElement>('[data-tab-panel]'),
  placeholder: document.querySelector<HTMLElement>('[data-tab-placeholder]')!,
};
