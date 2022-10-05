import { QueryResult } from 'pg';
import db from '../../database/postgres';
import {
  addFavoriteUrlQuery,
  addReadLaterUrlQuery,
  getFavoriteUrlsQuery,
  getReadLaterUrlsQuery,
  deleteReadLaterUrlQuery,
  deleteFavoriteUrlQuery,
  getFavoriteByIdQuery,
  getReadLaterByIdQuery,
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

export const getFavoriteArticles = async (userId: number): Promise<QueryResult> => {
  const favoriteUrls: QueryResult = await db.query(getFavoriteUrlsQuery, [userId]);
  return favoriteUrls;
};

export const getReadLaterArticles = async (userId: number): Promise<QueryResult> => {
  const readLaterUrls: QueryResult = await db.query(getReadLaterUrlsQuery, [userId]);
  return readLaterUrls;
};

export const getArticleById = async (
  articleId: number,
  articleType: string
): Promise<QueryResult> => {
  let article: QueryResult;

  if (articleType === 'read-later') {
    article = await db.query(getReadLaterByIdQuery, [articleId]);
  } else {
    article = await db.query(getFavoriteByIdQuery, [articleId]);
  }

  return article;
};

export const deleteArticle = async (articleId: number, articleType: string) => {
  if (articleType === 'read-later') {
    await db.query(deleteReadLaterUrlQuery, [articleId]);
  } else {
    await db.query(deleteFavoriteUrlQuery, [articleId]);
  }
};
