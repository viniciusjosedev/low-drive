import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import log from "../log";
import middie from "@fastify/middie";
import Routes from "./routes";

import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import Joi from "joi";
import LowDriveWebError from "../errors/web/low-drive-web-error";

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true
});

ajvFormats(ajv);
ajvErrors(ajv, { singleError: true });

export { ajv };

class Main {
  public static async server(
    port: number | undefined | string = 3000,
    text: string = `Server running in port ${port}`
  ): Promise<FastifyInstance | void> {
    const app = fastify();

    // app.setValidatorCompiler((opt) => ajv.compile(opt));

    app.register(cors, {
      origin: "*"
    });

    app.register(middie);

    app.register(Routes.index, { prefix: "/v1" });

    if (process.env.NODE_ENV === "test") return app;

    app.setErrorHandler((error, _req, reply) => {
      if (error instanceof Joi.ValidationError) {
        return reply.status(400).send({
          statusCode: 400,
          message: error.message,
          code: "LOW_DRIVE_ERR_VALIDATION"
        });
      } else if (error instanceof LowDriveWebError) {
        return reply.status(error.statusCode).send({
          statusCode: error.statusCode,
          message: error.message,
          code: error.code
        });
      }

      return reply.send(error);
    });

    app.listen({ port: Number(port) }, () => {
      log.info(text);
    });
  }
}

export const { server } = Main;

export default Main;
