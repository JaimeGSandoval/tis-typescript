import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../types/User';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds: number = Number(process.env.SALT_ROUNDS);
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

export const comparePasswords = async (
  password: string,
  storedPassword: string
): Promise<boolean> => {
  const match: boolean = await bcrypt.compare(password, storedPassword);
  return match;
};

export const signJWT = (userData: User, jwt_secret: string): string => {
  const token: string = jwt.sign(
    {
      userId: userData.userId,
      userName: userData.userName,
      email: userData.email,
      role: userData.role,
    },
    jwt_secret,
    { expiresIn: '1hour' }
  );

  return token;
};
