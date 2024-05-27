import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const numIterations = process?.argv?.[2] ? +process.argv[2] || 1 : 1;

const ajv = new Ajv();
addFormats(ajv);

const userSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ format: "email" }),
  device: Type.Object({
    platform: Type.Union([Type.Literal("linux"), Type.Literal("macos")]),
  }),
});
const userValidator = ajv.compile(userSchema);

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
    if (!userValidator(user1)) {
      console.log("user 1 invalid: " + JSON.stringify(userValidator.errors));
    } else {
      console.log("user 1 valid: " + JSON.stringify(user1));
    }

    console.log("User 2 type: " + typeof user2);
    if (!userValidator(user2)) {
      console.log("user 2 invalid: " + JSON.stringify(userValidator.errors));
    } else {
      console.log("user 2 valid: " + JSON.stringify(user1));
    }
  }
}
console.timeEnd("duration");
