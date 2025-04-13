import {
  string,
  number,
  object,
  type infer as InferOutput,
  type input as InferInput,
  refine,
  optional,
  _default,
} from "@zod/mini";
import { checkUserA, checkUserB, checkUserC, nbIterations } from "./utils.ts";

const startTime = performance.now();

for (let i = 0; i < nbIterations; i++) {
  const userSchema = object({
    name: string(),
    age: _default(optional(number()), 42),
    phone: _default(
      optional(
        string().check(
          refine((phone) => (typeof phone === "number" ? String(phone) : phone))
        )
      ),
      "123-456-7890"
    ),
  });

  // @ts-expect-error not exported, it's ok :p
  type User = InferOutput<typeof userSchema>;

  type UserInput = InferInput<typeof userSchema>;

  const userA = userSchema.parse({ name: "Jordan" });
  checkUserA(userA);

  function createUser(input: UserInput) {
    const result = userSchema.safeParse(input);
    if (!result.success) return userA;
    return result.data;
  }
  // (╯°□°）╯︵ ┻━┻
  // Zod mini doesn't support "or" so a string is given for phone instead of a number like in other scripts
  const userB = createUser({ name: "Romain", age: 35, phone: "1234567890" });
  checkUserB(userB);

  // @ts-expect-error age should be a number
  const userC = createUser({ name: "Romain", age: "35" });
  checkUserC(userC);
}

console.log(
  `Zod mini exec time for ${nbIterations} iterations :`,
  performance.now() - startTime,
  "ms"
);
