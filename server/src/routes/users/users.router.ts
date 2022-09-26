import { Router } from 'express';
import { httpGetAllUsers, httpGetUserById } from './users.controllers';

const usersRouter: Router = Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:userId', httpGetUserById);

export default usersRouter;
