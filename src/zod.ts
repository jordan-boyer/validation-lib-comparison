import { string, number, object, type infer as InferOutput, type input as InferInput } from "zod"
import { checkUserA, checkUserB, checkUserC } from './utils.ts'

const userSchema = object({
  name: string(),
  age: number().default(42),
  phone: string().or(number()).default("123-456-7890").transform(phone => typeof phone === 'number' ? phone.toString() : phone),
})

export type User = InferOutput<typeof userSchema>

export type UserInput = InferInput<typeof userSchema>

const userA = userSchema.parse({ name: "Jordan" })
checkUserA(userA)

function createUser (input: UserInput) {
  const result = userSchema.safeParse(input)
  if (!result.success) return userA
  return result.data
}

const userB = createUser({ name: "Romain", age: 35, phone: 1234567890 })
checkUserB(userB)

// @ts-expect-error age should be a number
const userC = createUser({ name: "Romain", age: "35" })
checkUserC(userC)

console.log('All tests passed successfully.')
