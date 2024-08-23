// local dependencies
import { User } from "./src/models/User";
import { UserEdit } from "./src/views/UserEdit";

const user = User.buildUser({ name: "Test name", age: 20 });

const userEdit = new UserEdit(
  document.getElementById("root") || document.body,
  user,
);

userEdit.render();
