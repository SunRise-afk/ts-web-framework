// outsource dependencies
import axios, { AxiosResponse } from "axios";

// local dependencies
import { Eventing } from "./Eventing";

interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

export class User {
  events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: keyof UserProps): string | undefined | number {
    return this.data[propName];
  }

  set(data: UserProps) {
    Object.assign(this.data, data);
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get("id");
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post("http://localhost:3000/users/", this.data);
    }
  }
}
