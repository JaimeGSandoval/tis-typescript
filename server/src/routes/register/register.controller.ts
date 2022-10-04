import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { encryptPassword } from '../../utils/utilities';
import AppError from '../../utils/app-error';
import User from '../../types/User';
import {
  registerUser,
  userAlreadyExists,
  userNameTaken,
} from '../../models/register/register.model';

type UserInput = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
};

const httpRegisterUser = async (
  req: Request<{}, {}, UserInput>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  console.log(req);
  const { userName, email, password, passwordConfirm, role } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('Password does not match password confirm.', 400));
  }

  try {
    const userExists: QueryResult = await userAlreadyExists(email);

    if (userExists.rows.length) {
      return next(new AppError('You have already registered. Would you like to login?', 409));
    }

    const userNameUnavailable: QueryResult = await userNameTaken(userName);

    if (userNameUnavailable.rows.length) {
      return next(new AppError('That user name is already taken.', 409));
    }

    const encryptedPassword: string = await encryptPassword(password);
    const newUser: QueryResult<User> = await registerUser(userName, email, encryptedPassword, role);

    return res.status(201).json({
      status: 'Success',
      data: {
        newUser: newUser.rows[0],
      },
    });
  } catch (e: any) {
    return next(e);
  }
};

export default httpRegisterUser;
