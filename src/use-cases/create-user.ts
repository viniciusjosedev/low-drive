import User from "../entities/user.entite";
import { UserInput, UserOutput } from "../interfaces/user.entitie.interface";

export default class createUserUseCase {
  async execute(input: UserInput): Promise<UserOutput> {
    const user = new User(input);
    return user.get();
  }
}