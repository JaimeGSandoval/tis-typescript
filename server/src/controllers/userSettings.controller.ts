import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import AppError from '../utils/app-error';
import { updateUsername } from '../models/userSettings/userSettings.model';
import { signJWT } from '../utils/jwt.utils';
import { userNameTaken, userAlreadyExists } from '../models/register/register.model';
import sendEmail from '../utils/email';
import User from '../types/User';

export const httpUpdateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = req.params;
  const { newUsername } = req.body;

  try {
    const userNameUnavailable: QueryResult = await userNameTaken(newUsername);

    if (userNameUnavailable.rows.length) {
      return next(new AppError('That user name is already taken.', 409));
    }

    const userUpdated: QueryResult = await updateUsername(parseInt(userId, 10), newUsername);

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

export const httpUpdateEmailRequest = async (
  req: Request<{ userId: string }, {}, { newEmail: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = req.params;
  const { newEmail } = req.body;

  try {
    const emailExists: QueryResult = await userAlreadyExists(newEmail);

    if (emailExists.rows.length) {
      return next(new AppError('An account with that email already exists.', 409));
    }

    const updateData = {
      userId: Number(userId),
      newEmail,
    };

    const token: string = signJWT(updateData, process.env.ACCESS_TOKEN_SECRET as string, 260);

    const updateEmailUrl: string = `${req.protocol}://${req.get(
      'host'
    )}/v1/confirmation/update-email/${token}`;

    const emailHtml: string = `
        <p>Thank for for verifying this new email. Please click the link below to complete the update process.\nIf you didn't forget your password please ignore this email.</p>\n<br/>
        <a href="${updateEmailUrl}" target="_blank">Click me</a>
    `;

    const emailOptions = {
      email: newEmail,
      subject: 'Request for email change',
      emailHtml,
    };

    await sendEmail(emailOptions);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });

    return res.status(200).json({
      status: 'Success',
    });
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};
