const express = require('express');

const router = express.Router();
const {
  check
} = require('express-validator');

const checkEmailController = require('../../controller/checkEmailController');

/**
 * @api {post} /checkEmail
 * @apiName checkSameEmail
 * @apiGroup User
 */
router.post(
  '/',
  [
    check('email', 'email is required').not().isEmpty(),
  ],
  checkEmailController.checkSameEmail
);

module.exports = router;