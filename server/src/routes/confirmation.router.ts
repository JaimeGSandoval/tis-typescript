import { Router } from 'express';
import httpUpdateUserEmail from '../controllers/confirmation.controller';
// import { updateEmailSchema } from '../middleware/schemas';
// import validateSchemas from '../middleware/validate.schemas';

const confirmationRouter: Router = Router();

confirmationRouter.patch('/update-email/:token', httpUpdateUserEmail);

export default confirmationRouter;
