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
const mockDeleteMethod = jest.fn().mockResolvedValue(mockReturnValue);
let mockFindByIdMethod = jest.fn().mockResolvedValue(mockReturnValue);

jest.mock("../frameworks/databases/database-client", () => {
  return jest.fn().mockImplementation(() => ({
    create: mockCreateMethod,
    update: mockUpdateMethod,
    delete: mockDeleteMethod,
    findById: mockFindByIdMethod
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

  it("should delete a user", async () => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    await userRepositoryImpl.delete("uuid");

    expect(mockDeleteMethod).toHaveBeenCalled();
    expect(mockDeleteMethod).toHaveBeenCalledTimes(1);
  });

  it("should find a user", async () => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    const result = await userRepositoryImpl.findById("uuid");		

    expect(mockFindByIdMethod).toHaveBeenCalled();
    expect(mockFindByIdMethod).toHaveBeenCalledTimes(1);
    expect(result).not.toBeNull();
  });

  it("should not find a user", async () => {
    mockFindByIdMethod = jest.fn().mockResolvedValue(null);
    const userRepositoryImpl = new UserRepositoryImpl(new Database());


    const result = await userRepositoryImpl.findById("uuid");
		

    expect(mockFindByIdMethod).toHaveBeenCalled();
    expect(mockFindByIdMethod).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

});
