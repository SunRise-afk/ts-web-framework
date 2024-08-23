// local dependencies
import { HasId, Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T,
  ) {
    this.bindModel();
  }

  regionsMap = (): { [key: string]: string } => {
    return {};
  };

  eventsMap = (): { [key: string]: () => void } => {
    return {};
  };
  abstract template(): string;

  bindModel = () => {
    this.model.on("change", () => {
      this.render();
    });
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

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (!element) {
        return;
      }
      this.regions[key] = element;
    }
  };

  onRender = () => {};

  render = (): void => {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  };
}
