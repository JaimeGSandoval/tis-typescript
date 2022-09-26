import bcrypt from 'bcrypt';

const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds: number = Number(process.env.SALT_ROUNDS);
  const encryptedPassword: string = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

export default encryptPassword;
