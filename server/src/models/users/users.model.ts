import { QueryResult } from 'pg';
import pool from '../../database/postgres';
import queries from './queries';

const getAllUsers = async () => {
  const users: QueryResult = await pool.query(queries.getAllUsersQuery);
  return users;
};

export default {
  getAllUsers,
};
