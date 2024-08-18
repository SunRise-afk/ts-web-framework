import { User } from "./src/models/User";

const user = new User({});

user.set({ name: "NEW name", age: 12 });

user.save();

// user.fetch()
