import { LowDriveErrorInterface } from "./low-drive-error";

interface MessageError {
	insufficientStorage: LowDriveErrorInterface,
	fileNotFound: LowDriveErrorInterface,
	internalServer: LowDriveErrorInterface,
	[x: string]: LowDriveErrorInterface
}

const messageErrorObj: MessageError = {
  insufficientStorage: {
    message: "Insufficient storage!",
    statusCode: 400
  },
  fileNotFound: {
    message: "File not found!",
    statusCode: 404
  },
  internalServer: {
    message: "Internal server error!",
    statusCode: 500
  }
};

export default messageErrorObj;