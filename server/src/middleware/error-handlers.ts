import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';

export const errorResponder = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(error.statusCode).json(error.message);
};

export const invalidPathHandler = (req: Request, res: Response): Response => {
  res.status(404);
  return res.status(404).json(`${res.statusCode} - ${req.originalUrl} is an invalid path`);
};
