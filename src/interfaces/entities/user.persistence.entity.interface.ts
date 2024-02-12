import { UserInput, UserOutput } from "./user.entity.interface";

export interface UserPersistenceInput extends UserInput {
	createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPersistenceOutput extends UserOutput {
	createdAt: Date;
  updatedAt: Date;
}
