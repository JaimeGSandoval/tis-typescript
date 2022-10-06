import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import AppError from '../../utils/app-error';
import updateUsername from '../../models/userSettings/userSettings.modal';
import { signJWT } from '../../utils/jwt.utils';
import { userNameTaken } from '../../models/register/register.model';
import User from '../../types/User';

const httpUpdateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = res.locals.user;
  const { newUsername } = req.body;

  try {
    const userNameUnavailable: QueryResult = await userNameTaken(newUsername);

    if (userNameUnavailable.rows.length) {
      return next(new AppError('That user name is already taken.', 409));
    }

    const userUpdated: QueryResult = await updateUsername(userId, newUsername);

    res.locals.user.userName = userUpdated.rows[0].user_name;

    const { userName, email, role } = res.locals.user;

    const newUserData: User = {
      userId: res.locals.user.userId,
      userName,
      email,
      role,
    };

    const newAccessToken: string = signJWT(
      newUserData,
      process.env.ACCESS_TOKEN_SECRET as string,
      260
    );

    return res.status(200).json({
      status: 'Success',
      data: {
        updated: userUpdated.rows[0].user_name,
        newAccessToken,
      },
    });
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export default httpUpdateUsername;
