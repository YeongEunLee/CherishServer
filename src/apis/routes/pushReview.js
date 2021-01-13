const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const pushController = require('../../controller/pushController');

/**
 * @api {post} /
 * @apiName
 * @apiGroup
 */

router.post(
  '/',
  [check('CherishId', 'CherishId is required').not().isEmpty()],
  pushController.reviewPush
);

module.exports = router;
