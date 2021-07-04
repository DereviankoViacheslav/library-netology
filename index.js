require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { api, views } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');

app.use(api);
app.use(views);

app.listen(process.env.HTTP_PORT || 3000, () =>
  console.log(`Server is running on ${process.env.HTTP_PORT} port`)
);
