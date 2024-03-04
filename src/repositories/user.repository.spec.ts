import User from "../entities/user.entity";
import UserRepositoryImpl from "./user.repository";
import Database from "../frameworks/databases/database-client";

const mockReturnValue = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: "1"
};

const mockCreateMethod = jest.fn().mockResolvedValue(mockReturnValue);
const mockUpdateMethod = jest.fn().mockResolvedValue(mockReturnValue);

jest.mock("../frameworks/databases/database-client", () => {
  return jest.fn().mockImplementation(() => ({
    create: mockCreateMethod,
    update: mockUpdateMethod
  }));
});

describe("UserRepositoryImpl", () => {
  it("should be instantiated", () => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());
    expect(userRepositoryImpl).toBeDefined();
  });

  it("should create a user", async () => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    const user = new User({
      name: "Vinicius",
      email: "vinicius@vinicorp.com",
      password: "admin@vinicius",
      storage: 0,
      token: "TOKEN",
    });
    
    await userRepositoryImpl.create(user);

    expect(mockCreateMethod).toHaveBeenCalled();
    expect(mockCreateMethod).toHaveBeenCalledTimes(1);
  });

  it("should update a user", async () => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    await userRepositoryImpl.update("1", { name: "Test" });
    
    expect(mockUpdateMethod).toHaveBeenCalled();
    expect(mockUpdateMethod).toHaveBeenCalledTimes(1);
  });
});
