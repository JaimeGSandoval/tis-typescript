import { Router } from 'express';
import httpUserLogin from './login.controller';

const loginRouter: Router = Router();

loginRouter.post('/', httpUserLogin);

export default loginRouter;
