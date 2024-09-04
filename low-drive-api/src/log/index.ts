import pino from "pino";

export default pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      messageFormat: "[LOW-DRIVE] {msg}"
    }
  }
});
