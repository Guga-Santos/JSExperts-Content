const item = {
  name: 'Gustavo Santos',
  age: 39,
  toString() {
    return `Name: ${this.name}, age: ${this.age}`
  },
  valueOf() {
    return 007
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('Trying to convert to: ', coercionType);
    const types = {
      string: 'Sai daqui, cara!',
      number: '777'
    }
    return types[coercionType] || types.string
  }
}


// Se o valor a ser somado for uma string, ele chamará primeiro o toString().
// Se o valor a ser somado for um Number, ele chamará primeiro o valueOf().
// Se o valor a ser somado não for um primitivo, ele chamará primeiro o valueOf() e depois o toString();

console.log('toString: ', String(item))
console.log('valueOf: ', Number(item))
