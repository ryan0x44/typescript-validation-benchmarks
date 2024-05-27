import { ZodError, z } from "zod";

const numIterations = process?.argv?.[2] ? +process.argv[2] || 1 : 1;

const userSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  device: z.object({
    platform: z.enum(["linux", "macos"]),
  }),
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
      userSchema.parse(user1);
      console.log("user 1 valid: " + JSON.stringify(user1));
    } catch (e) {
      if (e instanceof ZodError) {
        console.log("user 1 invalid: " + e.errors);
      }
    }

    console.log("User 2 type: " + typeof user2);
    try {
      userSchema.parse(user2);
      console.log("user 2 valid: " + JSON.stringify(user2));
    } catch (e) {
      if (e instanceof ZodError) {
        console.log("user 2 invalid: " + e.errors);
      }
    }
  }
}
console.timeEnd("duration");
