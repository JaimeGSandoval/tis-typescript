import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import xss from 'xss-clean';
import usersRouter from './routes/users/users.router';
import registerRouter from './routes/register/register.router';
import loginRouter from './routes/login/login.router';

const app = express();

app.use(helmet());
app.use(xss());

app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);

app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(morgan('dev'));

app.get('/health-check', (req, res) => {
  res.status(200).json("Looks like it's working");
});

app.use('/v1/users', usersRouter);
app.use('/v1/register', registerRouter);
app.use('/v1/login', loginRouter);

export default app;
