// local dependencies
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";

export interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUser(props: UserProps): User {
    return new User(
      new Attributes<UserProps>(props),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl),
    );
  }
}
