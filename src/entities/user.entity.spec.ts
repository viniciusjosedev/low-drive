import User from "./user.entity";

const mockUserObj = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
};

describe("UserEntity", () => {
  let userInstance: User;
	
  beforeEach(() => {
    userInstance = new User(mockUserObj);
  });

  it("should be instantiated", () => {
    expect(userInstance).toBeDefined();
  });

  it("should have the right attributes", () => {
    expect({
      name: userInstance.name,
      email: userInstance.email,
      password: userInstance.password,
      storage: userInstance.storage,
      token: userInstance.token,
    }).toStrictEqual(mockUserObj);
  });

  it("should have the right methods", () => {
    expect(userInstance.get()).toStrictEqual(mockUserObj);

    const objUpdate = {
      name: "test",
      email: "test@vinicorp.com",
      password: "admin@test",
      storage: 50,
      token: "ASDF",
    };

    userInstance.update(objUpdate);

    expect(userInstance.get()).toStrictEqual(objUpdate);
  });
});
