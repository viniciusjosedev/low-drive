import { FastifyInstance } from "fastify";
import {
  DoneFastify,
  OptionsFastifyRoutes
} from "../../interfaces/web/fastify-helpers";
import AuthController from "../controllers/auth-controller";
import { authLogin, authRegister } from "../validations";
import validatorCompiler from "../helpers/validator-compiler";

const AuthRoute = (
  fastify: FastifyInstance,
  _opts: OptionsFastifyRoutes,
  done: DoneFastify
) => {
  fastify.post(
    "/auth/login",
    {
      schema: {
        body: authLogin
      },
      validatorCompiler
    },
    AuthController.login
  );
  fastify.post(
    "/auth/register",
    {
      schema: {
        body: authRegister
      },
      validatorCompiler
    },
    AuthController.register
  );

  done();
};

export default AuthRoute;
