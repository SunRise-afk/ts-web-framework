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
  onSave = (): void => this.model.save();

  eventsMap = (): { [key: string]: () => void } => {
    return {
      "click:#save-model": this.onSave,
      "click:#set-age-btn": this.onSetAgeClick,
      "click:#set-name-btn": this.onSetNameClick,
    };
  };

  template = (): string => {
    return `
        <div>
            <input name="userName" placeholder="${this.model.get("name")}"/>
            <button id="set-name-btn">Update name</button>
            <button id="set-age-btn">Set Random Age</button>
            <button id="save-model">Save</button>
        </div>
        `;
  };
}
