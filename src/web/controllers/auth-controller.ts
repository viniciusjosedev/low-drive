import { FastifyReply, FastifyRequest } from "fastify";
import {
  BodyCreate,
  BodyLogin
} from "../../interfaces/web/user-controller-interface";
import UserService from "../services/user-service";
import LowDriveWebError from "../../errors/web/low-drive-web-error";
import messageErrorObj from "../../errors/web/messages-web-error";
import Authentication from "../authentication";
import { encodingPassword, verifyPassword } from "../crypto";

class AuthController {
  public static async login(req: FastifyRequest, res: FastifyReply) {
    const { email, password } = req.body as BodyLogin;

    const service = new UserService();

    const user = await service.getByEmail(email);

    if (!user) {
      throw new LowDriveWebError(messageErrorObj.userNotFound);
    }

    const isCorrectPassword = await verifyPassword(password, user.password);

    if (!isCorrectPassword) {
      throw new LowDriveWebError(messageErrorObj.wrongPassword);
    }

    const token = Authentication.sign({
      user: { id: user.id, email: user.email }
    });

    return res.status(200).send({ token });
  }

  public static async register(req: FastifyRequest, res: FastifyReply) {
    const { email, name, password } = req.body as BodyCreate;

    const service = new UserService();

    const hasUserWithThisEmail = await service.getByEmail(email);

    if (hasUserWithThisEmail) {
      throw new LowDriveWebError(messageErrorObj.thisUserAlreadyExist);
    }

    const hashPassword = await encodingPassword(password);

    await service.create({ email, name, password: hashPassword });

    return res.status(201).send();
  }
}

export default AuthController;
