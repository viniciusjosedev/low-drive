import messagesError from "../utils/messages-error";
import LowDriveError from "../utils/low-drive-error";
import User from "./user.entity";
import { FileInput, FileOutput, Ifile } from "../interfaces/entities/file.entity.interface";
export default class File {
  private _user: User;
  private _files: Ifile[];

  constructor({ files, user }: FileInput) {
    this._files = files;
    this._user = user;
  }

  public get files(): Ifile[] {
    return this._files;
  }

  public get user(): User {
    return this._user;
  }

  private findFileByName(name: string) {
    let fileIndex: number | undefined;

    const findFile = this._files.find((file, index) => {
      if (file.name === name) {
        fileIndex = index;
        return true;
      }
    });

    if (!findFile) {
      throw new LowDriveError(messagesError.fileNotFound);
    }

    return {
      file: findFile,
      fileIndex: fileIndex as number
    };
  }

  private isPossibleAddFile(size: number) {
    const newSize = this._user.storage + size;				

    return {
      haveSize: newSize <= 10240,
      newSize
    };
  }

  private isPossibleAttFile(name: string, size: number) {
    const { file: findFile, fileIndex } = this.findFileByName(name);

    const newSize = (this._user.storage - findFile.size) + size;

    return {
      haveSize: newSize <= 10240,
      newSize,
      fileIndex
    };
  }

  public get(): FileOutput {
    return {
      files: this._files,
      user: this._user
    };
  }

  public create(file: Ifile) {
    const { haveSize, newSize } = this.isPossibleAddFile(file.size);

    if (!haveSize) {
      throw new LowDriveError(messagesError.insufficientStorage);
    }

    this._files.push(file);
    this._user.update({
      storage: newSize
    });
  }

  public update(file: Ifile) {
    const { haveSize, newSize, fileIndex } = this.isPossibleAttFile(file.name, file.size);
	
    if (!haveSize){
      throw new LowDriveError(messagesError.insufficientStorage);
    }
		
    if (typeof fileIndex === "number") {
      this._files[fileIndex].size = newSize;
      this._user.update({
        storage: newSize
      });
    }

  }

  public delete(name: string) {
    const { file: findFile, fileIndex } = this.findFileByName(name);

    const newStorage = this._user.storage - findFile.size;

    this._user.update({
      storage: newStorage
    });

    this._files.splice(fileIndex, 1);
  }
}