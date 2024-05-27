import { type } from "arktype";

const numIterations = process?.argv?.[2] ? +process.argv[2] || 1 : 1;

const userSchema = type({
  name: "string>1&string<255",
  email: "email",
  device: {
    platform: '"linux"|"macos"',
  },
});

console.time("duration");
for (let i = 0; i <= numIterations; i++) {
  const user1 = {
    name: `Invalid ${i}`,
    email: `hello${i}`,
    device: {
      platform: "not-real",
    },
  };
  const user2 = {
    name: `Valid ${i}`,
    email: `test${i}@example.com`,
    device: {
      platform: "linux",
    },
  };

  if (numIterations === 1) {
    console.log("User 1 type: " + typeof user1);
    try {
      userSchema.assert(user1);
      console.log("user 1 valid: " + JSON.stringify(user1));
    } catch (e) {
      console.log("user 1 invalid: " + JSON.stringify(e));
    }

    console.log("User 2 type: " + typeof user2);
    try {
      userSchema.assert(user2);
      console.log("user 2 valid: " + JSON.stringify(user2));
    } catch (e) {
      console.log("user 2 invalid: " + JSON.stringify(e));
    }
  }
}
console.timeEnd("duration");
