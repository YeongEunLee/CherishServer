const expressLoader = require('./express');
const logger = require('../config/winston');

module.exports = async (expressApp) => {
  await expressLoader(expressApp);
  logger.info('✌️ Express loaded');
};
