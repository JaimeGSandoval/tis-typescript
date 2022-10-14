import { QueryResult } from 'pg';
import db from '../../database/postgres';
import { getAllUsersQuery, getUserByIdQuery } from './queries';
import User from '../../types/User';

const getAllUsers = async (): Promise<QueryResult<User[]>> => {
  const users: QueryResult<User[]> = await db.query(getAllUsersQuery);
  return users;
};

export const getUserById = async (userId: number): Promise<QueryResult> => {
  const user: QueryResult<User> = await db.query(getUserByIdQuery, [userId]);
  return user;
};

export default {
  getAllUsers,
  // getUserById,
};
