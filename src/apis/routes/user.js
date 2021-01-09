const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const userController = require('../../controller/userController');

/**
 * @api {get}/user/:id
 * @apiName userMyPage
 * @apiGroup user
 */
router.get('/:id', [check('id', 'id is required').not().isEmpty()], userController.userMyPage);

module.exports = router;
