type User = {
  userId: number;
  userName: string;
  email: string;
  role: 'user' | 'admin';
  iat?: number | undefined;
  exp?: number | undefined;
};

export default User;
