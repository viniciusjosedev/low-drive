import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { Options } from "../../../interfaces/frameworks/web/web-framework-options.inteface";
import createUserUseCase from "../../../use-cases/create-user";
import UserRepositoryImpl from "../../../repositories/user.repository";
import Database from "../../databases/database-user-client";
import UpdateUserUseCase from "../../../use-cases/update-user";
import DeleteUserCase from "../../../use-cases/delete-user";
import FindByIdUserCase from "../../../use-cases/find-by-id-user";

const mockReturnValue = {
  name: "Vinicius",
  email: "vinicius@vinicorp.com",
  password: "admin@vinicius",
  storage: 0,
  token: "TOKEN",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: "1"
};
	
const userRouter: FastifyPluginCallback<Options> = (
  fastify: FastifyInstance,
  opts: Options,
  done
) => {
  fastify.post("/user", async (request, response) => {
    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    const userCase = new createUserUseCase(userRepositoryImpl);

    const teste = await userCase.execute(mockReturnValue);

    return response.status(200).send(teste);
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


  fastify.get("/user", async (request, response) => {

    const userRepositoryImpl = new UserRepositoryImpl(new Database());

    const userCase = new FindByIdUserCase(userRepositoryImpl);

    const teste = await userCase.execute("83ff0e39-d02c-426e-bcf8-87519e2497cc");

    return response.status(200).send(teste);

  });



  done();
};

export default userRouter;
