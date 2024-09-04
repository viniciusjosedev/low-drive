export interface LowDriveWebErrorInterface {
  message: string;
  statusCode?: number;
  code: string;
}

export default class LowDriveWebError {
  private _message: string;
  private _statusCode: number;
  private _code?: string;

  constructor({ message, statusCode, code }: LowDriveWebErrorInterface) {
    this._message = message;
    this._statusCode = statusCode ?? 400;
    this._code = code;
  }

  public get message() {
    return this._message;
  }

  public get statusCode() {
    return this._statusCode;
  }

  public get code() {
    return this._code;
  }
}
