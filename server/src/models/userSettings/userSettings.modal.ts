import { QueryResult } from 'pg';
import db from '../../database/postgres';

const updateUsernameQuery: string =
  'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_name';

const updateUsername = async (userId: number, username: string): Promise<QueryResult> => {
  const updateResult: QueryResult = await db.query(updateUsernameQuery, [username, userId]);

  return updateResult;
};

export default updateUsername;
