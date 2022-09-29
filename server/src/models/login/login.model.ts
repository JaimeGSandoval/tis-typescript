import { QueryResult } from 'pg';
import queries from './queries';
import db from '../../database/postgres';
import User from '../../types/User';

export const getUserPassword = async (email: string): Promise<QueryResult<User>> => {
  const userPassword: QueryResult<User> = await db.query(queries.getUserPasswordQuery, [email]);
  return userPassword;
};

export const insertRefreshToken = async (userId: number, refreshToken: string): Promise<void> => {
  await db.query(queries.insertRefreshTokenQuery, [userId, refreshToken]);
};
