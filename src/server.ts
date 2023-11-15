import 'dotenv/config';
import { server } from './app';
import logger from './utils/logger';

server(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
