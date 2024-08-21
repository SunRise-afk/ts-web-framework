import { User } from "./src/models/User";

const user = User.buildUser({ id: 1 });

user.on("change", () => {
  console.log("change", user);
});
user.on("save", () => {
  console.log("save", user);
});

user.fetch();

user.set({ age: 2, name: "Name to save" });

user.save();
