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
    const user = new User(mockUserObj);

    expect(user).toBeDefined();
  });

  it("should have the right attributes", () => {
    const user = new User(mockUserObj);

    expect({
      name: user.name,
      email: user.email,
      password: user.password,
      storage: user.storage,
      token: user.token,
    }).toStrictEqual(mockUserObj);
  });

  it("should have the right methods", () => {
    const user = new User(mockUserObj);

    expect(user.get()).toStrictEqual(mockUserObj);

    const objUpdate = {
      name: "test",
      email: "test@vinicorp.com",
      password: "admin@test",
      storage: 10,
      token: "ASDF",
    };

    user.update(objUpdate);

    expect(user.get()).toStrictEqual(objUpdate);
  });
});
