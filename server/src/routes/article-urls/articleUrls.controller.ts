import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import AppError from '../../utils/app-error';
import {
  addArticle,
  getFavoriteArticles,
  getReadLaterArticles,
} from '../../models/article-urls/articleUrls.model';

export const httpAddArticleUrl = async (
  req: Request<{}, { userId: number }, { title: string; articleUrl: string; type: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { title, articleUrl, type } = req.body;
  console.log('LOCALS', res.locals.user);
  const { userId } = res.locals.user;

  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  if (!articleUrl) {
    return next(new AppError('Article url is missing.', 400));
  }

  try {
    const addedUrl: QueryResult = await addArticle(userId, title, articleUrl, type);

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
  req: Request<{}, { userId: number }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = res.locals.user;

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
  req: Request<{}, { userId: number }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = res.locals.user;

  if (!userId) {
    next(new AppError('User ID is required.', 400));
  }

  try {
    const readLaterArticles: QueryResult = await getReadLaterArticles(userId);

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
