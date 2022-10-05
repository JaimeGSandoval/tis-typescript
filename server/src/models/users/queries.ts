export const getAllUsersQuery: string = 'SELECT user_id, user_name, email, role FROM users.users';

export const getUserByIdQuery: string =
  'SELECT user_id, user_name, email, role FROM users.users WHERE user_id = $1';

export const getUserEmail: string = 'SELECT password FROM users.users WHERE email = $1';
