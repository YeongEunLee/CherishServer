const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const pushController = require('../../controller/pushController');

/**
 * @api {put} /
 * @apiName
 * @apiGroup
 */
router.get('/:send_code', pushController.getPushUser);

module.exports = router;
