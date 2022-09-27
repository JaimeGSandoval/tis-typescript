import { Response } from 'express';
import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds: number = Number(process.env.SALT_ROUNDS);
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

export const conflictResponse = (statusCode: number, message: string, res: Response) => {
  return res.status(statusCode).json({
    status: 'Fail',
    message,
  });
};
