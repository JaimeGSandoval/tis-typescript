import { Router } from 'express';
import {
  httpAddArticleUrl,
  httpGetFavoriteArticles,
  httpGetReadLaterArticles,
} from './articleUrls.controller';

const articleUrlRouter: Router = Router();

articleUrlRouter.post('/', httpAddArticleUrl);
articleUrlRouter.get('/favorite-articles', httpGetFavoriteArticles);
articleUrlRouter.get('/read-later-articles', httpGetReadLaterArticles);

export default articleUrlRouter;
