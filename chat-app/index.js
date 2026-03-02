import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('sender-message', (message) => {
    io.emit('received-message', message);
  });
});


// Express handling
app.use(express.static(path.resolve('./public'), { index: false }));

app.get('/', (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});



server.listen(5000, () => {
  console.log('Server is running on port 5000');
});