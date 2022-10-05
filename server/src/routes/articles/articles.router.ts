import { Router } from 'express';
import {
  httpAddArticle,
  httpDeleteArticle,
  httpGetFavoriteArticles,
  httpGetReadLaterArticles,
} from './articles.controller';

const articleUrlRouter: Router = Router();

articleUrlRouter.post('/', httpAddArticle);
articleUrlRouter.get('/favorite-articles', httpGetFavoriteArticles);
articleUrlRouter.get('/read-later-articles', httpGetReadLaterArticles);
articleUrlRouter.delete('/delete-article/:articleId', httpDeleteArticle);

export default articleUrlRouter;
