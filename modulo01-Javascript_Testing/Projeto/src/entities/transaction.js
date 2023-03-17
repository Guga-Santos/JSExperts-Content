class Transaction {
  constructor({ customer, car, amout, dueDate }) {
    this.customer = customer, 
    this.car = car, 
    this.amount = amount, 
    this.dueDate = dueDate
  }
}

module.exports = Transaction