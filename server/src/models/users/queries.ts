const getAllUsersQuery: string = 'SELECT user_id, user_name, email FROM users.users';

const getUserQuery: string = 'SELECT user_id, user_name, email FROM users.users WHERE user_id = $1';

export default {
  getAllUsersQuery,
  getUserQuery,
};
