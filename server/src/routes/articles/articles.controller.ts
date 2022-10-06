import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import AppError from '../../utils/app-error';
import {
  addArticle,
  deleteArticle,
  getFavoriteArticles,
  getReadLaterArticles,
  getArticleById,
} from '../../models/articles/articles.model';

type Article = {
  articleTitle: string;
  articleUrl: string;
  articleType: string;
};

type UserId = {
  userId: number;
};

export const httpAddArticle = async (
  req: Request<{}, {}, Article>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { articleTitle, articleUrl, articleType } = req.body;
  const { userId }: UserId = res.locals.user;

  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!articleUrl) {
    return next(new AppError('Article url is missing.', 400));
  }

  try {
    const addedUrl: QueryResult = await addArticle(userId, articleTitle, articleUrl, articleType);

    return res.status(201).json({
      status: 'Success',
      data: {
        addedUrl: addedUrl!.rows[0],
      },
    });
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export const httpGetFavoriteArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId }: UserId = res.locals.user;

  if (!userId) {
    next(new AppError('User ID is required.', 400));
  }

  try {
    const favoriteArticles: QueryResult = await getFavoriteArticles(userId);

    return res.status(200).json({
      status: 'Success',
      data: {
        favoriteArticles: favoriteArticles.rows,
      },
    });
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export const httpGetReadLaterArticles = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = req.params;

  // const { userId }: UserId = res.locals.user;

  if (!userId) {
    next(new AppError('User ID is required.', 400));
  }

  try {
    const readLaterArticles: QueryResult = await getReadLaterArticles(parseInt(userId, 10));

    return res.status(200).json({
      status: 'Success',
      data: {
        readLaterArticles: readLaterArticles.rows,
      },
    });
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export const httpDeleteArticle = async (
  req: Request<{ articleId: string }, {}, { articleType: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { articleId } = req.params;
  const { articleType } = req.body;

  try {
    const foundArticle = await getArticleById(parseInt(articleId, 10), articleType);

    if (!foundArticle.rows.length) {
      return next(new AppError('Article not found. It may have been deleted already', 404));
    }

    await deleteArticle(parseInt(articleId, 10), articleType);

    return res.sendStatus(204);
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};
