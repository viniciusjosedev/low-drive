import { CreateFileDatabase, CreateManyFileDatabase, DatabaseFileClient, FileDatabase, UpdateFileDatabase } from "../../interfaces/frameworks/databases/database-file-client.interface";
import prismaClient from "./database";

export default class DatabaseFile implements DatabaseFileClient {
  public async createMany({
    files,
    User,
  }: CreateManyFileDatabase): Promise<FileDatabase[]> {
    const [, , file] = await prismaClient.$transaction([
      prismaClient.file.createMany({
        data: files
      }),
      prismaClient.user.update({
        data: {
          storage: User.storage
        },
        where: {
          id: User.id
        }
      }),
      prismaClient.file.findMany({
        where: {
          userId: User.id
        },
        include: {
          User: true
        }
      }),
    ]);

    return file;
  }

  public async create({
    User,
    mimeType,
    name,
    size,
    type,
    userId,
    createdAt,
    id
  }: CreateFileDatabase): Promise<FileDatabase> {
    const [file, user] = await prismaClient.$transaction([
      prismaClient.file.create({
        data: {
          mimeType,
          name,
          size,
          type,
          userId,
          createdAt,
          id
        }
      }),
      prismaClient.user.update({
        data: {
          storage: User.storage
        },
        where: {
          id: User.id
        }
      }),
    ]);

    return { ...file, User: user };
  }

  public async update({
    User,
    id,
    createdAt,
    mimeType,
    name,
    size,
    type,
    userId
  }: UpdateFileDatabase): Promise<FileDatabase> {
    const data = {
      id,
      createdAt,
      mimeType,
      name,
      size,
      type,
      userId
    };

    const [file, user] = await prismaClient.$transaction([
      prismaClient.file.update({
        data,
        where: {
          id
        }
      }),
      prismaClient.user.update({
        data: {
          storage: User.storage
        },
        where: {
          id: User.id
        }
      })
    ]);

    return { ...file, User: user };
  }
	

  public async findById(id: string): Promise<FileDatabase | null> {
    return prismaClient.file.findUnique({
      where: {
        id
      },
      include: {
        User: true
      }
    });

  }

  public async delete(id: string): Promise<FileDatabase | boolean> {
    return prismaClient.file.delete({
      where: { id },
      include: {
        User: true
      }
    });
  }

  public async findAll(userId: string): Promise<FileDatabase[] | null> {
    return prismaClient.file.findMany({
      where: {
        userId
      },
      include: {
        User: true
      }
    });
  }
}

