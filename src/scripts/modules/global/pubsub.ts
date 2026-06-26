export type EventName =
  | 'castpress: open-request'
  | 'castpress: close'
  | 'mndance: open-request'
  | 'mndance: close'
  | 'onehp: open-request'
  | 'onehp: close'
  | 'design: open-request'
  | 'design: close';

export const pubSub = {
  events: {} as Record<EventName, Array<(payload: unknown) => void>>,
  subscribe(event: EventName, handler: (payload: unknown) => void) {
    (pubSub.events[event] ??= []).push(handler);
  },
  publish(event: EventName, payload?: unknown) {
    const handlers = pubSub.events[event] || [];
    for (const handle of handlers) {
      handle(payload);
    }
  },
};
