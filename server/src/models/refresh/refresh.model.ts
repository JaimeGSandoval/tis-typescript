import { QueryResult } from 'pg';
import db from '../../database/postgres';
import getRefreshTokenQuery from './queries';

const getRefreshToken = async (refreshToken: string): Promise<QueryResult> => {
  const token: QueryResult = await db.query(getRefreshTokenQuery, [refreshToken]);
  return token;
};

export default getRefreshToken;
