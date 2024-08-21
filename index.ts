import { User } from "./src/models/User";

const userCollection = User.buildUserCollection();

userCollection.on("change", () => {
  console.log(userCollection);
});

userCollection.fetch();
