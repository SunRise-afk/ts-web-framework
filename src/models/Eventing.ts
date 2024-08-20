export class Eventing {
  events: { [key: string]: Array<() => void> } = {};

  on = (eventName: string, cb: () => void): void => {
    const events = this.events[eventName] || [];
    events.push(cb);
    this.events[eventName] = events;
  };

  trigger = (eventName: string): void => {
    const events = this.events[eventName];
    if (!events || !events.length) return;
    events.forEach((cb) => cb());
  };
}
