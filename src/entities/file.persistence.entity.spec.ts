import User from "./user.entity";
import FilePersistence from "./file.persistence.entity";
import { IfileExtends } from "../interfaces/entities/file.persistence.entity.interface";

const MOCK_USER_OB = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
};

const MOCK_USER_INSTANCE = new User(MOCK_USER_OB);

const CREATE_OBJECT = {
  id: "LOW-DRIVE",
  mimeType: "audio/mp3",
  name: "low-drive is the best",
  size: 2.589,
  type: "audio",
  createdAt: new Date(),
};

const UPDATE_OBJECT = {
  id: "LOW-DRIVE",
  mimeType: "image/png",
  name: "low-drive is the best",
  size: 3.1,
  type: "audio",
  createdAt: new Date(),
};

describe("FilePersistenceEntity", () => {
  let filePersistenceInstance: FilePersistence;
  let mockFilePersistenceObj: {
		files: IfileExtends[],
		user: User
	};

  beforeEach(() => {
    mockFilePersistenceObj = {
      user: MOCK_USER_INSTANCE,
      files: [],
    };

    filePersistenceInstance = new FilePersistence(mockFilePersistenceObj);
  });
	
  it("Should be instantiated", () => {
    expect(filePersistenceInstance).toBeDefined();
  });

  it("Should be instantiated with values", () => {
    filePersistenceInstance = new FilePersistence({
      ...mockFilePersistenceObj,
      files: [CREATE_OBJECT]
    });

    expect(filePersistenceInstance).toBeDefined();

    filePersistenceInstance = new FilePersistence({
      ...mockFilePersistenceObj,
      files: [{
        ...CREATE_OBJECT,
        createdAt: undefined
      }]
    });

    expect(filePersistenceInstance).toBeDefined();
  });

  it("Should be possible to get files", () => {
    expect(filePersistenceInstance.get()).toStrictEqual(mockFilePersistenceObj);
  });

  it("Should be possible to create a new file", () => {
    filePersistenceInstance.create(CREATE_OBJECT);

    expect(filePersistenceInstance.get()).toStrictEqual({
      user: MOCK_USER_INSTANCE,
      files: [CREATE_OBJECT]
    });
  });

  it("Should be possible to update file", () => {
    filePersistenceInstance.create(CREATE_OBJECT);
    filePersistenceInstance.update(UPDATE_OBJECT);

    expect(filePersistenceInstance.get()).toStrictEqual({
      user: MOCK_USER_INSTANCE,
      files: [UPDATE_OBJECT]
    });
  });

  it("Should be possible to delete file", () => {
    filePersistenceInstance.create(CREATE_OBJECT);
    filePersistenceInstance.update(UPDATE_OBJECT);
    filePersistenceInstance.delete(UPDATE_OBJECT.name);

    expect(filePersistenceInstance.get()).toStrictEqual({
      user: MOCK_USER_INSTANCE,
      files: []
    });
  });

});
