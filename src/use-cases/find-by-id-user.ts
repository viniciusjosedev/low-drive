import { UserPersistenceOutput } from "../interfaces/entities/user.persistence.entity.interface";
import UserRepositoryImpl from "../repositories/user.repository";

export default class FindByIdUserCase {
  private _repository: UserRepositoryImpl;

  constructor(repository: UserRepositoryImpl) {
    this._repository = repository;
  }

  async execute(id: string): Promise<UserPersistenceOutput | null> {
    const findUser = this._repository.findById(id);
    return findUser;
  }
}