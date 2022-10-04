import { QueryResult } from 'pg';
import db from '../../database/postgres';

const addReadLaterUrlQuery: string =
  'INSERT INTO users.read_later_urls (user_id, article_url) VALUES ($1, $2) RETURNING users.read_later_urls.article_url';

const addFavoriteUrlQuery: string =
  'INSERT INTO users.favorite_urls (user_id, article_url) VALUES ($1, $2) RETURNING users.favorite_urls.article_url';

const addArticleUrl = async (
  userId: number,
  articleUrl: string,
  type: string
): Promise<QueryResult> => {
  let addedUrlResult: QueryResult;

  if (type === 'read-later') {
    addedUrlResult = await db.query(addReadLaterUrlQuery, [userId, articleUrl]);
    return addedUrlResult;
  }

  addedUrlResult = await db.query(addFavoriteUrlQuery, [userId, articleUrl]);
  return addedUrlResult;
};

export default addArticleUrl;
