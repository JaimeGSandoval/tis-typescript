const getAllUsersQuery: string = 'SELECT user_id, user_name, email, role FROM users.users';

const getUserByIdQuery: string =
  'SELECT user_id, user_name, email FROM users.users WHERE user_id = $1';

const getUserEmail: string = 'SELECT password FROM users.users WHERE email = $1';

export default {
  getAllUsersQuery,
  getUserByIdQuery,
  getUserEmail,
};
