const faker = require('faker');

console.log({
  id: faker.random.uuid(),
  name: faker.name.findName()
})