import LowDriveError from "../utils/lowDriveError";
import Files from "./files.entitie";
import User from "./user.entite";

const mockUserObj = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
};

describe("UserEntity", () => {
  it("should be instantiated", () => {
    const mockFileObj = {
      user: new User(mockUserObj),
      files: []
    };
		

    const filesInstance = new Files(mockFileObj);

    expect(filesInstance).toBeDefined();
  });

  it("should have the right attributes", () => {
    const mockFileObj = {
      user: new User(mockUserObj),
      files: []
    };
		

    const filesInstance = new Files(mockFileObj);		

    expect({
      user: {
        name: filesInstance.user.name,
        email: filesInstance.user.email,
        password: filesInstance.user.password,
        storage: filesInstance.user.storage,
        token: filesInstance.user.token,
      },
      files: filesInstance.files
    }).toStrictEqual({
      ...mockFileObj, 
      user: mockUserObj
    });
  });

  it("should have the right methods", () => {
    const mockFileObj = {
      user: new User(mockUserObj),
      files: []
    };
		

    const filesInstance = new Files(mockFileObj);

    expect(filesInstance.get()).toStrictEqual(mockFileObj);

    const objCreate = {
      mimeType: "audio/mp3",
      name: "low-drive is the best",
      size: 2.589,
      type: "audio"
    };

    filesInstance.create(objCreate);

    expect(filesInstance.get()).toStrictEqual({
      user: filesInstance.user,
      files: [objCreate]
    });

    expect(filesInstance.get().files).toHaveLength(1);
  });

  it("should give an error if it exceeds the storage", () => {
    const mockFileObj = {
      user: new User(mockUserObj),
      files: []
    };
		

    const filesInstance = new Files(mockFileObj);

    const objCreate = {
      mimeType: "audio/mp3",
      name: "low-drive is the best",
      size: 10.241,
      type: "audio"
    };

    try {
      filesInstance.create(objCreate);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(LowDriveError);
      expect(error).toHaveProperty("message", "Insufficient storage!");
      expect(error).toHaveProperty("message", "Insufficient storage!");
    }
  });
});
