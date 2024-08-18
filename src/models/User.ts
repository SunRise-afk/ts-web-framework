interface UserProps {
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProps) {}

  get(propName: keyof UserProps): string | undefined | number {
    return this.data[propName];
  }

  set(data: UserProps) {
    Object.assign(this.data, data);
  }
}
