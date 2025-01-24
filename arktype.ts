import { type } from "arktype";

const userSchema = type({
  name: type.string,
  age: type.number,
  function: type.string.default("unknown"),
});

// extract the type if needed
type User = typeof userSchema.inferOut;
type UserInput = typeof userSchema.inferIn;

const defaultUser = userSchema({ name: "unknown", age: 0 }) as User;

function createUser(input: UserInput) {
  const user = userSchema(input);
  if (user instanceof type.errors) return defaultUser;
  return user;
}

const realUser = createUser({ name: "John", age: 20 });
console.log(realUser);
