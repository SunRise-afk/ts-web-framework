import { User } from "./src/models/User";

const user = new User({ name: "myname", age: 26 });

user.set({ name: "new name", age: 19 });

console.log(user.get("name"));
console.log(user.get("age"));
