interface UserProps {
  name?: string;
  age?: number;
}

export class User {
  events: { [key: string]: Array<() => void> } = {};

  constructor(private data: UserProps) {}

  get(propName: keyof UserProps): string | undefined | number {
    return this.data[propName];
  }

  set(data: UserProps) {
    Object.assign(this.data, data);
  }

  on(eventName: string, cb: () => void): void {
    const events = this.events[eventName] || [];
    events.push(cb);
    this.events[eventName] = events;
  }

  trigger(eventName: string): void {
    const events = this.events[eventName];
    if (!events || !events.length) return;
    events.forEach((cb) => cb());
  }
}
