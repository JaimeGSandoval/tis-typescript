class AppError extends Error {
  name: string;
  statusCode: number;
  status?: number;

  constructor(message: string, statusCode: number, status?: number) {
    super(message);

    this.name = Error.name;
    this.statusCode = statusCode || 500;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
