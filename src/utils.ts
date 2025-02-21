type User = {
  name: string,
  age?: number,
}

export function checkUserA (userA: User) {
  console.assert(userA.age === 42, 'userA.age should be 42')
}

export function checkUserB (userB: User) {
  console.assert(userB.age === 35, 'userB.age should be 35')
}

export function checkUserC (userC: User) {
  console.assert(userC.name === "Jordan", 'userC.name should be Jordan')
}