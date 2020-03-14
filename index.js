const http = require('http');
const controller = require('./controller');

const port = process.env.PORT || 5000;
const server = http.createServer(controller);

server.listen(port);
