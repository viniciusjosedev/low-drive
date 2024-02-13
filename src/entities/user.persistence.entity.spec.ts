import User from "./user.entity";
import UserPersistence from "./user.persistence.entity";

const mockUserObj = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
  createdAt: new Date(),
  updatedAt: new Date()
};
describe("UserPersistenceEntity", () => {
  let userPersistenceInstance: UserPersistence;
	
  beforeEach(() => {
    userPersistenceInstance = new UserPersistence(mockUserObj);
  });

  it("should be instantiated", () => {
    expect(userPersistenceInstance).toBeDefined();
  });

  it("Should be instantiated wihout createdAt and updatedAt", () => {
    userPersistenceInstance = new UserPersistence({
      ...mockUserObj,
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
    expect(userPersistenceInstance.get()).toStrictEqual(mockUserObj);

    userPersistenceInstance.update({
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });
});
