const express = require('express');
const Logger = require('./loaders/logger');
const config = require('./config');
const loader = require('./loaders');

async function startServer() {
  const app = express();

  await loader(app);

  app
    .listen(config.port, () => {
      Logger.info(`✌️ Server listening on port: ${config.port}`);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
