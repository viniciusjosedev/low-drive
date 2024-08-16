import db from "../../databases";
import { UserCreate } from "../../interfaces/web/user-service-interface";

class UserService {
  public async getByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
  }

  public async create(data: UserCreate) {
    return (await db.$transaction([db.user.create({ data })]))[0];
  }
}

export default UserService;
