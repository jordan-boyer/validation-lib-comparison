import { green, red, yellow } from 'shuutils'

type User = {
  name: string
  age?: number
  phone: string
}

export function checkUserA(userA: User) {
  console.assert(userA.name === 'Jordan', `userA.name should be "Jordan" but got "${userA.name}"`)
  console.assert(userA.age === 42, `userA.age should be 42 but got "${userA.age}"`)
  console.assert(userA.phone === '123-456-7890', `userA.phone should be "123-456-7890" but got "${userA.phone}"`)
}

export function checkUserB(userB: User) {
  console.assert(userB.name === 'Romain', `userB.name should be "Romain" but got "${userB.name}"`)
  console.assert(userB.age === 35, `userB.age should be 35 but got "${userB.age}"`)
  console.assert(userB.phone === '1234567890', `userB.phone should be "1234567890" but got "${userB.phone}"`)
}

export function checkUserC(userC: User) {
  console.assert(userC.name === 'Jordan', `userC.name should be "Jordan" but got "${userC.name}"`)
  console.assert(userC.age === 42, `userC.age should be 42 but got "${userC.age}"`)
  console.assert(userC.phone === '123-456-7890', `userC.phone should be "123-456-7890" but got "${userC.phone}"`)
}

export const nbIterations = 1000

export function logExecTime(name: string, startTime: number) {
  const ms = Math.round(performance.now() - startTime)
  const color = ms < 100 ? green : ms < 200 ? yellow : red
  console.log(`${color(name.padEnd(8))} lib exec time :`, color(`${ms}`.padStart(4)), 'ms')
}
