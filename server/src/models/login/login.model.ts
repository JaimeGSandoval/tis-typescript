import { QueryResult } from 'pg';
import { getUserPasswordQuery, insertRefreshTokenQuery } from './queries';
import db from '../../database/postgres';
import User from '../../types/User';

export const getUserPassword = async (email: string): Promise<QueryResult<User>> => {
  const userPassword: QueryResult<User> = await db.query(getUserPasswordQuery, [email]);
  return userPassword;
};

export const insertRefreshToken = async (userId: number, refreshToken: string): Promise<void> => {
  await db.query(insertRefreshTokenQuery, [userId, refreshToken]);
};
