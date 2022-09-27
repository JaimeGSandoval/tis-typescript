import { QueryResult } from 'pg';
import getUserPasswordQuery from './queries';
import db from '../../database/postgres';
import User from '../../types/User';

const getUserPassword = async (email: string): Promise<QueryResult<User>> => {
  const userPassword: QueryResult<User> = await db.query(getUserPasswordQuery, [email]);
  return userPassword;
};

export default getUserPassword;
