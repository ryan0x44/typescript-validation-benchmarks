import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

const numIterations = process?.argv?.[2] ? +process.argv[2] || 1 : 1;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ pattern: emailPattern.source }),
  device: Type.Object({
    platform: Type.Union([Type.Literal("linux"), Type.Literal("macos")]),
  }),
});
const userValidator = TypeCompiler.Compile(userSchema);

console.time("duration");
for (let i = 0; i <= numIterations; i++) {
  const user1 = {
    name: `Invalid ${i}`,
    email: "hello",
    device: {
      platform: "not-real",
    },
  };
  const user2 = {
    name: `Valid ${i}`,
    email: "test@example.com",
    device: {
      platform: "linux",
    },
  };

  if (numIterations === 1) {
    console.log("User 1 type: " + typeof user1);
    if (!userValidator.Check(user1)) {
      console.log(
        "user 1 invalid: " + JSON.stringify([...userValidator.Errors(user1)])
      );
    } else {
      console.log("user 1 valid: " + JSON.stringify(user1));
    }

    console.log("User 2 type: " + typeof user2);
    if (!userValidator.Check(user2)) {
      console.log(
        "user 2 invalid: " + JSON.stringify([...userValidator.Errors(user2)])
      );
    } else {
      console.log("user 2 valid: " + JSON.stringify(user1));
    }
  }
}
console.timeEnd("duration");
