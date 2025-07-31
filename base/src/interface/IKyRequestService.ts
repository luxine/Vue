export interface ServerResponse<T> {
  code: number;
  message: string;
  data: T;
}

export class BusinessError extends Error {
  public readonly code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}
