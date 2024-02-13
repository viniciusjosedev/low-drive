import "dotenv/config";
import { server } from "./app";

server(process.env.PORT || 8080);