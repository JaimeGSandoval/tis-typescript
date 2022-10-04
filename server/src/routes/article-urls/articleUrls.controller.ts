import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import AppError from '../../utils/app-error';
import addArticleUrl from '../../models/article-urls/articleUrls.model';

const httpAddArticleUrl = async (
  req: Request<{}, { userId: number }, { articleUrl: string; type: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { articleUrl, type } = req.body;
  const { userId } = res.locals.user;

  if (!userId) {
    next(new AppError('User ID is required.', 400));
  }

  if (!articleUrl) {
    next(new AppError('Article url is missing.', 400));
  }

  try {
    const addedUrl: QueryResult = await addArticleUrl(userId, articleUrl, type);

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

export default httpAddArticleUrl;
