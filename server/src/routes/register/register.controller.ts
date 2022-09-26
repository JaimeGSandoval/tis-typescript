import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import registerUser from '../../models/register/register.model';
import encryptPassword from '../../utils/utilities';

interface User {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const httpRegisterUser = async (req: Request<{}, {}, User>, res: Response): Promise<Response> => {
  const { userName, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Password does not match password confirm',
    });
  }

  try {
    const encryptedPassword: string = await encryptPassword(password);
    const newUser: QueryResult = await registerUser(userName, email, encryptedPassword);

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
