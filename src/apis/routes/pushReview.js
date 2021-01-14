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

router.put(
  '/',
  [check('CherishId', 'CherishId is required').not().isEmpty()],
  pushController.updateSendYN_REV
);

module.exports = router;
