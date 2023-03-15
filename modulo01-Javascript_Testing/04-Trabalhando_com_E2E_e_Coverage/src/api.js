const http = require('http');
const { once } = require('events');
const DEFAULT_USER = {
  username: 'GustavoSantos',
  password: '123456'
}

const routes = {
  '/contact:get': (request, response) => { 
    response.write('Contact ours page')
    response.end() },

  '/login:post': async (request, response) => { 
    const user = JSON.parse(await once(request, 'data'));
    const toLower = (text) => text.toLowerCase()
    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) || 
      user.password !== DEFAULT_USER.password
      ) {
      response.writeHead(401)
      response.end('Login Failed')
      return
    }
    console.log('data', user)
    response.end() },

  default(request, response) {
    response.writeHead(404) 
    return response.end('Not Found!')
  }
}

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default
  return chosen(request, response);
}

const app = http.createServer(handler)
.listen(3000, () => console.log('Running at 3000'))