const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const sinon = createSandbox();

const fibonacci = new Fibonacci();
;(async () => {
  {
    for (const sequencia of fibonacci.execute(5)) {
      console.log({ sequencia })
    }
  }
})();