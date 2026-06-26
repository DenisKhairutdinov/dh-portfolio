import { dom } from './dom.ts';

function initProjectCards() {
  const { projectCards } = dom;

  if (!projectCards) {
    return;
  }

  projectCards.addEventListener('mouseover', (event) => {
    const card = (event.target as HTMLElement).closest('.project');
    if (!card) {
      return;
    }

    const video = card.querySelector('video');
    if (!video) {
      return;
    }

    video.play();
  });

  projectCards.addEventListener('mouseout', (event) => {
    const card = (event.target as HTMLElement).closest('.project');
    if (!card) {
      return;
    }

    const video = card.querySelector('video');
    if (!video) {
      return;
    }

    video.pause();
  });

  projectCards.addEventListener('focusin', (event) => {
    const card = (event.target as HTMLElement).closest('.project');
    if (!card) {
      return;
    }

    const video = card.querySelector('video');
    if (!video) {
      return;
    }

    if (card.matches(':focus-visible')) {
      video.play();
    }
  });

  projectCards.addEventListener('focusout', (event) => {
    const card = (event.target as HTMLElement).closest('.project');
    if (!card) {
      return;
    }

    const video = card.querySelector('video');
    if (!video) {
      return;
    }

    video.pause();
  });
}
initProjectCards();
