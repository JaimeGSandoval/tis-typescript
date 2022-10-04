import { QueryResult } from 'pg';
import db from '../../database/postgres';

const deleteRefreshTokenQuery: string =
  'DELETE FROM users.refresh_tokens WHERE users.refresh_tokens.user_id = $1';

const deleteRefreshToken = async (userId: number): Promise<QueryResult> => {
  const result: QueryResult = await db.query(deleteRefreshTokenQuery, [userId]);

  return result;
};

export default deleteRefreshToken;
