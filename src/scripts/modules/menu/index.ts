import { dom } from './dom.ts';

function initMenu() {
  const { menu, tabs, panels, placeholder } = dom;

  if (!menu || !tabs || !panels || !placeholder) {
    return;
  }

  function setContainerHeight(tabIndex: number, delay: number) {
    const container = document.querySelector('main');
    const wrapper = panels[tabIndex].querySelector('[data-wrapper]');

    if (wrapper instanceof HTMLElement && container instanceof HTMLElement) {
      setTimeout(() => {
        container.style.height = `${wrapper.offsetHeight + 32 * 2}px`;
      }, delay);
    }
  }
  setContainerHeight(0, 0);

  function switchTab(currentTab: HTMLButtonElement, tabIndex: number) {
    for (const tab of tabs) {
      tab.classList.remove(`${tab.classList[0]}--is-active`);
      tab.ariaSelected = 'false';
    }
    currentTab.classList.add(`${currentTab.classList[0]}--is-active`);
    currentTab.ariaSelected = 'true';

    const gap = getComputedStyle(menu).columnGap;
    const step = tabIndex;
    placeholder.style.translate = `calc((100% + ${gap}) * ${step}) 0`;
  }

  function switchPanel(tabIndex: number) {
    for (const panel of panels) {
      panel.classList.remove(`${panel.classList[0]}--is-active`);
      // panel.tabIndex = -1;
      panel.ariaHidden = 'true';

      panel.style.translate = `calc(100% * ${-tabIndex}) 0`;
    }
    panels[tabIndex].classList.add(`${panels[tabIndex].classList[0]}--is-active`);
    // panels[tabIndex].tabIndex = 0;
    panels[tabIndex].ariaHidden = 'false';
  }

  menu.addEventListener('click', (event) => {
    const currentTab = (event.target as Element).closest('button');
    if (!currentTab) {
      return;
    }

    const tabIndex = [...tabs].indexOf(currentTab);

    switchTab(currentTab, tabIndex);
    switchPanel(tabIndex);
    setContainerHeight(tabIndex, 150);

    window.addEventListener('resize', () => {
      setContainerHeight(tabIndex, 150);
    });
  });

  let isThrottled = false;
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (isThrottled) return;
    const currentWidth = window.innerWidth;

    if (currentWidth !== lastWidth) {
      isThrottled = true;
      setContainerHeight(0, 0);
      lastWidth = currentWidth;

      setTimeout(() => (isThrottled = false), 200);
    }
  });
}
initMenu();
