import { UserPersistenceInput, UserPersistenceOutput } from "../interfaces/entities/user.persistence.entity.interface";
import User from "./user.entity";

export default class UserPersistence {
  private _user: User;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor ({
    name,
    email, 
    password, 
    token, 
    storage,
    createdAt,
    updatedAt
  }: UserPersistenceInput) {
    this._user = new User({
      name,
      email,
      password, 
      token, 
      storage
    });

    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  public get user(): User {
    return this._user;
  }

  public get(): UserPersistenceOutput {
    const userOutput = this._user.get();

    return {
      ...userOutput,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}