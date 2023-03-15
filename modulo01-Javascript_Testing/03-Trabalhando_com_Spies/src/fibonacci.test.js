const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const sinon = createSandbox();
const assert = require('assert');

const fibonacci = new Fibonacci();
;(async () => {
  {
    {/*
    Modelo da sequencia:
    Número de sequencias: 5
    [0] input = 5, current = 0, next = 1, resultado = 0
    [1] input = 4, current = 1, next = 1, resultado = 1
    [2] input = 3, current = 1, next = 2, resultado = 1
    [3] input = 2, current = 2, next = 3, resultado = 2
    [4] input = 1, current = 3, next = 5, resultado = 3
    [5] input = 0 --> Para!
  */}
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )
    for (const sequencia of fibonacci.execute(5)) {}
      const expectedCallCount = 6;
      assert.strictEqual(spy.callCount, expectedCallCount);
      const { args } = spy.getCall(2);
      const expectedParams = [3, 1, 2];
      assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais!")
  }
})();