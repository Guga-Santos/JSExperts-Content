const { describe, it, before, after } = require('mocha');
const CarService = require('./../../src/service/carService')

const { join } = require('path')
const assert = require('assert')

const carsDatabase = join(__dirname, './../../database', 'cars.json');

describe('CarService Suite Tests', () => {
  let carService = {}
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    });
  })
  it('Ensure its possible return a avaiable car', async () => {
    const result = await carService.getAvailableCar()
    const expected = null
    
    assert.deepStrictEqual(result, expected)
  })
})