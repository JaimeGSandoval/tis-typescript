import { Router } from 'express';
import { httpUpdateUsername, httpUpdateEmailRequest } from '../controllers/userSettings.controller';
import { updateUsernameSchema, updateEmailSchema } from '../middleware/schemas';
import validateSchemas from '../middleware/validate.schemas';

const userSettingsRouter: Router = Router();

userSettingsRouter.patch(
  '/update-username/:userId',
  updateUsernameSchema,
  validateSchemas,
  httpUpdateUsername
);

userSettingsRouter.patch(
  '/request-email-update/:userId',
  updateEmailSchema,
  validateSchemas,
  httpUpdateEmailRequest
);

export default userSettingsRouter;
