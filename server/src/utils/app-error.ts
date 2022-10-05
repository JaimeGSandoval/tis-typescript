class AppError extends Error {
  name: string;
  statusCode: number;
  status?: string;

  constructor(message: string, statusCode: number, status?: string) {
    super(message);

    this.name = Error.name;
    this.statusCode = statusCode || 500;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
