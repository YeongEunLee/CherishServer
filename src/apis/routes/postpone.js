const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const postponeController = require('../../controller/postponeController');

/**
 * @api {put}/postpone
 * @apiName postponeWaterDate
 * @apiGroup postpone
 */
router.put('/:id', postponeController.postponeWaterDate);

module.exports = router;
