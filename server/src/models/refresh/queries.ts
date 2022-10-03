// const storedToken = await db.query(
//     'SELECT token FROM users.refresh_tokens WHERE users.refresh_tokens.token = $1',
//     [refreshToken]
//   );

//   const user = await db.query(
//     'SELECT user_id, user_name, email, role FROM users.users WHERE users.user_id = $1',
//     [userId]
//   );

const getRefreshTokenQuery: string =
  'SELECT token FROM users.refresh_tokens WHERE users.refresh_tokens.token = $1';

export default getRefreshTokenQuery;
