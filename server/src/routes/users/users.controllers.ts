import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import usersModel from '../../models/users/users.model';
import utils from '../../utils/response-fail';

export const httpGetAllUsers = async (req: Request, res: Response): Promise<Response> => {
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
    return utils.responseFail(e, res);
  }
};

export const httpGetUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const userId = parseInt(id, 10);

  try {
    const user: QueryResult = await usersModel.getUser(userId);

    if (!user.rows.length) {
      return res.status(400).json({
        status: 'Fail',
        message: 'There is no user by that ID.',
      });
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        user: user.rows,
      },
    });
  } catch (e: any) {
    return utils.responseFail(e, res);
  }
};
