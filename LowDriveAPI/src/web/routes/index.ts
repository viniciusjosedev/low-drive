import { FastifyInstance } from "fastify";
import UserRoute from "./user-routes";
import {
  DoneFastify,
  OptionsFastifyRoutes
} from "../../interfaces/web/helpers/fastify-helpers";
import AuthRoute from "./auth-router";

class Routes {
  public static index(
    req: FastifyInstance,
    opts: OptionsFastifyRoutes,
    done: DoneFastify
  ) {
    const props = [req, opts, done] as const;

    AuthRoute(...props);
    UserRoute(...props);

    done();
  }
}

export default Routes;
