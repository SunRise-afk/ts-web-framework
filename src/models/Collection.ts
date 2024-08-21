// outsource dependencies
import axios, { AxiosResponse } from "axios";

// local dependencies
import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    axios.get(this.rootUrl).then((response: AxiosResponse): void => {
      (response.data || []).forEach((item: UserProps) => {
        this.models.push(User.buildUser(item));
      });
    });

    this.trigger("change");
  }
}
