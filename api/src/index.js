import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import config from '../config/index.json';
import faker from 'faker';
import axios from 'axios';
import { SERVER_HEALTHY } from './constants/strings.js';

dotenv.config();


const PORT = process.env.port || 3000;
const app = express();

const whitelist = config.corsWhitelist;

// prevent other origins from making requests
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.get('/', (req, res) => {
  res.send(SERVER_HEALTHY);
});

app.use(cors(corsOptions));

app.get('/joke', async (req, res) => {
  const data = await axios.get('https://icanhazdadjoke.com', {
    headers: {
      'User-Agent': 'bcgov hello world application (https://github.com/patricksimonian/hello-world-express-react)',
    }
  });
  res.status(200).json({
    joke: data.joke
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
