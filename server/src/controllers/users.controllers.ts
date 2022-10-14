import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import usersModel from '../models/users/users.model';
import User from '../types/User';
import AppError from '../utils/app-error';

export const httpGetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  console.log('AUT BOOL', req.isAuthenticated());
  try {
    const users: QueryResult<User[]> = await usersModel.getAllUsers();

    if (!users.rows.length) {
      return next(new AppError('There are no users signed up yet.', 204));
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        users: users.rows,
      },
    });
  } catch (e: any) {
    return next(new AppError('There was an error retrieving the users. Please try again.', 500));
  }
};

export const httpGetUserById = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = req.params;

  try {
    const user: QueryResult<User> = await usersModel.getUserById(parseInt(userId, 10));

    if (!user.rows.length) {
      return next(new AppError('There is no user by that ID', 400));
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        user: user.rows[0],
      },
    });
  } catch (e: any) {
    return next(new AppError('There was an error retrieving the user. Please try again.', 500));
  }
};
