import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/user-service";
import LowDriveWebError from "../../errors/web/low-drive-web-error";
import messageErrorObj from "../../errors/web/messages-web-error";

class UserController {
  public static async show(req: FastifyRequest, reply: FastifyReply) {
    const { email } = req.user;

    const service = new UserService();

    const user = await service.getByEmail(email);

    if (!user) {
      throw new LowDriveWebError(messageErrorObj.userNotFound);
    }

    return reply.status(200).send({
      name: user.name,
      email: user.email,
      storage: user.storage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }
}

export default UserController;
