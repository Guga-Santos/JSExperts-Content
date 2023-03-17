const { describe, it, before, after } = require('mocha');
const CarService = require('./../../src/service/carService');

const { join } = require('path');
const assert = require('assert');

const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json')
}

describe('CarService Suite Tests', () => {
  let carService = {};
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    });
  })
  it('Ensure its possible return a avaiable car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.ids = [car.id];

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;
    
    assert.deepStrictEqual(result, expected);
  })
})