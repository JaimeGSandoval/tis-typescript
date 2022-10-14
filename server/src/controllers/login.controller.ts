import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';

export const handleLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
  const user = {
    userId: req.user!.user_id,
    userName: req.user!.user_name,
    email: req.user!.email,
    role: req.user!.role,
  };

  return res.status(200).json({
    status: 'Success',
    data: {
      user,
      message: `User ${user.userName} logged in successfully`,
    },
  });
};

export const handleLoginError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return next(new AppError('messed', 401));
  }
};
