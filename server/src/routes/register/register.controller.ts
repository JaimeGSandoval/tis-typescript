import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import {
  registerUser,
  userAlreadyExists,
  userNameTaken,
} from '../../models/register/register.model';
import User from '../../types/User';
import encryptPassword from '../../utils/utilities';

type UserInput = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const httpRegisterUser = async (
  req: Request<{}, {}, UserInput>,
  res: Response
): Promise<Response> => {
  const { userName, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Password does not match password confirm',
    });
  }

  try {
    const userExists: QueryResult = await userAlreadyExists(email);

    if (userExists.rows.length) {
      return res.status(409).json({
        status: 'Fail',
        message: 'You have already registered. Would you like to login?',
      });
    }

    const userNameUnavailable: QueryResult = await userNameTaken(userName);

    if (userNameUnavailable.rows.length) {
      return res.status(409).json({
        status: 'Fail',
        message: 'That user name is already taken',
      });
    }

    const encryptedPassword: string = await encryptPassword(password);
    const newUser: QueryResult<User> = await registerUser(userName, email, encryptedPassword);

    return res.status(201).json({
      status: 'Success',
      data: {
        newUser: newUser.rows,
      },
    });
  } catch (e: any) {
    return res.status(500).json({
      status: 'Fail',
      message: e.message,
    });
  }
};

export default httpRegisterUser;
