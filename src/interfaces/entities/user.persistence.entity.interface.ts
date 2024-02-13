import User from "../../entities/user.entity";
import { UserInput, UserOutput } from "./user.entity.interface";

export interface UserPersistenceInputCreate {
	id?: string
	createdAt?: Date;
  updatedAt?: Date;
	user: User
}

export interface UserPersistenceInputUpdate extends UserInput {
	id?: string
	createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPersistenceOutput extends UserOutput {
	id?: string
	createdAt: Date;
  updatedAt: Date;
}
