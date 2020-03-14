const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8080;

const wsServer = new WebSocket.Server({ server: httpServer }, () => console.log(`Server on port ${PORT}`));

let connectedStudents = [];

wsServer.on('connection', (ws, req) => {
  console.log('Student connected');

  connectedStudents.push(ws);
  ws.on('message', data => {
    connectedStudents.forEach((ws, i) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(data);
      } else {
        connectedStudents.splice(i, 1);
      }
    });
  })
})

app.get('/client', (req, res) => res.sendfile(path.resolve(__dirname, './client.html')));
app.get('/streamer', (req, res) => res.sendFile(path.resolve(__dirname, './streaming.html')));
app.get('/', (req, res) => {
  res.send(`
      <a href="streaming">Start Stream</a><br>
      <a href="client">Watch Stream</a>
    `);
});
httpServer.listen(PORT);
