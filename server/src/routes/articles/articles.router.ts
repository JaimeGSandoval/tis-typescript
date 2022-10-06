import { Router } from 'express';
import {
  httpAddArticle,
  httpDeleteArticle,
  httpGetFavoriteArticles,
  httpGetReadLaterArticles,
} from './articles.controller';

const articlesRouter: Router = Router();

articlesRouter.post('/', httpAddArticle);
articlesRouter.get('/favorite-articles', httpGetFavoriteArticles);
articlesRouter.get('/read-later-articles', httpGetReadLaterArticles);
articlesRouter.delete('/delete-article/:articleId', httpDeleteArticle);

export default articlesRouter;
