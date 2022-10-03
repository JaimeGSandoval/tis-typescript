import bcrypt from 'bcrypt';

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
