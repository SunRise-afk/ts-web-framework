// outsource dependencies
import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  getAll: () => T;
  set: (update: T) => void;
  get: <K extends keyof T>(key: K) => T[K];
}
interface Sync<T> {
  save: (data: T) => AxiosPromise;
  fetch: (id: number) => AxiosPromise;
}
interface Events {
  trigger: (eventName: string) => void;
  on: (eventName: string, cb: () => void) => void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>,
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T) {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch() {
    const id = this.get("id");
    if (!id && id !== 0) {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save() {
    this.sync
      .save(this.attributes.getAll())
      .then(() => this.events.trigger("save"));
  }
}
