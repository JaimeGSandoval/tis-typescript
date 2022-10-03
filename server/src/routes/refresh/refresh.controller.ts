import { QueryResult } from 'pg';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/app-error';
import db from '../../database/postgres';
import { signJWT, verifyJWT } from '../../utils/jwt';
import queries from '../../models/users/queries';

const httpCreateNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken: string = req.cookies.jwt;

  if (!refreshToken) {
    next(new AppError('Unauthorized: Token does not exist', 401));
  }

  const { decoded, expired, valid } = verifyJWT(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  if (expired) {
    next(new AppError('Unauthorized: Refresh token expired. Login required.', 401));
  }

  if (!valid) {
    next(new AppError('Unauthorized: Invalid token', 401));
  }

  try {
    if (valid && decoded) {
      const user: QueryResult = await db.query(queries.getUserByIdQuery, [decoded.userId]);
      const newAccessToken: string = signJWT(
        user.rows[0],
        process.env.ACCESS_TOKEN_SECRET as string,
        10
      );

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
