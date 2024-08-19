import { User } from "./src/models/User";

const user = new User({});

user.events.on('change', () => {
    console.log('change event')
})

user.events.trigger('change')

// user.set({ name: "NEW name", age: 12 });

// user.save();

// user.fetch()
