import { z } from "zod"
import { checkUserA, checkUserB, checkUserC } from './utils'

const userSchema = z.object({
  name: z.string(),
  age: z.number().default(42),
})

export type User = z.infer<typeof userSchema>

export type UserInput = z.input<typeof userSchema>

const userA = userSchema.parse({ name: "Jordan" })
checkUserA(userA)

function createUser (input: UserInput) {
  const result = userSchema.safeParse(input)
  if (!result.success) return userA
  return result.data
}

const userB = createUser({ name: "Romain", age: 35 })
checkUserB(userB)

// @ts-expect-error age should be a number
const userC = createUser({ name: "Romain", age: "35" })
checkUserC(userC)

console.log('All tests passed successfully.')