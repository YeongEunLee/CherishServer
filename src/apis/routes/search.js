const express = require('express');

const router = express.Router();
const {
  check
} = require('express-validator');

const searchController = require('../../controller/searchController');

/**
 * @api {get} /search
 * @apiName searchWaterDate
 * @apiGroup Search
 */
router.get('/:id', searchController.searchWaterDate);
module.exports = router;