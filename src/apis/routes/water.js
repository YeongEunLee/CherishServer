const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const waterController = require('../../controller/waterController');

/**
 * @api {post} /water/:id
 * @apiName postWater
 * @apiGroup Water
 */
router.post('/', waterController.postWater);

/**
 * @api {get} /water/:id
 * @apiName getWater
 * @apiGroup Water
 */
router.get('/:id', waterController.getWater);

module.exports = router;
