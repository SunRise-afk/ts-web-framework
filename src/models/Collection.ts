// outsource dependencies
import axios, { AxiosResponse } from "axios";

// local dependencies
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: Array<T> = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (data: K) => T,
  ) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    axios.get(this.rootUrl).then((response: AxiosResponse): void => {
      (response.data || []).forEach((item: K) => {
        this.models.push(this.deserialize(item));
      });
    });

    this.trigger("change");
  }
}
