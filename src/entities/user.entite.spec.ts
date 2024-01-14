import User from './user.entite';

const mockUserObj = {
	name: 'Vinicius',
	email: 'vinicius@vinicorp.com',
	password: 'admin@vinicius',
	storage: 0,
	token: 'TOKEN',
};

describe('UserEntity', () => {
	it('should be instantiated', () => {
		const user = new User(mockUserObj);

		expect(user).toBeDefined();
	});

	it('should have the right attributes', () => {
		const user = new User(mockUserObj);

		expect({
			name: user.name,
			email: user.email,
			password: user.password,
			storage: user.storage,
			token: user.token,
			files: user.files,
		}).toStrictEqual({
			...mockUserObj,
			files: [],
		});
	});
});
