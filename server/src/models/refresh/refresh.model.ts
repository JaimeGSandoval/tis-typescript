import { QueryResult } from 'pg';
import db from '../../database/postgres';

const getRefreshTokenQuery: string =
  'SELECT token FROM users.refresh_tokens WHERE users.refresh_tokens.token = $1';

const getRefreshToken = async (refreshToken: string): Promise<QueryResult> => {
  const token: QueryResult = await db.query(getRefreshTokenQuery, [refreshToken]);
  return token;
};

export default getRefreshToken;
