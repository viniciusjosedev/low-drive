import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { Options } from "../../../interfaces/frameworks/web/web-framework-options.inteface";
import createUserUseCase from "../../../use-cases/create-user";
import UserRepositoryImpl from "../../../repositories/user.repository";

const userRouter: FastifyPluginCallback<Options> = (
  fastify: FastifyInstance,
  opts: Options,
  done
) => {
  fastify.post("/user", async (request, reply) => {
    const userCase = new createUserUseCase(new UserRepositoryImpl());

    // const teste = await userCase.execute(mockUserObj);

    // return reply.status(200).send(teste);
  });
  done();
};

export default userRouter;
