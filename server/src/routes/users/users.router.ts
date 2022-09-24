import { Router } from 'express';
import { httpGetAllUsers, httpGetUser } from './users.controllers';

const usersRouter: Router = Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:id', httpGetUser);

export default usersRouter;
