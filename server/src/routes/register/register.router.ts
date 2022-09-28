import { Router } from 'express';
import httpRegisterUser from './register.controller';
import registerSchema from '../../middleware/register.schema';
import validateRegisterSchema from '../../middleware/validateRegister.schema';

const registerRouter: Router = Router();

registerRouter.post('/', registerSchema, validateRegisterSchema, httpRegisterUser);

export default registerRouter;
