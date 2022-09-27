const getUserPasswordQuery: string = 'SELECT password FROM users.users WHERE email = $1';

export default getUserPasswordQuery;
