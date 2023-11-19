import 'dotenv/config';
import server from './app';
import logger from './utils/logger';

server.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
