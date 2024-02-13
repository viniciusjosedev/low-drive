
import Fastfy, { FastifyInstance } from "fastify";
import logger from "../../logs/logger";
import routes from "./routes";
import cors from "@fastify/cors";
import { Options } from "../../interfaces/frameworks/web/web-framework-options.inteface";
import messageErrorObj from "../../errors/messages-error";
import LowDriveError from "../../errors/low-drive-error";

class Main {
  public static async server (
    port: string | number = 3000, 
    text: string = `Server running in port ${port}`
  ): Promise<FastifyInstance | void> 	{
    const app = Fastfy();

    app.register(cors, {	
      origin: "*",
    });

    app.register(import("@fastify/middie"));

    app.register(routes, { prefix: "/v1" } as Options);

    if (process.env.NODE_ENV === "test") return app;

    app.setErrorHandler((error, _request, rely) => {
      const INTERNAL_SERVER_ERROR = 500;

      if (error instanceof LowDriveError) {				
        const statusCode = error.statusCode || INTERNAL_SERVER_ERROR;

        return rely.status(statusCode).send({
          message: error.message,
          statusCode
        });
      }
		
      return rely.status(INTERNAL_SERVER_ERROR).send({
        message: messageErrorObj.internalServer.message,
        statusCode: INTERNAL_SERVER_ERROR
      });
    });

    app.listen({
      port: Number(port),
    });
    
    logger.info(text);
  }
}

export const { server } = Main;

export default Main;