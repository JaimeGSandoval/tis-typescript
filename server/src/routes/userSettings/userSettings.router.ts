import { Router } from 'express';
import httpUpdateUsername from './userSettings.controller';

const settingsRouter: Router = Router();

settingsRouter.put('/update-username', httpUpdateUsername);

export default settingsRouter;
