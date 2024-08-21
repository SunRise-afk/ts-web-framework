// outsource dependencies
import { AxiosResponse } from "axios";

// local dependencies
import { Sync } from "./Sync";
import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";

export interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  attributes: Attributes<UserProps>;
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync(rootUrl);

  constructor(props: UserProps) {
    this.attributes = new Attributes<UserProps>(props);
  }

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  get get() {
    return this.attributes.get;
  }

  set(update: UserProps) {
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
