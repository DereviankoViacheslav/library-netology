require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { api } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.use(api);

app.listen(process.env.HTTP_PORT || 3000, () =>
  console.log(`Server is running on ${process.env.HTTP_PORT} port`)
);
