import { Ifile } from "../interfaces/file.entitie.interface";
import LowDriveError from "../utils/low-drive-error";
import File from "./file.entitie";
import User from "./user.entite";

const NUMBER_10240 = 10240;
const NUMBER_10241 = 10241;

const mockUserObj = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
};



describe("UserEntity", () => {
  let filesInstance: File;
  let mockFileObj: {
		user: User,
		files: Ifile[]
	};

  beforeEach(() => {
    mockFileObj = {
      user: new User(mockUserObj),
      files: []
    };
		

    filesInstance = new File(mockFileObj);
  });


  it("should be instantiated", () => {
    expect(filesInstance).toBeDefined();
  });

  it("should have the right attributes", () => {
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
    expect(filesInstance.get()).toStrictEqual(mockFileObj);

    const objCreate = {
      mimeType: "audio/mp3",
      name: "low-drive is the best",
      size: 2.589,
      type: "audio"
    };

    const objUpdate = {
      ...objCreate,
      size: 4056
    };

    filesInstance.create(objCreate);

    expect(filesInstance.get()).toStrictEqual({
      user: filesInstance.user,
      files: [objCreate]
    });


    filesInstance.update(objUpdate);

    expect(filesInstance.get()).toStrictEqual({
      user: filesInstance.user,
      files: [objUpdate]
    });

    expect(filesInstance.get().files).toHaveLength(1);

    filesInstance.delete(objUpdate.name);

    expect(filesInstance.get()).toStrictEqual({
      user: filesInstance.user,
      files: []
    });

    expect(filesInstance.get().files).toHaveLength(0);
  });

  it("should give an error if it exceeds storage when creating", () => {
    const objCreate = {
      mimeType: "audio/mp3",
      name: "low-drive is the best",
      size: NUMBER_10241,
      type: "audio"
    };

    try {
      filesInstance.create(objCreate);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(LowDriveError);
      expect(error).toHaveProperty("message", "Insufficient storage!");
      expect(error).toHaveProperty("statusCode", 400);
    }
  });

  it("should give an error if it exceeds storage when updating", () => {
    const objCreate = {
      mimeType: "audio/mp3",
      name: "low-drive is the best",
      size: NUMBER_10240,
      type: "audio"
    };

    const objUpdate = {
      ...objCreate,
      size: NUMBER_10241
    };

    filesInstance.create(objCreate);


    try {
      filesInstance.update(objUpdate);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(LowDriveError);
      expect(error).toHaveProperty("message", "Insufficient storage!");
      expect(error).toHaveProperty("statusCode", 400);
    }
  });

  it("It should give an error if it can't find the file to delete", () => {
    try {
      filesInstance.delete("File not exist");
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(LowDriveError);
      expect(error).toHaveProperty("message", "File not found!");
      expect(error).toHaveProperty("statusCode", 404);
    }
  });
});
