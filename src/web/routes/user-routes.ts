import { FastifyInstance } from "fastify";
import {
  DoneFastify,
  OptionsFastifyRoutes
} from "../../interfaces/web/helpers/fastify-helpers";
import UserController from "../controllers/user-controller";
import isAuth from "../middleware/isAuth";
import validatorCompiler from "../helpers/validator-compiler";

const UserRoute = (
  fastify: FastifyInstance,
  _opts: OptionsFastifyRoutes,
  done: DoneFastify
) => {
  fastify.get(
    "/user/:id",
    {
      validatorCompiler,
      preHandler: isAuth
    },
    UserController.show
  );

  done();
};

export default UserRoute;
