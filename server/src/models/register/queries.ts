const registerUserQuery: string =
  'INSERT INTO users.users (user_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, email, role';

const userExistsQuery: string = 'SELECT email FROM users.users WHERE email = $1';

const userNameTakenQuery: string = 'SELECT user_name FROM users.users WHERE user_name = $1';

export default {
  registerUserQuery,
  userExistsQuery,
  userNameTakenQuery,
};
