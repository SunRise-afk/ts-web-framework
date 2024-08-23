// local dependencies
import { UserEdit } from "./src/views/UserEdit";
import { UserList } from "./src/views/UserList";
import { User, UserProps } from "./src/models/User";
import { Collection } from "./src/models/Collection";

const user = User.buildUser({ name: "Test name", age: 20 });

const userEdit = new UserEdit(
  document.querySelector("#root") || document.body,
  user,
);

userEdit.render();

const usersCollection = new Collection<User, UserProps>(
  "http://localhost:3000/users",
  (data) => {
    return User.buildUser(data);
  },
);

const usersListContainer = document.createElement("div");
usersListContainer.id = "users-list";
document.body.append(usersListContainer);

usersCollection.on("change", () => {
  const userList = new UserList(
    document.querySelector("#users-list") || document.body,
    usersCollection,
  );

  userList.render();
});

usersCollection.fetch();
