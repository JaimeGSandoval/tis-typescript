import { Router } from 'express';
import { httpGetAllUsers, httpGetUserById } from './users.controllers';
import verifyRole from '../../middleware/verify-role';

const usersRouter: Router = Router();

usersRouter.get('/', verifyRole, httpGetAllUsers);
usersRouter.get('/:userId', verifyRole, httpGetUserById);

export default usersRouter;
