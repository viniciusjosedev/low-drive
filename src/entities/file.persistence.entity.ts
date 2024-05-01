import { FilePersistenceInputCreate, FilePersistenceOutput, IfileExtends } from "../interfaces/entities/file.persistence.entity.interface";
import File from "./file.entity";

export default class FilePersistence extends File {
  private _fileExtends: IfileExtends[];

  constructor ({ 
    files,
    user,
  }: FilePersistenceInputCreate) {
    super({ files, user });
    this._fileExtends = [];
    files.map((file) => {
      this._fileExtends.push({
        ...file,
        createdAt: file.createdAt || new Date(),
        id: file.id
      });
    });
  }

  private _addToFilesExtends(fileExtends: IfileExtends) {
    this._fileExtends.push(fileExtends);
  }

  private _updateToFilesExtends(fileExtends: IfileExtends) {
    const { fileIndex } = super.findFileByName(fileExtends.name);

    this._fileExtends[fileIndex] = fileExtends;
  }

  private _deleteToFilesExtends(name: string) {
    this._fileExtends = this._fileExtends.filter(({ name: nameExtend }) => nameExtend !== name);
  }

  public get(): FilePersistenceOutput {
    const user = super.user;

    return {
      files: this._fileExtends,
      user
    };
  }
	
  public create(fileExtends: IfileExtends) {
    super.create(fileExtends);

    this._addToFilesExtends(fileExtends);
  }

  public update(fileExtends: IfileExtends): void {
    super.update(fileExtends);

    this._updateToFilesExtends(fileExtends);
  }

  public delete(name: string): void {
    super.delete(name);

    this._deleteToFilesExtends(name);
  }
}