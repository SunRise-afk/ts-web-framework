import { User } from "./src/models/User";

const user = new User({name: "myname", age: 26})

console.log(user.get("name"));
console.log(user.get("age"));
