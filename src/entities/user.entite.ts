type FileInterface = {
	name: string;
	mimeType: string;
	type: string;
	size: number;
};

type UserInterface = {
	name: string;
	email: string;
	password: string;
	token: string;
	storage: number;
};

export default class User {
  private _name: string;
  private _email: string;
  private _password: string;
  private _token: string;
  private _storage: number;

  constructor({name, email, password, token, storage}: UserInterface) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._token = token;
    this._storage = storage;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get token(): string {
    return this._token;
  }

  public get storage(): number {
    return this._storage;
  }

  public update({
    name,
    email,
    password,
    storage,
    token
  }: Partial<UserInterface>) {
    if (name) {
      this._name = name;
    } if (email) {
      this._email = email;
    } if (password) {
      this._password = password;
    } if (storage) {
      this._storage = storage;
    } if (token) {
      this._token = token;
    }
  }

  public get(): UserInterface {
    return {
      name: this._name,
      email: this._email,
      password: this._password,
      storage: this._storage,
      token: this._token
    };
  }
}
