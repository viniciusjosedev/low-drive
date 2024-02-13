import { UserInput, UserOutput } from "./user.entity.interface";

export interface UserPersistenceInput extends UserInput {
	id?: string
	createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPersistenceOutput extends UserOutput {
	id?: string
	createdAt: Date;
  updatedAt: Date;
}
