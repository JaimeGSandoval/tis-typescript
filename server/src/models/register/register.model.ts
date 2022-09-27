import { QueryResult } from 'pg';
import db from '../../database/postgres';
import queries from './queries';

export const registerUser = async (
  userName: string,
  email: string,
  password: string
): Promise<QueryResult> => {
  const newUser: QueryResult = await db.query(queries.registerUserQuery, [
    userName,
    email,
    password,
  ]);
  return newUser;
};

export const userAlreadyExists = async (email: string): Promise<QueryResult> => {
  const user: QueryResult = await db.query(queries.userExistsQuery, [email]);
  return user;
};

export const userNameTaken = async (userName: string): Promise<QueryResult> => {
  const user: QueryResult = await db.query(queries.userNameTakenQuery, [userName]);
  return user;
};
