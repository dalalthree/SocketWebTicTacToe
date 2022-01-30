const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

turn = 'x';

app.use(express.static(__dirname + '/client'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', socket => {
  io.emit('reset');
  console.log("Connection with user")
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('box', (num) => {
      io.emit('madeMove', { spot: num, xoro: turn }); 
      turn = (turn == 'x') ? 'o' : 'x';
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});