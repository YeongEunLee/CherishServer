const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const userDetailController = require('../../controller/userDetailController');

/**
 * @api {get}/getUserDetail/:id
 * @apiName getUserDetail
 * @apiGroup getUserDetail
 */
//router.get('/', [check('id', 'id is required').not().isEmpty()], userDetailController.getUserDetail);
router.get('/:CherishId', userDetailController.getUserDetail);

module.exports = router;
