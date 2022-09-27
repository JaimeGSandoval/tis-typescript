import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import getUserPasswordQuery from '../../models/login/login.model';
import { failedResponse, comparePasswords } from '../../utils/utilities';
import User from '../../types/User';

const httpUserLogin = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return failedResponse(400, 'Email and password must be provided', res);
  }

  try {
    const user: QueryResult = await getUserPasswordQuery(email);

    if (!user.rows.length) {
      return failedResponse(400, 'A user is not registered with that email', res);
    }

    const match: boolean = await comparePasswords(user, password);

    if (!match) {
      return failedResponse(400, 'Incorrect password', res);
    }

    const userData: User = {
      userId: user.rows[0].user_id,
      userName: user.rows[0].user_name,
      email: user.rows[0].email,
      role: user.rows[0].role,
    };

    return res.status(200).json({
      status: 'Success',
      data: {
        userData,
        message: `User ${userData.userName} logged in successfully`,
      },
    });
  } catch (e: any) {
    return failedResponse(500, e.message, res);
  }
};

export default httpUserLogin;
