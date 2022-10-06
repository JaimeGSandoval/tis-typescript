import { Router } from 'express';
import httpUpdateUsername from './userSettings.controller';
import { updateUsernameSchema } from '../../middleware/schemas';
import validateSchemas from '../../middleware/validate.schemas';

const settingsRouter: Router = Router();

settingsRouter.put('/update-username', updateUsernameSchema, validateSchemas, httpUpdateUsername);

export default settingsRouter;
