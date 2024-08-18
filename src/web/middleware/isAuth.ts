import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import Authentication from "../authentication";
import LowDriveWebError from "../../errors/web/low-drive-web-error";
import messageErrorObj from "../../errors/web/messages-web-error";

const isAuth = async (
  req: FastifyRequest,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  const { authorization } = req.headers;

  const token = authorization?.split("Bearer")[1]?.trim();

  if (!token) {
    throw new LowDriveWebError(messageErrorObj.unauthorized);
  }

  const verify = Authentication.verify(token);

  if (verify === "invalid") {
    throw new LowDriveWebError(messageErrorObj.unauthorized);
  }

  req.user = verify.user;

  next();
};

export default isAuth;
