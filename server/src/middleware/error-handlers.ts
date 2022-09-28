import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';

export const errorResponder = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(error.statusCode).json({
    status: 'Fail',
    statusCode: error.statusCode,
    message: error.message,
  });
};

export const invalidPathHandler = (req: Request, res: Response): Response => {
  return res.status(404).json({
    status: 'Fail',
    statusCode: res.statusCode,
    message: `${res.statusCode} - ${req.originalUrl} not found. Invalid path`,
  });
};
