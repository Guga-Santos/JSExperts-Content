const BaseRepository = require("../repository/base/baseRepository");
const Tax = require('./../entities/tax');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  } 

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const price = carCategory.price;
    const { then: tax } = this.taxesBasedOnAge
      .find((tax) => age >= tax.from && age <= tax.to);

    const finalPrice = ((tax * price) * (numberOfDays));

    const formattedPrice = this.currencyFormat.format(finalPrice);

    return formattedPrice;
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }
}

module.exports = CarService