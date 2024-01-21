import User from "../entities/user.entite";

export interface Ifile {
	name: string;
	mimeType: string;
	type: string;
	size: number;
}

export interface FileInput {
	files: Ifile[]
	user: User
}

export interface FileOutput {
  files: Ifile[]
  user: User
}
