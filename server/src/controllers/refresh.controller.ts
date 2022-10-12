import { QueryResult } from 'pg';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import db from '../database/postgres';
import { signJWT, verifyJWT } from '../utils/jwt.utils';
import { getUserByIdQuery } from '../models/users/queries';
import User from '../types/User';

const httpCreateNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken: string = req.cookies.jwt;

  if (!refreshToken) {
    next(new AppError('Unauthorized: Token does not exist.', 401));
  }

  const { decoded, expired, valid } = verifyJWT(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  if (expired) {
    next(new AppError('Unauthorized: Refresh token expired. Login required.', 401));
  }

  if (!valid) {
    next(new AppError('Unauthorized: Invalid token.', 401));
  }

  try {
    if (valid && decoded) {
      const user: QueryResult = await db.query(getUserByIdQuery, [decoded.userId]);

      const userData: User = {
        userId: user.rows[0].user_id,
        userName: user.rows[0].user_name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      };

      const newAccessToken: string = signJWT(
        userData,
        process.env.ACCESS_TOKEN_SECRET as string,
        20
      );

      const result = verifyJWT(newAccessToken, process.env.ACCESS_TOKEN_SECRET as string);
      res.locals.user = result.decoded;

      return res.status(201).json({
        status: 'Success',
        data: {
          newAccessToken,
        },
      });
    }
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export default httpCreateNewAccessToken;
