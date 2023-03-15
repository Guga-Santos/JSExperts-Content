const http = require('http');

function handler(request, response) {
  return response.end('ok')
}

const app = http.createServer(handler)
.listen(3000, () => console.log('Rodando na porta 3000'));