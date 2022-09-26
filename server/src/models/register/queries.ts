const registerUserQuery: string =
  'INSERT INTO users.users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_name, email';

export default registerUserQuery;
