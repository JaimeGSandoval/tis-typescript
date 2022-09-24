import { QueryResult } from 'pg';
import pool from '../database/postgres';
import queries from './queries';

const getAllUsers = async () => {
  const users: QueryResult = await pool.query(queries.getAllUsersQuery);
  return users;
};

const getUser = async (userId: number) => {
  const user: QueryResult = await pool.query(queries.getUserQuery, [userId]);
  return user;
};

export default {
  getAllUsers,
  getUser,
};
