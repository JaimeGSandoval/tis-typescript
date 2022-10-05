export const addReadLaterUrlQuery: string =
  'INSERT INTO users.read_later_urls (user_id, article_title, article_url) VALUES ($1, $2, $3) RETURNING users.read_later_urls.article_url';

export const addFavoriteUrlQuery: string =
  'INSERT INTO users.favorite_urls (user_id, article_title, article_url) VALUES ($1, $2, $3) RETURNING users.favorite_urls.article_url';

export const getFavoriteUrlsQuery: string =
  'SELECT date_added, article_title, article_url FROM favorite_urls WHERE favorite_urls.user_id = $1';

export const getReadLaterUrlsQuery: string =
  'SELECT date_added, article_title, article_url FROM read_later_urls WHERE read_later_urls.user_id = $1';
