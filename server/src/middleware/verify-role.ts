import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import User from '../types/User';

type Role = {
  role: string;
};

const verifyRole =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction): AppError | void => {
    const { user }: Record<string | number, User> = res.locals;

    if (!user) {
      return next(new AppError('Unauthorized: Please login to continue.', 403));
    }

    const { role }: Role = user;

    if (!roles.includes(role)) {
      return next(new AppError('Unauthorized', 403));
    }

    next();
  };

export default verifyRole;
