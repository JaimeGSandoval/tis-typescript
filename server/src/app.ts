import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users/users.router';
import registerRouter from './routes/register/register.router';
import loginRouter from './routes/login/login.router';
import refreshRouter from './routes/refresh/refresh.router';
import articlesRouter from './routes/articles/articles.router';
import logoutRouter from './routes/logout/logout.router';
import settingsRouter from './routes/userSettings/userSettings.router';
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

app.get('/health-check', (req, res) => res.sendStatus(200));

// (async () => {
//   try {
//     await sendEmail({
//       email: 'test@email.com',
//       subject: 'test',
//       text: 'test',
//     });
//   } catch (e: any) {
//     throw Error(e.message);
//   }
// })();

app.use('/v1/register', registerRouter);
app.use('/v1/login', loginRouter);
app.use('/v1/refresh', refreshRouter);

app.use(deserializeUser);
app.use('/v1/users', usersRouter);
app.use('/v1/articles', articlesRouter);
app.use('/v1/settings', settingsRouter);
app.use('/v1/logout', logoutRouter);

app.use(errorResponder);
app.use(invalidPathHandler);

export default app;
