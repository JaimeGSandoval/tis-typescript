import { QueryResult } from 'pg';
import db from '../../database/postgres';
import queries from './queries';
import User from '../../types/User';

const getAllUsers = async (): Promise<QueryResult<User[]>> => {
  const users: QueryResult<User[]> = await db.query(queries.getAllUsersQuery);
  return users;
};

const getUserById = async (userId: number): Promise<QueryResult<User>> => {
  const user: QueryResult<User> = await db.query(queries.getUserByIdQuery, [userId]);
  return user;
};

export default {
  getAllUsers,
  getUserById,
};
