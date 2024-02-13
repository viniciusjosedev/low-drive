import User from "../entities/user.entity";
import { UserInput } from "../interfaces/entities/user.entity.interface";
import UserRepositoryImpl from "../repositories/user.repository";
import { UserPersistenceOutput } from "../interfaces/entities/user.persistence.entity.interface";

export default class CreateUserUseCase {
  private _repository: UserRepositoryImpl;

  constructor(repository: UserRepositoryImpl) {
    this._repository = repository;
  }

  async execute(input: UserInput): Promise<UserPersistenceOutput> {
    const user = new User(input);
    const userPersistence = await this._repository.create(user);
    return userPersistence;
  }
}