const log4js = require('log4js');

const logger = log4js.getLogger();

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    default: {
      type: 'file',
      filename: 'logs/cherish.log',
      pattern: '-yyyy-MM-dd',
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['default', 'console'],
      level: 'DEBUG',
    },
  },
});
logger.level = 'ALL';

module.exports = logger;
