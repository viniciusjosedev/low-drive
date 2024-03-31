import { CreateUserDatabase, DatabaseUserClient, UpdateUserDatabase, UserDatabase } from "../../interfaces/frameworks/databases/database-user-client.interface";
import prismaClient from "./database";

export default class Database implements DatabaseUserClient {
  public async create(input: CreateUserDatabase): Promise<UserDatabase> {
    return prismaClient.user.create({ data: input });
  }

  public async update(input: UpdateUserDatabase): Promise<UserDatabase> {
    return prismaClient.user.update({ where: { id: input.id }, data: { ...input, updatedAt: new Date() } });
  }

  public async findById(id: string): Promise<UserDatabase | null> {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public async delete(id: string): Promise<UserDatabase | boolean> {
    return await prismaClient.user.delete({ where: { id } });
  }

}
