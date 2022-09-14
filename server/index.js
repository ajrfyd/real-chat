import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import c from 'chalk';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import { logger } from './middlewares/logger.js';

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

app.listen(PORT, () => {
  log(c.cyan(`Server Listening on ${PORT}`));
});