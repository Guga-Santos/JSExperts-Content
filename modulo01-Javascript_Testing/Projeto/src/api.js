const http = require('http');

{/*
Rotas a serem construidas:
- Get Cars
- Get TotalPrice
- Post Rent
*/}
const routes = {
  '/categories:get': (request, response) => {
    response.write('Categoria');
    return response.end();
  },
  '/cars:get': (request, response) => {
    response.write('Carros')
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
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http.createServer(handler);
const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))

module.exports = app;