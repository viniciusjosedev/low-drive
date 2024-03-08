export interface UserDatabase {
	id: string;
	name: string;
	email: string;
	password: string;
	token?: string | null;
	storage: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateUserDatabase {
	id?: string;
	name: string;
	email: string;
	password: string;
	token?: string | null;
	storage: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UpdateUserDatabase {
	id: string;
	name?: string;
	email?: string;
	password?: string;
	token?: string | null;
	storage?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface DatabaseClient {
  create(input: CreateUserDatabase): Promise<UserDatabase>;
  update(input: UpdateUserDatabase): Promise<UserDatabase>;
	delete(id: string): Promise<UserDatabase | boolean>;
	findById(id: string): Promise<UserDatabase | null>;
}