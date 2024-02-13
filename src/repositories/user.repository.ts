import User from "../entities/user.entity";
import UserPersistence from "../entities/user.persistence.entity";
import prismaClient from "../frameworks/database/prisma-client";
import { UserRepository } from "../interfaces/repositories/ user.repository.interface";

export default class UserRepositoryImpl implements UserRepository {
  private _mapEntityToDomainFunction(userPersistence: UserPersistence) {
    return () => { return userPersistence.user.get(); };
  }

  public async create(user: User) {
    const userPersistence =  new UserPersistence(user);

    const userPersistenceOutput = userPersistence.get();

    const createUser = await prismaClient.user.create({
      data: userPersistenceOutput
    });

    userPersistence.update(createUser);

    return {
      ...userPersistenceOutput,
      mapEntityToDomain: this._mapEntityToDomainFunction(userPersistence)
    };
  }
  

  public update() {
    // implementation goes here
  }

  public delete() {
    // implementation goes here
  }

  public findById() {
    // implementation goes here
  }

}