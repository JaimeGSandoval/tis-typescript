import { Response } from 'express';

export const responseError = (error: any, response: Response) => {
  return response.status(500).json({
    status: 'Fail',
    message: error.message,
  });
};

export const badRequest = (res: Response, message: string) => {
  return res.status(400).json({
    status: 'Fail',
    message,
  });
};
