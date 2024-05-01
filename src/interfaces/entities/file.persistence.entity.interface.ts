import User from "../../entities/user.entity";
import { Ifile } from "./file.entity.interface";

export interface IfileExtends extends Ifile {
	id?: string;
	createdAt?: Date;
}

export interface FilePersistenceInputCreate {
	files: IfileExtends[]
	user: User
}

export interface FilePersistenceOutput {
	files: IfileExtends[]
	user: User
}

export interface FilePersistenceUpdate {
	
}
