import LowDriveError from "./lowDriveError";

const mockLowDriveErrorObj  = {
  message: "Error",
  statusCode: 400
};

describe("UserEntity", () => {
  it("should be instantiated", () => {
    const lowDriveErrorInstance = new LowDriveError(mockLowDriveErrorObj);

    expect(lowDriveErrorInstance).toBeDefined();
  });

  it("should have the right attributes", () => {
    const lowDriveErrorInstance = new LowDriveError(mockLowDriveErrorObj);

    expect({
      message: lowDriveErrorInstance.message,
      statusCode: lowDriveErrorInstance.statusCode
    }).toStrictEqual(mockLowDriveErrorObj);
  });
});
