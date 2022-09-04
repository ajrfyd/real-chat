import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import c from 'chalk';
import mongoose from 'mongoose';

const { log } = console;
const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => log(c.bgBlack('DB Connection Successfull')))
.catch((err) => log(c.red(err.message)));

const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send('hi??')
})

app.listen(PORT, () => {
  log(c.cyan(`Server Listening on ${PORT}`));
});