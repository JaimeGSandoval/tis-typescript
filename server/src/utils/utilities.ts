import { Response } from 'express';

export const responseError = (error: any, response: Response) => {
  return response.status(500).json({
    status: 'Fail',
    message: error.message,
  });
};

export const removeWhiteSpace = (val: string): string => val.replace(/\s+/g, '');
