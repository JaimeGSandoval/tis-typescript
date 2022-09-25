import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import usersRouter from './routes/users/users.router';
import registerRouter from './routes/register/register.router';

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.get('/health-check', (req, res) => {
  res.status(200).json("Looks like it's working");
});

app.use('/v1/users', usersRouter);
app.use('/v1/register', registerRouter);

export default app;
