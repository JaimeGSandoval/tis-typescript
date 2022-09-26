const getAllUsersQuery: string = 'SELECT user_id, user_name, email FROM users.users';

const getUserById: string = 'SELECT user_id, user_name, email FROM users.users WHERE user_id = $1';

const getUserPassword: string = 'SELECT password FROM users.users WHERE email = $1';

export default {
  getAllUsersQuery,
  getUserById,
  getUserPassword,
};
