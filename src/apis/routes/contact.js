const express = require('express');

const router = express.Router();
const {
  check
} = require('express-validator');

const contactController = require('../../controller/contactController');

/**
 * @api {get} /contact
 * @apiName getNewKeyword
 * @apiGroup Contact
 */
router.get('/:id', contactController.getNewKeyword);

module.exports = router;