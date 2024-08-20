// local dependencies
import { Sync } from "./Sync";
import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";

export interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

const rootUrl = "http://localhost:3000";

export class User {
  attributes: Attributes<UserProps>;
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync(rootUrl);

  constructor(props: UserProps) {
    this.attributes = new Attributes<UserProps>(props);
  }
}
