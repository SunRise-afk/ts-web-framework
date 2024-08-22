import { User } from "../models/User";

export class UserForm {
  constructor(
    public parent: Element,
    public model: User,
  ) {
    this.bindModel();
  }

  bindModel = () => {
    this.model.on("change", () => {
      this.render();
    });
  };

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

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [name, selector] = eventKey.split(":");
      fragment
        .querySelectorAll(selector)
        .forEach((item) => item.addEventListener(name, eventsMap[eventKey]));
    }
  };

  render = (): void => {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  };
}
