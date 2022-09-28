class AppError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = Error.name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
