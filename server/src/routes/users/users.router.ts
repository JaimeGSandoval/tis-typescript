import { Router } from 'express';
import httpGetAllUsers from './users.controllers';

const usersRouter: Router = Router();

usersRouter.get('/', httpGetAllUsers);

export default usersRouter;
