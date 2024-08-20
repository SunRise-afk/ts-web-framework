import { User } from "./src/models/User";

const user = new User({ id: 1, name: "name", age: 123 });

console.log(user.get("age"));

user.on("change", () => {
  console.log("change");
});

user.set({ age: 12 });
console.log(user.get("age"));
