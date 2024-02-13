export interface UserInput {
	name: string;
	email: string;
	password: string;
	token?: string | null;
	storage: number;
}

export interface UserOutput {
	name: string;
	email: string;
	password: string;
	token?: string | null;
	storage: number;
}
