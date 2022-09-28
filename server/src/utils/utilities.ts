import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../types/User';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds: number = Number(process.env.SALT_ROUNDS);
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

export const comparePasswords = async (password: string, storedPassword: string) => {
  const match: boolean = await bcrypt.compare(password, storedPassword);
  return match;
};

export const signJWT = (userData: User) => {
  const token: string = jwt.sign(
    {
      userId: userData.userId,
      userName: userData.userName,
      role: userData.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: 30 }
  );

  return token;
};
