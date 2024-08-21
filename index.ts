// local dependencies
import { User } from "./src/models/User";
import { UserForm } from "./src/views/UserForm";

const user = User.buildUser({ name: "Test name", age: 20 });

const userForm = new UserForm(
  document.getElementById("root") || document.body,
  user,
);

userForm.render();
