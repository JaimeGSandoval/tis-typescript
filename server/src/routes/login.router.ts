import { Router } from 'express';
import httpUserLogin from '../controllers/login.controller';

const loginRouter: Router = Router();

loginRouter.post('/', httpUserLogin);

export default loginRouter;
