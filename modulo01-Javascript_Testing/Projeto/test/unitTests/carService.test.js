const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('./../../src/service/carService');
const Transaction = require('./../../src/entities/transaction');

const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json')
}

describe('CarService Suite Tests', () => {
  let carService = {};
  let sandbox = {}

  before(() => {
    carService = new CarService({
      cars: carsDatabase
    });
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Ensure its retrieve a random position from an array', async () => {
    const data = [1, 2, 3, 4, 5];
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0);
  })

  it('Ensure its choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  })

  it('Ensure its possible return a avaiable car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).returns(car);

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;
    
    expect(carService.chooseRandomCar.calledOnce).to.be.true;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.true;
    expect(result).to.be.deep.equal(expected);
  })

  it('Ensure its calculate the final amout in real', async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;
    
    // Nunca dependa de dados externos!
    sandbox.stub(
      carService,
      "taxesBasedOnAge"
    ).get(() => [{ from: 31, to: 55, then: 1.3}])


    const expected = carService.currencyFormat.format(244.40);
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    expect(result).to.be.deep.equal(expected);
  })

  it('Ensure its returns a transaction receipt', async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    }

    const customer = Object.create(mocks.validCustomer)
    customer.age = 20

    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020";

    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).returns(car)

    const expectedAmount = carService.currencyFormat.format(206.8);
    const result = await carService.rent(
      customer,
      carCategory,
      numberOfDays
    )

    const expected = new Transaction({
      customer,
      car, 
      dueDate,
      amount: expectedAmount,
    })

    expect(result).to.be.deep.equal(expected);
  })
})