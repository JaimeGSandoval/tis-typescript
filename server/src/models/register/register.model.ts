import { QueryResult } from 'pg';
import pool from '../../database/postgres';
import queries from './queries';

const registerUser = async (user_name: string, email: string, password: string) => {
  const newUser: QueryResult = await pool.query(queries.registerUserQuery, [
    user_name,
    email,
    password,
  ]);
  return newUser;
};

export default registerUser;
