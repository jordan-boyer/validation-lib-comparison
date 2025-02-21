import * as v from 'valibot'
import { checkUserA, checkUserB, checkUserC } from './utils'

const userSchema = v.object({
  name: v.string(),
  age: v.optional(v.number(), 42),
})

export type User = v.InferOutput<typeof userSchema>

export type UserInput = v.InferInput<typeof userSchema>

const userA = v.parse(userSchema, { name: "Jordan" })
checkUserA(userA)

function createUser (input: UserInput) {
  const result = v.safeParse(userSchema, input)
  if (!result.success) return userA
  return result.output
}

const userB = createUser({ name: "Romain", age: 35 })
checkUserB(userB)

// @ts-expect-error age should be a number
const userC = createUser({ name: "Romain", age: "35" })
checkUserC(userC)

console.log('All tests passed successfully.')