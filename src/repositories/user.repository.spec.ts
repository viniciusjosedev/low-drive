import User from "../entities/user.entity";
import prismaClient from "../frameworks/database/prisma-client"; 
import UserRepositoryImpl from "./user.repository";

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

jest.mock("../frameworks/database/prisma-client", () => {
  return {
    user: {
      create: jest.fn(() => (mockReturnValue)),
    },
  };
});


describe("UserRepositoryImpl", () => {
  let userRepositoryImpl: UserRepositoryImpl;
	
  beforeEach(() => {
    userRepositoryImpl = new UserRepositoryImpl();
  });

  it("should be instantiated", () => {
    expect(userRepositoryImpl).toBeDefined();
  });

  it("should create a users", async () => {
    const user = new User({
      name: "Vinicius",
      email: "vinicius@vinicorp.com",
      password: "admin@vinicius",
      storage: 0,
      token: "TOKEN",
    });
		
    await userRepositoryImpl.create(user);

    expect(prismaClient.user.create).toHaveBeenCalled();
    expect(prismaClient.user.create).toHaveBeenCalledTimes(1);
    expect(prismaClient.user.create).toHaveReturnedWith(mockReturnValue);
  });
});
