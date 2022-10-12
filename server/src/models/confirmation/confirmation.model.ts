import { QueryResult } from 'pg';
import db from '../../database/postgres';
import updateUserEmailQuery from './queries';

const updateUserEmail = async (userId: number, email: string): Promise<QueryResult> => {
  const updateResult: QueryResult = await db.query(updateUserEmailQuery, [email, userId]);

  return updateResult;
};

export default updateUserEmail;
