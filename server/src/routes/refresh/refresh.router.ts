import { Router } from 'express';
import httpCreateNewAccessToken from './refresh.controller';

const refreshRouter: Router = Router();

refreshRouter.get('/', httpCreateNewAccessToken);

export default refreshRouter;
