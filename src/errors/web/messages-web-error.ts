const messageErrorObj = {
  insufficientStorage: {
    message: "Insufficient storage!",
    statusCode: 400,
    code: "LOW_DRIVE_ERR_STORAGE"
  },
  fileNotFound: {
    message: "File not found!",
    statusCode: 404,
    code: "LOW_DRIVE_ERR_FILE"
  },
  internalServer: {
    message: "Internal server error!",
    statusCode: 500,
    code: "INTERNAL_SERVER_ERR"
  },
  userNotFound: {
    message: "User not found!",
    statusCode: 404,
    code: "USER_NOT_FOUND_ERR"
  },
  wrongPassword: {
    message: "Wrong password!",
    statusCode: 401,
    code: "WRONG_PASSWORD"
  },
  thisUserAlreadyExist: {
    message: "This user already exists",
    statusCode: 409,
    code: "USER_ALREADY_EXISTS_ERR"
  }
};

export default messageErrorObj;
