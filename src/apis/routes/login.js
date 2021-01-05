const express = require('express');

const router = express.Router();
const {
  check
} = require('express-validator');

const loginController = require('../../controller/loginController');

/**
 * @api {post} /login
 * @apiName signin
 * @apiGroup User
 */
router.post('/signin', loginController.signin);

module.exports = router;