export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number, cause?: string) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
    this.name = "ApiError";
    if (!this.cause) {
      this.cause = "check api folder";
    }
  }
}
