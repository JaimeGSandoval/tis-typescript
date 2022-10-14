import { QueryResult } from 'pg';
import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByEmail } from '../models/login/login.model';
import { getUserById } from '../models/users/users.model';
import { comparePasswords } from '../utils/bcrypt.utils';

const authUser = async (email: string, password: string, done: any) => {
  const authenticatedUser: QueryResult = await getUserByEmail(email);

  if (!authenticatedUser.rows.length) return done(null, false);

  const storedPassword: string = authenticatedUser.rows[0].password;

  try {
    if (await comparePasswords(password, storedPassword)) {
      done(null, authenticatedUser.rows[0]);
    } else {
      done(null, false);
    }
  } catch (e) {
    done(e);
  }
};

const initiatePassport = (passport: PassportStatic) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, authUser));

  passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(
    async (id: number, done: (err: any, user?: Express.User | false | null) => void) => {
      const user = await getUserById(id);
      done(null, user.rows[0]);
    }
  );
};

export default initiatePassport;
