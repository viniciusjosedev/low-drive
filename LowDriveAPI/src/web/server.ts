import "dotenv/config";
import { server } from "./app";

server(process.env.APPLICATION_PORT);
