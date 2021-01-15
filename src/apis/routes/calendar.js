const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const calendarController = require('../../controller/calendarController');
const logger = require('../config/winston');

/**
 * @api {put} /calendar
 * @apiName getCalendar
 * @apiGroup Calendar
 */
router.get(
  '/:id',
  logger.info('GET /calendar/:id'),
  [check('id', 'id is required').not().isEmpty()],
  calendarController.getCalendar
);

router.put(
  '/',
  logger.info('PUT /calendar'),
  [
    check('CherishId', 'CherishId is required').not().isEmpty(),
    check('water_date', 'water_date is required').not().isEmpty(),
  ],
  calendarController.modifyCalendar
);

router.delete(
  '/',
  logger.info('DELETE /calendar'),
  [
    check('CherishId', 'CherishId is required').not().isEmpty(),
    check('water_date', 'water_date is required').not().isEmpty(),
  ],
  calendarController.deleteCalendar
);

module.exports = router;
