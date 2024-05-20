import FilePersistence from "../../entities/file.persistence.entity";
import User from "../../entities/user.entity";
import UserPersistence from "../../entities/user.persistence.entity";
import { FileOutput } from "../../interfaces/entities/file.entity.interface";
import { FilePersistenceOutput } from "../../interfaces/entities/file.persistence.entity.interface";
import { DatabaseFileClient } from "../../interfaces/frameworks/databases/database-file-client.interface";
import { FileRepository } from "../../interfaces/repositories/file/file.repository.interface";
import { mapEntityToDomain } from "../../interfaces/repositories/map-entity-to-domain.interface";

export default class FileRepositoryImpl implements FileRepository {
  private _database: DatabaseFileClient;

  constructor(input: DatabaseFileClient) {
    this._database = input;
  }

  private _mapEntityToDomainFunction(filePersistence: FilePersistence) {
    return () => { return filePersistence.get(); };
  }

  public async create(filePersistence: FilePersistence): Promise<FilePersistenceOutput & mapEntityToDomain<FileOutput>> {
    let filePersistenceOutput = filePersistence.getPersistence();
    const userPersistenceWithId = {
      ...filePersistenceOutput.user.get(),
      id: filePersistenceOutput.user.get().id as string
    };


    const fileCreatedArray = await this._database.createMany({
      User: userPersistenceWithId,
      files: filePersistenceOutput.files
    });

    fileCreatedArray.forEach(filePersistence.update);

    filePersistenceOutput = filePersistence.getPersistence();

    return {
      ...filePersistenceOutput,
      mapEntityToDomain: this._mapEntityToDomainFunction(filePersistence)
    };
  }

  public async update(filePersistence: FilePersistence): Promise<FilePersistenceOutput & mapEntityToDomain<FileOutput>> {
    let filePersistenceOutput = filePersistence.getPersistence();
    const user = filePersistenceOutput.user.get();

    await Promise.all(filePersistenceOutput.files.map((file) => {
      this._database.update({
        ...file,
        id: file?.id as string,
        User: {
          ...user,
          id: user?.id as string
        }
      });
    }));

    const filesUpdate = await this._database.findAll(user.id as string);

    filesUpdate?.forEach(filePersistence.update);

    filePersistenceOutput = filePersistence.getPersistence();

    return {
      ...filePersistenceOutput,
      mapEntityToDomain: this._mapEntityToDomainFunction(filePersistence)
    };
  }
	
  public async delete(id: string): Promise<boolean> {
    if (await this._database.delete(id)) true;
    return false;
  }

  public async findById(id: string): Promise<(FilePersistenceOutput & mapEntityToDomain<FileOutput>) | null> {
    const findFile = await this._database.findById(id);
  
    if (!findFile) {
      return null;
    }

    const filePersistence = new FilePersistence({
      files: [findFile],
      user: new UserPersistence({ 
        user: new User({ ...findFile.User }),
        createdAt: findFile.User.createdAt,
        id: findFile.User.id,
        updatedAt: findFile.User.updatedAt
      })
    });

    const filePersistenceOutput = filePersistence.getPersistence();

    return {
      ...filePersistenceOutput,
      mapEntityToDomain: this._mapEntityToDomainFunction(filePersistence)
    };
  }

}