//Defines log levels for conditional logging
const LOG_LEVEL_ERROR = 0;
const LOG_LEVEL_INFO = 1;
const LOG_LEVEL_DEBUG = 2;
const LOG_LEVEL_ALL = 3;
const SYS_LOG_LEVEL = Number(process.env.SYS_LOG_LEVEL) || 1;

//Conditional logging based on log levels (see exports below)
const logIt = (levelParam, message, obj = null) => {
  const level = Number(levelParam);

  if (level <= SYS_LOG_LEVEL) {
    switch (level) {
      case 0:
        if (obj instanceof Error)
          console.error(`ERROR|${message}`, obj);
        else
          console.error(`ERROR|${message}`);
        break;
      case 1:
        if (obj)
          console.info(`INFO|${message}`, obj);
        else
          console.info(`INFO|${message}`);
        break;
      case 2:
        if (obj)
          console.debug(`DEBUG|${message}`, obj);
        else
          console.debug(`DEBUG|${message}`);
        break;
      case 3:
        if (obj)
          console.log(`LOG|${message}`, obj);
        else
          console.log(`LOG|${message}`);
        break;
      default:
        if (obj)
          console.log(`Log level should be 0-3, found ${level} with message: ${message} | ${obj}`);
        else
          console.log(`Log level should be 0-3, found ${level} with message: ${message}`);
        break;
    }
  }


};

export { LOG_LEVEL_ERROR, LOG_LEVEL_INFO, LOG_LEVEL_DEBUG, LOG_LEVEL_ALL };

export default logIt;