import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import usersModel from '../../models/users/users.model';
import User from '../../types/User';

export const httpGetAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: QueryResult<User[]> = await usersModel.getAllUsers();

    if (!users.rows.length) {
      return res.status(200).json({
        status: 'Success',
        message: 'There are no users signed up yet.',
      });
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        users: users.rows,
      },
    });
  } catch (e: any) {
    return res.status(500).json('Internal server error');
  }
};

export const httpGetUserById = async (
  req: Request<{ userId: string }>,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      status: 'Success',
      message: 'User ID is required',
    });
  }

  try {
    const user: QueryResult<User> = await usersModel.getUserById(parseInt(userId, 10));

    if (!user.rows.length) {
      return res.status(400).json({
        status: 'Fail',
        message: 'There is no user by that ID',
      });
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        user: user.rows,
      },
    });
  } catch (e: any) {
    return res.status(500).json({
      status: 'Fail',
      message: e.message,
    });
  }
};
