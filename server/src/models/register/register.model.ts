import { QueryResult } from 'pg';
import db from '../../database/postgres';
import { registerUserQuery, userExistsQuery, userNameTakenQuery } from './queries';

export const registerUser = async (
  userName: string,
  email: string,
  password: string,
  role: string = 'user'
): Promise<QueryResult> => {
  const newUser: QueryResult = await db.query(registerUserQuery, [userName, email, password, role]);

  return newUser;
};

export const userAlreadyExists = async (email: string): Promise<QueryResult> => {
  const user: QueryResult = await db.query(userExistsQuery, [email]);
  return user;
};

export const userNameTaken = async (userName: string): Promise<QueryResult> => {
  const user: QueryResult = await db.query(userNameTakenQuery, [userName]);
  return user;
};
