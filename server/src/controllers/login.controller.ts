import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { getUserPassword, insertRefreshToken } from '../models/login/login.model';
import { comparePasswords } from '../utils/bcrypt.utils';
import AppError from '../utils/app-error';
import User from '../types/User';
import { signJWT } from '../utils/jwt.utils';

const httpUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return next(new AppError('Email and password must be provided.', 400));
  }

  try {
    const user: QueryResult = await getUserPassword(email);

    if (!user.rows.length) {
      return next(new AppError('A user is not registered with that email.', 400));
    }

    const storedPassword: string = user.rows[0].password;
    const match: boolean = await comparePasswords(password, storedPassword);

    if (!match) {
      return next(new AppError('Incorrect password.', 400));
    }

    const userData: User = {
      userId: user.rows[0].user_id,
      userName: user.rows[0].user_name,
      email: user.rows[0].email,
      role: user.rows[0].role,
    };

    const accessToken: string = signJWT(userData, process.env.ACCESS_TOKEN_SECRET as string, 20);

    const refreshToken: string = signJWT(userData, process.env.REFRESH_TOKEN_SECRET as string, 800);

    await insertRefreshToken(userData.userId, refreshToken);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // one day
      sameSite: 'none',
    });

    res.locals.user = userData;

    return res.status(200).json({
      status: 'Success',
      data: {
        userData,
        message: `User ${userData.userName} logged in successfully`,
        accessToken,
      },
    });
  } catch (e: any) {
    console.log(e);
    return next(new AppError('There was an error with logging in. Please try again.', 500));
  }
};

export default httpUserLogin;
