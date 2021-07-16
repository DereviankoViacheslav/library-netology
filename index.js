// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { configDB } = require('./config');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(routes);

const PORT = process.env.PORT || 3000;
const { host, ...dbConfig } = configDB;
console.log('host ===>>>', host);
console.log('dbConfig ===>>>', dbConfig);
mongoose.connect(host, dbConfig, (error) => {
  if (error) return console.log('Mongo connection error ===>>>', error);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
