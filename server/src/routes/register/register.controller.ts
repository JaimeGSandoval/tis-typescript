import { Request, Response } from 'express';
// import { QueryResult } from 'pg';

interface User {
  userName: string;
  email: string;
  password: string;
}

const httpRegisterUser = async (req: Request<{}, {}, User>, res: Response): Promise<Response> => {
  console.log(req.body);
  return res.send('Register route working');
};

export default httpRegisterUser;
