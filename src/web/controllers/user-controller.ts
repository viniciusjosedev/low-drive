import { FastifyReply, FastifyRequest } from "fastify";
import { BodyCreate } from "../../interfaces/web/user-controller-interface";
import UserService from "../services/user-service";
import LowDriveWebError from "../../errors/web/low-drive-web-error";
import messageErrorObj from "../../errors/web/messages-web-error";

class UserController {
  public static async index(_req: FastifyRequest, res: FastifyReply) {
    const { id } = _req.params;

    console.log(id);

    return res.send();
  }

  public static async create(req: FastifyRequest, res: FastifyReply) {
    const { email, name, password } = req.body as BodyCreate;

    const service = new UserService();

    const hasUserWithThisEmail = await service.getByEmail(email);

    if (hasUserWithThisEmail) {
      throw new LowDriveWebError(messageErrorObj.thisUserAlreadyExist);
    }

    await service.create({ email, name, password });

    return res.status(201).send();
  }
}

export default UserController;
