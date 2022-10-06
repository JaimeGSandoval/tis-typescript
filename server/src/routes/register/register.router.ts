import { Router } from 'express';
import httpRegisterUser from './register.controller';
import { registerSchema } from '../../middleware/schemas';
import validateSchemas from '../../middleware/validate.schemas';

const registerRouter: Router = Router();

registerRouter.post('/', registerSchema, validateSchemas, httpRegisterUser);

export default registerRouter;
