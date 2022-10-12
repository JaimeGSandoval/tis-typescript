import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router';
import registerRouter from './routes/register.router';
import loginRouter from './routes/login.router';
import refreshRouter from './routes/refresh.router';
import articlesRouter from './routes/articles.router';
import logoutRouter from './routes/logout.router';
import userSettingsRouter from './routes/userSettings.router';
import deserializeUser from './middleware/deserialize-user';
import { errorResponder, invalidPathHandler } from './middleware/error-handlers';

const app = express();

app.use(helmet());
app.use(xss());

app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(cookieParser());
app.use(morgan('dev'));

app.get('/v1/health-check', (req, res) => res.sendStatus(200));

app.use('/v1/register', registerRouter);
app.use('/v1/login', loginRouter);
app.use('/v1/refresh', refreshRouter);
app.get('/v1/confirmation', (req, res) => res.redirect('/client-login'));
app.get('/client-login', (req, res) => res.status(200).send('Redirected to frontend login'));

app.use(deserializeUser);
app.use('/v1/settings', userSettingsRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/articles', articlesRouter);
app.use('/v1/logout', logoutRouter);

app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
