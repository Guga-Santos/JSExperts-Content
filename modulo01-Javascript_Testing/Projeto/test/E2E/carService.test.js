const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const { expect } = require('chai');

describe('E2E Suite tests', () => {
  let app;

  before((done) => {
    app = require('./../../src/api');
    app.once('listening', done);
  })

  after((done) => app.close(done));

  describe('Home GET Route', () => {
    it('Ensure returns status 200 and the right text', async () => {
      const response = await supertest(app)
      .get('/')
      .expect(200)

      expect(response.text).to.be.equal('Página Inicial')
    })
  })

  describe('Categories GET Route', () => {
    it('Ensure returns status 200 and the right text', async () => {
      const response = await supertest(app)
      .get('/categories')
      .expect(200)

      const responseData = JSON.parse(response.text)
      const [data] = responseData;

      expect(responseData).to.have.length(1)
      expect(data).to.haveOwnProperty('id')
      expect(data).to.haveOwnProperty('name')
      expect(data).to.haveOwnProperty('carIds')
      expect(data).to.haveOwnProperty('price')
    })
  })

  describe('Cars GET Route', () => {
    it('Ensure returns status 200 and the right text', async () => {
      const response = await supertest(app)
      .get('/cars')
      .expect(200)

      const responseData = JSON.parse(response.text)
      const [data] = responseData;


      expect(data).to.haveOwnProperty('id')
      expect(data).to.haveOwnProperty('name')
      expect(data).to.haveOwnProperty('releaseYear')
      expect(data).to.haveOwnProperty('available')
      expect(data).to.haveOwnProperty('gasAvailable')
    })
  })

  describe('TotalPrice POST Route', () => {
    it('Ensure returns status 200 and the right text', async () => {
      const response = await supertest(app)
      .post('/totalprice')
      .send({
        "customer": {
          "age": 45
        },
        "carCategory": {
          "price": 96.6
        },
        "numberOfDays": 15
      })
      .expect(200)

      const responseData = JSON.parse(response.text)

      expect(responseData).to.haveOwnProperty('customerAge')
      expect(responseData).to.haveOwnProperty('dayPrice')
      expect(responseData).to.haveOwnProperty('totalPrice')
    })
    it('Ensure it returns status 400 when fields are missing', async () => {
      const response = await supertest(app)
      .post('/totalprice')
      .send({})
      .expect(400)

      expect(response.text).to.be.equal('Some fields are missing!')
    })
  })

  describe('Rent POST Route', () => {
    it('Ensure returns status 200 and the right text', async () => {
      const response = await supertest(app)
      .post('/rent')
      .send({
        "customer": {"age": 45},
        "numberOfDays": 15
      })
      .expect(200)

      const responseData = JSON.parse(response.text)

      expect(responseData).to.haveOwnProperty('customer')
      expect(responseData).to.haveOwnProperty('car')
      expect(responseData).to.haveOwnProperty('amount')
      expect(responseData).to.haveOwnProperty('dueDate')
    })

    it('Ensure it returns status 400 when fields are missing', async () => {
      const response = await supertest(app)
      .post('/rent')
      .send({})
      .expect(400)
      
      expect(response.text).to.be.equal('Some fields are missing!')
    })
  })

  describe('Invalid Routes', () => {
    it('Ensure returns status 404 if access a wrong route', async () => {
      const response = await supertest(app)
      .get('/wrongRoute')
      .expect(404)

      expect(response.text).to.be.equal('Not Found!')
    })
  })
})
