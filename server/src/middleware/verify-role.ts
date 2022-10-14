import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';

const verifyRole =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): AppError | void => {
    if (!req.isAuthenticated()) {
      return next(new AppError('Please login to continue.', 400));
    }

    const { user }: { user: Express.User } = req;

    if (!roles.includes(user.role)) {
      return next(new AppError('You are not authorized to access the page', 401));
    }

    next();
  };

export default verifyRole;
