import User from "./user.entity";
import UserPersistence from "./user.persistence.entity";

const mockUserObj = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
};

const mockUserPersistenceObj = {
  user: new User(mockUserObj),
  createdAt: new Date(),
  updatedAt: new Date()
};
describe("UserPersistenceEntity", () => {
  let userPersistenceInstance: UserPersistence;
	
  beforeEach(() => {
    userPersistenceInstance = new UserPersistence(mockUserPersistenceObj);
  });

  it("should be instantiated", () => {
    expect(userPersistenceInstance).toBeDefined();
  });

  it("Should be instantiated wihout createdAt and updatedAt", () => {
    userPersistenceInstance = new UserPersistence({
      ...mockUserPersistenceObj,
      createdAt: undefined,
      updatedAt: undefined
    });
  });

  it("should have the right attributes", () => {
    expect({
      user: userPersistenceInstance.user,
    }).toStrictEqual({
      user: new User(mockUserObj)
    });
  });

  it("should have the right methods", () => {
    expect(userPersistenceInstance.get()).toStrictEqual({
      ...mockUserObj,
      createdAt: mockUserPersistenceObj.createdAt,
      updatedAt: mockUserPersistenceObj.updatedAt
    });

    userPersistenceInstance.update({
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
});
