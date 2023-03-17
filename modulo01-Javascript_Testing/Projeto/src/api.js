const http = require('http');
const { readFile } = require('fs/promises');
const { join } = require('path');

const categoriesDatabase = join(__dirname, './../database', 'carCategories.json');
const carsDatabase = join(__dirname, './../database', 'cars.json');


const BaseRepository = require('./repository/base/baseRepository');
{/*
Rotas a serem construidas:
- Get Cars
- Get TotalPrice
- Post Rent
*/}
const routes = {
  '/:get': (request, response) => {
    response.write('Página Inicial');
    return response.end();
  },
  '/categories:get': async (request, response) => {
    const data = JSON.parse(await readFile(categoriesDatabase, "utf8"))

    response.writeHead(200)
    response.write(JSON.stringify(data))
    return response.end();
  },
  '/cars:get': async (request, response) => {
    const data = JSON.parse(await readFile(carsDatabase, "utf8"))

    response.writeHead(200)
    response.write(JSON.stringify(data))
    return response.end();
  },
  '/totalprice:get': (request, response) => {
    response.write('Valor total')
    return response.end();
  },
  '/rent:post': (request, response) => {
    response.write('Nota Fiscal');
    return response.end()
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('Not Found!')
  }
}

function handler(request, response) {
  const { url, method, params } = request;
  let routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http.createServer(handler);
const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))

module.exports = app;