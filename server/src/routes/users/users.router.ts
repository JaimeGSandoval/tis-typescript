import { Router } from 'express';
import { httpGetAllUsers, httpGetUser, httpCreateUser } from './users.controllers';

const usersRouter: Router = Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUser);
usersRouter.post('/', httpCreateUser);

export default usersRouter;
