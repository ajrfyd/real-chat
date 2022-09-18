import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import c from 'chalk';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import messagesRoute from './routes/messagesRoute.js';
import { logger } from './middlewares/logger.js';
import { Server } from 'socket.io';
import http from 'http';

const { log } = console;
const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(logger);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => log(c.bgBlack('DB Connection Successfull')))
.catch((err) => log(c.red(err.message)));

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('hi??')
});

userRoute.forEach(({ method, route, handler}) => {
  app[method](route, handler);
});

messagesRoute.forEach(({ method, route, handler}) => {
  app[method](route, handler);
});

// const server = http.createServer(app); 
const server = app.listen(PORT, () => {
  log(c.cyan(`Server Listening on ${PORT}`));
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

global.onlineUsers = new Map();

io.on('connection', socket => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message)
    }
  })
});

// server.listen(PORT, () => {
//   log(c.red(`Server Listening on ${PORT}`));
// });