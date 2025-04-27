import { type TypeOf, compile, v } from 'suretype'
import { checkUserA, checkUserB, checkUserC, logExecTime, nbIterations } from './utils'

const startTime = performance.now()

for (let i = 0; i < nbIterations; i++) {
  const userSchema = v.object({
    name: v.string().required(),
    age: v.number().default(42),
    // below work to have `phone?: string | number;` but then the default is not applied :/
    // phone: v.anyOf([v.string().default("123-456-7890"), v.number().default(1234567890)])
    phone: v.string().default('123-456-7890'),
  })

  // @ts-expect-error not used, it's ok :p
  // eslint-disable-next-line no-unused-vars
  type User = {
    name: string
    age: number
    phone: string
  }

  type UserInput = TypeOf<typeof userSchema>

  const validator = compile(userSchema)
  const ensureUser = compile(userSchema, { ensure: true, ajvOptions: { useDefaults: true } })

  const userA = ensureUser({ name: 'Jordan' })
  // @ts-expect-error type mismatch
  checkUserA(userA)

  function createUser(input: UserInput) {
    if (typeof input.phone === 'number') {
      // @ts-expect-error type mismatch because UserInput is not correct
      input = { ...input, phone: input.phone.toString() }
    }
    const result = validator(input)
    if (!result.ok) return userA
    return ensureUser(input)
  }

  // @ts-expect-error type mismatch because UserInput is not correct
  const userB = createUser({ name: 'Romain', age: 35, phone: 1234567890 })
  // @ts-expect-error type mismatch
  checkUserB(userB)

  // @ts-expect-error age should be a number
  const userC = createUser({ name: 'Romain', age: '35' })
  // @ts-expect-error type mismatch
  checkUserC(userC)
}

logExecTime('Suretype', startTime)
