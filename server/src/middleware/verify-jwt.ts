/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/app-error';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const accessToken: string | undefined = authHeader?.replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next(new AppError('You are not logged in. Please login to get access', 401));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
    res.locals.user = decoded;
  } catch (e) {
    return next(new AppError('Invalid token', 401));
  }

  next();
};

export default verifyJWT;
