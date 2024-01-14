import LowDriveError from "../utils/lowDriveError";
import User from "./user.entite";

interface Ifile {
	name: string;
	mimeType: string;
	type: string;
	size: number;
}

interface FileInterface {
	files: Ifile[]
	user: User
}

export default class File {
  private _user: User;
  private _files: Ifile[];

  constructor({ files, user }: FileInterface) {
    this._files = files;
    this._user = user;
  }

  public get files(): Ifile[] {
    return this._files;
  }

  public get user(): User {
    return this._user;
  }

  public get(): FileInterface {
    return {
      files: this._files,
      user: this._user
    };
  }

  private isPossibleAddFile(size: number) {
    const newSize = this._user.storage + size;				

    return {
      haveSize: newSize <= 10.240,
      newSize
    };
  }

  public create(file: Ifile) {
    const { haveSize, newSize } = this.isPossibleAddFile(file.size);

    if (!haveSize) {
      LowDriveError.insufficientStorage();
    }

    this._files.push(file);
    this._user.update({
      storage: newSize
    });
  }

}