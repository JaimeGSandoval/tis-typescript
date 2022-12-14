import { Router } from 'express';
import { httpGetAllUsers, httpGetUserById } from '../controllers/users.controllers';
import verifyRole from '../middleware/verify-role';

const usersRouter: Router = Router();

usersRouter.get('/', verifyRole('admin'), httpGetAllUsers);
// usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:userId', verifyRole('admin'), httpGetUserById);

export default usersRouter;
