import { UserDatabase } from "./database-user-client.interface";

export interface FileDatabase {
	id: string;
	name: string;
	mimeType: string
	type: string
  size: number
  userId: string
  User: UserDatabase
	createdAt: Date
}

export interface CreateFileDatabase {
	id?: string;
	name: string;
	mimeType: string
	type: string
	size: number
	userId: string
	createdAt?: Date
  User: UserDatabase
}


export interface CreateManyFileDatabase {
	files: {
		id?: string;
		name: string;
		mimeType: string
		type: string
		size: number
		userId: string
		createdAt?: Date
	}[]
  User: UserDatabase
}

export interface UpdateFileDatabase {
	id: string;
	name?: string;
	mimeType?: string
	type?: string
  size?: number
  userId?: string
	createdAt?: Date
  User: UserDatabase
}

export interface DatabaseFileClient {
  create(input: CreateFileDatabase): Promise<FileDatabase>;
  createMany(input: CreateManyFileDatabase): Promise<FileDatabase[]>;
  update(input: UpdateFileDatabase): Promise<FileDatabase>;
	delete(id: string): Promise<FileDatabase | boolean>;
	findById(id: string): Promise<FileDatabase | null>;
	findAll(userId: string): Promise<FileDatabase[] | null>;
}