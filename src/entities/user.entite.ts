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
	files?: FileInterface[];
	storage: number;
};

export default class User {
	private readonly _name: string;
	private readonly _email: string;
	private readonly _password: string;
	private readonly _token: string;
	private readonly _files: FileInterface[];
	private readonly _storage: number;

	constructor({name, email, password, token, storage, files}: UserInterface) {
		this._name = name;
		this._email = email;
		this._password = password;
		this._token = token;
		this._storage = storage;
		this._files = files ?? [];
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

	public get files(): FileInterface[] {
		return this._files;
	}

	public get storage(): number {
		return this._storage;
	}
}
