import UserRepositoryImpl from "../repositories/user.repository";

export default class DeleteUserCase {
  private _repository: UserRepositoryImpl;

  constructor(repository: UserRepositoryImpl) {
    this._repository = repository;
  }

  async execute(id: string): Promise<boolean> {
    const deleteUser = this._repository.delete(id);
    return deleteUser;
  }
}