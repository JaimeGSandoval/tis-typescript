import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/app-error';
import deleteRefreshToken from '../../models/logout/logout.model';

const httpDeleteRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = res.locals.user.user_id;

  if (!userId) {
    return next(new AppError('User ID is required.', 400));
  }

  try {
    await deleteRefreshToken(userId);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });

    return res.sendStatus(204);
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export default httpDeleteRefreshToken;
