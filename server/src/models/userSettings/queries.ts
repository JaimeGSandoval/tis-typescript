export const updateUsernameQuery: string =
  'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING user_name';

export const updateUserEmailQuery: string =
  'UPDATE users SET email = $1 WHERE user_id = $2 RETURNING email';
