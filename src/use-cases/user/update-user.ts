import { UserInput } from "../../interfaces/entities/user.entity.interface";
import UserRepositoryImpl from "../../repositories/user/user.repository";
import { UserPersistenceOutput } from "../../interfaces/entities/user.persistence.entity.interface";

export default class UpdateUserUseCase {
  private _repository: UserRepositoryImpl;

  constructor(repository: UserRepositoryImpl) {
    this._repository = repository;
  }

  async execute(id: string, input: Partial<UserInput>): Promise<UserPersistenceOutput> {
    const updateUser = this._repository.update(id, input);
    return updateUser;
  }
}