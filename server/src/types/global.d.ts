export {};

declare global {
  namespace Express {
    interface User {
      user_id: number;
      user_name: string;
      email: string;
      role: 'user' | 'admin';
    }
  }

  type User = {
    userId: number;
    userName: string;
    email: string;
    role: 'user' | 'admin';
    iat?: number | undefined;
    exp?: number | undefined;
  };
}
