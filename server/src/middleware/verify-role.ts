import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import User from '../types/User';

const verifyRole = (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
): AppError | void => {
  if (!res.locals.user) {
    return next(new AppError('Unauthorized: Please login to continue.', 403));
  }

  const { role } = res.locals.user;

  if (role !== 'admin') {
    return next(new AppError('Unauthorized', 403));
  }

  next();
};

export default verifyRole;
