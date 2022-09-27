const getUserPasswordQuery: string =
  'SELECT user_id, user_name, password, email, role FROM users.users WHERE email = $1';

export default getUserPasswordQuery;
