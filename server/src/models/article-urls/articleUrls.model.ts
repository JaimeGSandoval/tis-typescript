import { QueryResult } from 'pg';
import db from '../../database/postgres';
import {
  addFavoriteUrlQuery,
  addReadLaterUrlQuery,
  getFavoriteUrlsQuery,
  getReadLaterUrlsQuery,
} from './queries';

export const addArticle = async (
  userId: number,
  title: string,
  articleUrl: string,
  type: string
): Promise<QueryResult> => {
  let addedUrlResult: QueryResult;

  if (type === 'read-later') {
    addedUrlResult = await db.query(addReadLaterUrlQuery, [userId, title, articleUrl]);
    return addedUrlResult;
  }

  addedUrlResult = await db.query(addFavoriteUrlQuery, [userId, title, articleUrl]);
  return addedUrlResult;
};

export const getFavoriteArticles = async (userId: string): Promise<QueryResult> => {
  const favoriteUrls: QueryResult = await db.query(getFavoriteUrlsQuery, [userId]);
  return favoriteUrls;
};

export const getReadLaterArticles = async (userId: string): Promise<QueryResult> => {
  const readLaterUrls: QueryResult = await db.query(getReadLaterUrlsQuery, [userId]);
  return readLaterUrls;
};
