import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import usersModel from '../../models/users/users.model';

const httpGetAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users: QueryResult = await usersModel.getAllUsers();

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

export default httpGetAllUsers;
