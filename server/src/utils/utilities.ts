import { Response } from 'express';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds: number = Number(process.env.SALT_ROUNDS);
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

export const comparePasswords = async (user: QueryResult, passwordInput: string) => {
  const storedPassword: string = user.rows[0].password;
  const match: boolean = await bcrypt.compare(passwordInput, storedPassword);
  return match;
};

export const failedResponse = (statusCode: number, message: string, res: Response) => {
  return res.status(statusCode).json({
    status: 'Fail',
    message,
  });
};
