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

  it("should have the right methods", () => {
    try {
      LowDriveError.insufficientStorage();
		
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(LowDriveError);
      expect(error).toHaveProperty("message", "Insufficient storage!");
      expect(error).toHaveProperty("statusCode", 400);
    }
  });
});
