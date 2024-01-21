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

  public get statusCode() {
    return this._statusCode;
  }

}