import { QueryResult } from 'pg';
import db from '../../database/postgres';
import { updateUsernameQuery, updateUserEmailQuery } from './queries';

export const updateUsername = async (userId: number, username: string): Promise<QueryResult> => {
  const updateResult: QueryResult = await db.query(updateUsernameQuery, [username, userId]);

  return updateResult;
};

export const updateUserEmail = async (userId: number, email: string): Promise<QueryResult> => {
  const updateResult: QueryResult = await db.query(updateUserEmailQuery, [email, userId]);

  return updateResult;
};
