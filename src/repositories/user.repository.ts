import User from "../entities/user.entity";
import UserPersistence from "../entities/user.persistence.entity";
import { UserInput } from "../interfaces/entities/user.entity.interface";
import { DatabaseClient } from "../interfaces/frameworks/databases/database-client.interface";
import { UserRepository } from "../interfaces/repositories/ user.repository.interface";

export default class UserRepositoryImpl implements UserRepository {
  private _database: DatabaseClient;

  constructor(input: DatabaseClient) {
    this._database = input;
  }

  private _mapEntityToDomainFunction(userPersistence: UserPersistence) {
    return () => { return userPersistence.user.get(); };
  }

  public async create(user: User) {
    const userPersistence =  new UserPersistence({ user });

    const userPersistenceOutput = userPersistence.get();

    const createUser = await this._database.create(userPersistenceOutput);
		
    userPersistence.update(createUser);

    return {
      ...userPersistenceOutput,
      mapEntityToDomain: this._mapEntityToDomainFunction(userPersistence)
    };
  }
  

  public async update(id: string, input: Partial<UserInput>) {
    const updateUser = await this._database.update({ id, ...input });

    const user = new User(updateUser);

    const userPersistence = new UserPersistence({ user, ...updateUser });

    const userPersistenceOutput = userPersistence.get();

    return {
      ...userPersistenceOutput,
      mapEntityToDomain: this._mapEntityToDomainFunction(userPersistence)
    };
  }

  // public delete() {
  //   // implementation goes here
  // }

  // public async findById(id: string) {
  //   const findUser = await this._database.findById(id);

  //   if (!findUser) return null;

  //   const user = new User(findUser);

  //   const userPersistence = new UserPersistence({
  //     user,
  //     ...findUser
  //   });

  //   const userPersistenceOutput = userPersistence.get();

  //   return {
  //     ...userPersistenceOutput,
  //     mapEntityToDomain: this._mapEntityToDomainFunction(userPersistence)
  //   };
  // }

}