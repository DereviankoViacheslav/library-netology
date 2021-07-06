// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { api, views } = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');

app.use(api);
app.use(views);

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});
