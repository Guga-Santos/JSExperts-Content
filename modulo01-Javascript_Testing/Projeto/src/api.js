const http = require('http');

function handler(request, response) {
  return response.end('ok')
}

const app = http.createServer(handler);
const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))

module.exports = app;