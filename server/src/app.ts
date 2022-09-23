import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('There is still hope...'));

export default app;
