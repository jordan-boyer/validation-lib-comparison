import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  function: z.string().default("unknown"),
});

// extract the type if needed
type User = z.infer<typeof userSchema>;
type UserInput = z.input<typeof userSchema>;

const defaultUser = userSchema.parse({ name: "unknown", age: 0 }) as User;

function createUser(input: UserInput) {
  const user = userSchema.safeParse(input);
  if (!user.success) return defaultUser;
  return user.data;
}

const realUser = createUser({ name: "John", age: 20 });
console.log(realUser);
