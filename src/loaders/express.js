const express = require('express');
const api = require('../apis/routes');
const errorHandler = require('./error');
const { sequelize } = require('../models');

module.exports = (app) => {
  /**
   * Database sync
   */
  sequelize.sync({
    alter: false,
  });
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/health', (req, res) => {
    res.status(200).end();
  });
  app.head('/health', (req, res) => {
    res.status(200).end();
  });
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(express.json());
  app.use('/', api);
  app.use(errorHandler);
};
