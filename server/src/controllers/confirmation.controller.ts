import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';
import updateUserEmailQuery from '../models/confirmation/queries';

const httpUpdateUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  // const { userId } = req.params;
  // const { newEmail } = req.body;

  try {
    //   const emailExists: QueryResult = await userAlreadyExists(newEmail);

    //   if (emailExists.rows.length) {
    //     return next(new AppError('An account with that email already exists.', 409));
    //   }

    //   const userUpdated: QueryResult = await updateUserEmail(parseInt(userId, 10), newEmail);

    //   res.locals.user.email = userUpdated.rows[0].email;

    //   const { userName, email, role } = res.locals.user;

    //   const newUserData: User = {
    //     userId: res.locals.user.userId,
    //     userName,
    //     email,
    //     role,
    //   };

    //   const newAccessToken: string = signJWT(
    //     newUserData,
    //     process.env.ACCESS_TOKEN_SECRET as string,
    //     260
    //   );

    console.log('GOT IT');
    console.log('TOKEN', req.params.token);

    return res.status(200).redirect('/client-login');
  } catch (e: any) {
    return next(new AppError(e.message, 500));
  }
};

export default httpUpdateUserEmail;
