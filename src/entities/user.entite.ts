interface FilesInterface {
	name: string;
	mimeType: string
	type: string
	size: number
}

interface UserInterface {
	name: string
	email: string
	password: string
	token: string
	files: FilesInterface[]
	storage: number
}

export default class User {
	private name: string
	private email: string
	private password: string
	private token: string
	private files: FilesInterface[]
	private storage: number

	constructor(props: UserInterface) {
		Object.assign(this, props)
	}

		

}