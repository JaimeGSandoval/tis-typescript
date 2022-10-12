import jwt from 'jsonwebtoken';
import User from '../types/User';

type JwtPayload = {
  userId: number;
  userName: string;
  email: string;
  role: string;
};

type UpdateEmail = {
  userId: number;
  newEmail: string;
};

export const signJWT = (
  userData: User | UpdateEmail,
  jwt_secret: string,
  expires: string | number
): string => {
  const user = {
    ...userData,
  };

  const token: string = jwt.sign(user, jwt_secret, { expiresIn: expires });

  return token;
};

export function verifyJWT(token: string, jwt_secret: string) {
  try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
