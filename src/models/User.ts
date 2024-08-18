import axios, { AxiosResponse } from "axios";

interface UserProps {
  id?: number;
  age?: number;
  name?: string;
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

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get("id");
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post("http://localhost:3000/users/", this.data);
    }
  }
}
