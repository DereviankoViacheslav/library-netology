import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { dbConfig } from '../infrastructure/db-config';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 3000;
const { host, ...configDB } = dbConfig;
mongoose.connect(host, configDB, (error) => {
  if (error) return console.log('Mongo connection error ===>>>', error);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
