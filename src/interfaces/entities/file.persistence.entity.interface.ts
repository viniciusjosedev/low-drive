import UserPersistence from "../../entities/user.persistence.entity";
import { Ifile } from "./file.entity.interface";

export interface IfileExtends extends Ifile {
	id?: string;
	createdAt?: Date;
	userId: string
}

export interface FilePersistenceInputCreate {
	files: IfileExtends[]
	user: UserPersistence
}

export interface FilePersistenceOutput {
	files: IfileExtends[]
	user: UserPersistence
}
