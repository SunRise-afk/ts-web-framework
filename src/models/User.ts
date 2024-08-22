// local dependencies
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";

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

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection(rootUrl, User.buildUser);
  }

  setRandomAge = () => {
    this.set({ age: Math.round(Math.random() * 100) });
  };
}
