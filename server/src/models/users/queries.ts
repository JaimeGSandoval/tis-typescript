const getAllUsersQuery: string = 'SELECT user_id, user_name, email FROM users.users';

const getUserQuery: string = 'SELECT user_id, user_name, email FROM users.users WHERE user_id = $1';

const createUserQuery: string =
  'INSERT INTO users.users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_name, email';

export default {
  getAllUsersQuery,
  getUserQuery,
  createUserQuery,
};
