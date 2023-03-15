const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API Suite test', () => {
  before((done) => {
    app = require('./api');
    app.once('listening', done)
  })
  after((done) => app.close(done))
  describe('/contact', () => {
    it('should request on contact route returns HTTP Status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200)

        assert.strictEqual(response.text, 'Contact ours page')
    })
  })
})