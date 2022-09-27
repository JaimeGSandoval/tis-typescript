import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import {
  registerUser,
  userAlreadyExists,
  userNameTaken,
} from '../../models/register/register.model';
import { encryptPassword, conflictResponse } from '../../utils/utilities';
import User from '../../types/User';

type UserInput = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
};

const httpRegisterUser = async (
  req: Request<{}, {}, UserInput>,
  res: Response
): Promise<Response> => {
  const { userName, email, password, passwordConfirm, role } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Password does not match password confirm',
    });
  }

  try {
    const userExists: QueryResult = await userAlreadyExists(email);
    const userExistsMsg: string = 'You have already registered. Would you like to login?';

    if (userExists.rows.length) {
      return conflictResponse(409, userExistsMsg, res);
    }

    const userNameUnavailable: QueryResult = await userNameTaken(userName);
    const userNameTakenMsg: string = 'That user name is already taken';

    if (userNameUnavailable.rows.length) {
      return conflictResponse(409, userNameTakenMsg, res);
    }

    const encryptedPassword: string = await encryptPassword(password);
    const newUser: QueryResult<User> = await registerUser(userName, email, encryptedPassword, role);

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
