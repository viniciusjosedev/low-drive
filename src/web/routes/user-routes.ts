import { FastifyInstance } from "fastify";
import {
  DoneFastify,
  OptionsFastifyRoutes
} from "../../interfaces/web/fastify-helpers";
import UserController from "../controllers/user-controller";
import joi from "joi";

const UserRoute = (
  fastify: FastifyInstance,
  _opts: OptionsFastifyRoutes,
  done: DoneFastify
) => {
  fastify.get(
    "/user/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            par1: { type: "number" }
          }
        }
      }
    },
    UserController.index
  );
  fastify.post(
    "/user",
    {
      schema: {
        body: joi
          .object()
          .keys({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).required()
          })
          .required()
      },
      validatorCompiler: ({ schema }) => {
        return (data) => (schema as joi.ObjectSchema).validate(data);
      }
    },
    UserController.create
  );

  done();
};

export default UserRoute;
