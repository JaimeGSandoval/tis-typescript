import { QueryResult } from 'pg';
import { getUserByEmailQuery, insertRefreshTokenQuery } from './queries';
import db from '../../database/postgres';
import User from '../../types/User';

// export const getUserPassword = async (email: string): Promise<QueryResult<User>> => {
//   const userPassword: QueryResult<User> = await db.query(getUserPasswordQuery, [email]);
//   return userPassword;
// };

export const getUserByEmail = async (email: string): Promise<QueryResult<User>> => {
  const user: QueryResult = await db.query(getUserByEmailQuery, [email]);
  return user;
};

export const insertRefreshToken = async (userId: number, refreshToken: string): Promise<void> => {
  await db.query(insertRefreshTokenQuery, [userId, refreshToken]);
};
