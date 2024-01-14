interface LowDriveErrorInterface {
	message: string;
	statusCode?: number
}

export default class LowDriveError {
  private _message: string;
  private _statusCode?: number;

  constructor({
    message,
    statusCode
  }: LowDriveErrorInterface, ) {
    this._message = message;
    this._statusCode = statusCode;
  }

  public get message() {
    return this._message;
  }

  public get code() {
    return this._statusCode;
  }

  public static insufficientStorage() {
    throw new LowDriveError({
      message: "Insufficient storage!",
      statusCode: 400
    });
  }
}