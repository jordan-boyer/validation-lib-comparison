import { type } from "arktype"
import { checkUserA, checkUserB, checkUserC, nbIterations } from './utils.ts'

const startTime = performance.now()

for (let i = 0; i < nbIterations; i++) {

  const userSchema = type({
    name: type.string,
    age: type.number.default(42),
    phone: type.string.or(type.number).pipe(phone => typeof phone === 'number' ? phone.toString() : phone).default("123-456-7890"),
  })

  type User = typeof userSchema.inferOut

  type UserInput = typeof userSchema.inferIn

  const userA = userSchema({ name: "Jordan" })
  // @ts-expect-error Argument of type '{ name: string; age: number; } | ArkErrors' is not assignable to parameter of type 'User'.
  checkUserA(userA)

  function createUser (input: UserInput) {
    const user = userSchema(input)
    if (user instanceof type.errors) return userA as User // :'''''(
    return user
  }

  const userB = createUser({ name: "Romain", age: 35, phone: 1234567890 })
  checkUserB(userB)

  // @ts-expect-error age should be a number
  const userC = createUser({ name: "Romain", age: "35" })
  checkUserC(userC)

}

console.log(`ArkType exec time for ${nbIterations} iterations :`, performance.now() - startTime, 'ms')
