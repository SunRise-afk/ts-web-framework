// local dependencies
import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserForm extends View<User, UserProps> {
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector<HTMLInputElement>(
      'input[name="userName"]',
    );
    if (!input) return;
    this.model.set({ name: input.value });
  };

  eventsMap = (): { [key: string]: () => void } => {
    return {
      "click:#set-age-btn": this.onSetAgeClick,
      "click:#set-name-btn": this.onSetNameClick,
    };
  };

  template = (): string => {
    return `
        <div>
            <h1>User Form</h1>
            <div>User name: ${this.model.get("name")}</div>
            <div>User age: ${this.model.get("age")}</div>
            <input name="userName"/>
            <button id="set-name-btn">Update name</button>
            <button id="set-age-btn">Set Random Age</button>
        </div>
        `;
  };
}
