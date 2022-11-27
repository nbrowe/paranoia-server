const app = require('express')();
const { createServer } = require('http');
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options here */ });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

console.log(`Server running on port ${PORT}`)

httpServer.listen(PORT);
