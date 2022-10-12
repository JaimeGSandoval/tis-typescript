import { Router } from 'express';
import httpDeleteRefreshToken from '../controllers/logout.controller';

const logoutRouter: Router = Router();
logoutRouter.delete('/', httpDeleteRefreshToken);

export default logoutRouter;
