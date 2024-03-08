import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { Options } from "../../../interfaces/frameworks/web/web-framework-options.inteface";
import createUserUseCase from "../../../use-cases/create-user";
import UserRepositoryImpl from "../../../repositories/user.repository";
import Database from "../../databases/database-client";
import UpdateUserUseCase from "../../../use-cases/update-user";
import DeleteUserCase from "../../../use-cases/delete-user";

const userRouter: FastifyPluginCallback<Options> = (
  fastify: FastifyInstance,
  opts: Options,
  done
) => {
  fastify.post("/user", async (request, response) => {
    // const userRepositoryImpl = new UserRepositoryImpl(new Database());

    // const userCase = new createUserUseCase(userRepositoryImpl);

    // // const teste = await userCase.execute();

    // return reply.status(200).send(teste);
  });


  fastify.put("/user", async (request, response) => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    const userCase = new UpdateUserUseCase(userRepositoryImpl);

    const teste = await userCase.execute("77dc216b-f490-4faa-a324-3493a677b2a6", {
      name: "TESTE"
    });

    return response.status(200).send(teste);
  });

  fastify.delete("/user", async (request, response) => {
    // const { } = request

    // const userRepositoryImpl = new UserRepositoryImpl(new Database());

    // const userCase = new DeleteUserCase(userRepositoryImpl);

    // const teste = userCase.execute("e46f4642-a525-4297-bddd-282e8ff4b82d");

    // return response.status(200).send({ deleted: teste, status: 200 });

  });



  done();
};

export default userRouter;
