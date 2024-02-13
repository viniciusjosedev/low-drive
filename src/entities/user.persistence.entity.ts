import { UserPersistenceInput, UserPersistenceOutput } from "../interfaces/entities/user.persistence.entity.interface";
import User from "./user.entity";

export default class UserPersistence {
  private _id?: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _user: User;

  constructor ({
    id,
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

    this._id = id;
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

  public update(input: Partial<UserPersistenceInput>): void{
    this._user.update(input);
    if (input.id) this._id = input.id;
    if (input.createdAt) this._createdAt = input.createdAt;
    if (input.updatedAt) this._updatedAt = input.updatedAt;
  }
}