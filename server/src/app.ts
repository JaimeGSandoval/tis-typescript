import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import pool from './db/postgres';

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json("Looks like it's working");
});

app.get('/users', async (req, res) => {
  const response = await pool.query('select * from users');
  console.log(response.rows);
  return res.status(200).json(response.rows);
});

export default app;
