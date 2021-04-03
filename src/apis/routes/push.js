const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const pushController = require('../../controller/pushController');

/**
 * @api {put} /
 * @apiName
 * @apiGroup
 */
router.get(
  '/:send_code/:notice_time',
  [check('send_code', 'send_code is required').not().isEmpty()],
  pushController.getPushUser
);

router.post(
  '/',
  [check('CherishId', 'CherishId is required').not().isEmpty()],
  pushController.contactCherish
);

router.put(
  '/',
  [check('CherishId', 'CherishId is required').not().isEmpty()],
  pushController.updateSendYN_COM
);

module.exports = router;
