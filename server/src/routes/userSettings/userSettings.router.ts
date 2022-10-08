import { Router } from 'express';
import { httpUpdateUsername, httpUpdateUserEmail } from './userSettings.controller';
import { updateUsernameSchema } from '../../middleware/schemas';
import validateSchemas from '../../middleware/validate.schemas';

const settingsRouter: Router = Router();

settingsRouter.patch(
  '/update-username/:userId',
  updateUsernameSchema,
  validateSchemas,
  httpUpdateUsername
);

settingsRouter.patch('/update-email/:userId', httpUpdateUserEmail);

export default settingsRouter;
