import { number, union, object, optional, parse, safeParse, string, type InferInput, type InferOutput, pipe, transform } from 'valibot'
import { checkUserA, checkUserB, checkUserC } from './utils.ts'

const userSchema = object({
  name: string(),
  age: optional(number(), 42),
  phone: pipe(
    optional(union([string(), number()]), "123-456-7890"),
    transform((phone) => typeof phone === 'number' ? phone.toString() : phone)
  ),
})

export type User = InferOutput<typeof userSchema>

export type UserInput = InferInput<typeof userSchema>

const userA = parse(userSchema, { name: "Jordan" })
checkUserA(userA)

function createUser (input: UserInput) {
  const result = safeParse(userSchema, input)
  if (!result.success) return userA
  return result.output
}

const userB = createUser({ name: "Romain", age: 35, phone: 1234567890 })
checkUserB(userB)

// @ts-expect-error age should be a number
const userC = createUser({ name: "Romain", age: "35" })
checkUserC(userC)

console.log('All tests passed successfully.')
