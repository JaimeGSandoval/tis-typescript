export const addReadLaterUrlQuery: string =
  'INSERT INTO users.read_later_articles (user_id, article_title, article_url) VALUES ($1, $2, $3) RETURNING users.read_later_articles.article_url';

export const addFavoriteUrlQuery: string =
  'INSERT INTO users.favorite_articles (user_id, article_title, article_url) VALUES ($1, $2, $3) RETURNING users.favorite_articles.article_url';

export const getFavoriteUrlsQuery: string =
  'SELECT date_added, article_title, article_url FROM favorite_articles WHERE favorite_articles.user_id = $1';

export const getReadLaterUrlsQuery: string =
  'SELECT article_id, date_added, article_title, article_url FROM read_later_articles WHERE read_later_articles.user_id = $1';

export const getFavoriteByIdQuery: string =
  'SELECT article_id FROM users.favorite_articles WHERE users.favorite_articles.article_id = $1';

export const getReadLaterByIdQuery: string =
  'SELECT article_id FROM users.read_later_articles WHERE users.read_later_articles.article_id = $1';

export const deleteReadLaterUrlQuery: string =
  'DELETE FROM users.read_later_articles WHERE users.read_later_articles.article_id = $1';

export const deleteFavoriteUrlQuery: string =
  'DELETE FROM users.favorite_articles WHERE users.favorite_articles.article_id = $1';
