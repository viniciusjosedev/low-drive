import User from "../entities/user.entity";
import { UserInput, UserOutput } from "../interfaces/entities/user.entity.interface";
import UserRepositoryImpl from "../repositories/user.repository";
import LowDriveError from "../errors/low-drive-error";
import messagesError from "../errors/messages-error";

export default class createUserUseCase {
  private _repository: UserRepositoryImpl;

  constructor(repository: UserRepositoryImpl) {
    this._repository = repository;
  }

  async execute(input: UserInput): Promise<UserOutput | void> {
    try {
      const user = new User(input);
      await this._repository.create(user);
      return user.get();
    } catch (error) {
      throw new LowDriveError(messagesError.internalServer);
    }
  }
}