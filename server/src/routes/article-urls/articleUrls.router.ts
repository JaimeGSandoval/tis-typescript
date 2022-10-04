import { Router } from 'express';
import httpAddArticleUrl from './articleUrls.controller';

const articleUrlRouter: Router = Router();

articleUrlRouter.post('/', httpAddArticleUrl);

export default articleUrlRouter;
