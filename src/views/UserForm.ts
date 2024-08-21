export class UserForm {
  constructor(public parent: Element) {}

  onButtonClick = () => {
    console.log("button click");
  };
  onHeaderOver = () => {
    console.log("hover over header");
  };

  eventsMap = (): { [key: string]: () => void } => {
    return {
      "click:button": this.onButtonClick,
      "mouseenter:h1": this.onHeaderOver,
    };
  };

  template = (): string => {
    return `
        <div>
            <h1>User Form</h1>
            <input/>
            <button>Click</button>
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
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    document.body.appendChild(templateElement.content);
  };
}
