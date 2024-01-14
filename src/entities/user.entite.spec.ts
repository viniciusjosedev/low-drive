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
    const userInstance = new User(mockUserObj);

    expect(userInstance).toBeDefined();
  });

  it("should have the right attributes", () => {
    const userInstance = new User(mockUserObj);

    expect({
      name: userInstance.name,
      email: userInstance.email,
      password: userInstance.password,
      storage: userInstance.storage,
      token: userInstance.token,
    }).toStrictEqual(mockUserObj);
  });

  it("should have the right methods", () => {
    const userInstance = new User(mockUserObj);

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
