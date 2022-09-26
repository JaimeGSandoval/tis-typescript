import { QueryResult } from 'pg';
import pool from '../../database/postgres';
import registerUserQuery from './queries';

const registerUser = async (userName: string, email: string, password: string) => {
  const newUser: QueryResult = await pool.query(registerUserQuery, [userName, email, password]);
  return newUser;
};

export default registerUser;
