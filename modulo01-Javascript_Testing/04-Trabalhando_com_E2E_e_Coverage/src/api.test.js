const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

const DEFAULT_USER = {
  username: 'GustavoSantos',
  password: '123456'
}

const WRONG_USER = {
  username: 'wrongUser',
  password: '123456'
}

const WRONG_PASSWORD = {
  username: 'GustavoSantos',
  password: '987654'
}

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

  describe('/login', () => {
    it('should request on login route returns HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send(DEFAULT_USER)
        .expect(200)

        assert.strictEqual(response.text, 'ok')
    })

    it('ensure its not possible login with a wrong username', async () => {
      const response = await supertest(app)
        .post('/login')
        .send(WRONG_USER)
        .expect(401)

        assert.ok(response.unauthorized)
        assert.strictEqual(response.text, 'Login Failed')
    })

    it('ensure its not possible login with a wrong password', async () => {
      const response = await supertest(app)
        .post('/login')
        .send(WRONG_PASSWORD)
        .expect(401)

        assert.ok(response.unauthorized)
        assert.strictEqual(response.text, 'Login Failed')
    })
  })
})