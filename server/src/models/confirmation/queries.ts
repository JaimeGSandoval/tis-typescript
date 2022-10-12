const updateUserEmailQuery: string =
  'UPDATE users SET email = $1 WHERE user_id = $2 RETURNING email';

export default updateUserEmailQuery;
