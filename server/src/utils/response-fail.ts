import { Response } from 'express';

const responseFail = (error: any, response: Response) => {
  return response.status(500).json({
    status: 'Fail',
    message: error.message,
  });
};

export default {
  responseFail,
};
