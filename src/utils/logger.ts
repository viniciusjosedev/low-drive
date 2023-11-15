import pino from 'pino';

class Log {
  public static logger () {
    return pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          messageFormat: '[ZE-DRIVE] {msg}'
        }
      }
    });
  }
}

export default Log.logger();
