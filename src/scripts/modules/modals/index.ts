import { pubSub } from '../global/pubsub';
import type { EventName } from '../global/pubsub';
import { dom } from './dom';

function toggleModal(subEvent: EventName, modal: HTMLDialogElement) {
  pubSub.subscribe(subEvent, () => {
    if (modal.open) {
      modal.close();
    } else {
      modal.showModal();
    }
  });
}

function playPauseVideo(subEvent: EventName, video: HTMLVideoElement) {
  pubSub.subscribe(subEvent, () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

function resetButtonState(subEvent: EventName, button: HTMLButtonElement) {
  pubSub.subscribe(subEvent, () => {
    button.setAttribute('aria-expanded', 'false');
  });
}

function initModals() {
  const { modals, buttons, videos } = dom;

  if (!modals || !buttons || !videos) {
    return;
  }

  let lastClickedButton: HTMLButtonElement;

  for (const modal of modals) {
    toggleModal(modal.dataset.subEvent as EventName, modal);
    modal.addEventListener('close', () => {
      pubSub.publish(modal.dataset.pubEvent as EventName);
      lastClickedButton.focus();
    });
  }

  for (const video of videos) {
    playPauseVideo(video.dataset.subEvent as EventName, video);
  }

  for (const button of buttons) {
    resetButtonState(button.dataset.subEvent as EventName, button);
  }

  document.addEventListener('click', (event) => {
    const eventButton = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-event-button]',
    );

    if (!eventButton) {
      return;
    }

    const link = (event.target as HTMLLinkElement).closest<HTMLLinkElement>('a');

    if (link) {
      return;
    }

    lastClickedButton = eventButton;
    pubSub.publish(eventButton.dataset.pubEvent as EventName);
    lastClickedButton.setAttribute('aria-expanded', 'true');
  });
}
initModals();
