export const getUserPasswordQuery: string =
  'SELECT user_id, user_name, password, email, role FROM users.users WHERE email = $1';

export const insertRefreshTokenQuery: string =
  'INSERT INTO users.refresh_tokens (user_id, token) VALUES ($1, $2)';
