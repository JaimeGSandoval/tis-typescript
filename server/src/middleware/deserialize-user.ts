import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import { verifyJWT } from '../utils/jwt';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;
  const accessToken: string | undefined = authHeader?.replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next(new AppError('You are not logged in. Please login to get access.', 401));
  }

  const { decoded, expired } = verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

  if (decoded) {
    res.locals.user = decoded;
    console.log('DECODED USER', decoded);
    return next();
  }

  if (expired) {
    return res.status(401).json({
      status: 'Fail',
      message: 'Access token expired',
      expiredToken: true,
    });
  }
};

export default deserializeUser;
