import { Router } from 'express';
import httpCreateNewAccessToken from '../controllers/refresh.controller';

const refreshRouter: Router = Router();

refreshRouter.get('/', httpCreateNewAccessToken);

export default refreshRouter;
