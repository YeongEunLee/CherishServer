const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const calendarController = require('../../controller/calendarController');

/**
 * @api {put} /calendar
 * @apiName getCalendar
 * @apiGroup Calendar
 */
router.get('/:id', [check('id', 'id is required').not().isEmpty()], calendarController.getCalendar);

router.put(
  '/',
  [
    check('CherishId', 'CherishId is required').not().isEmpty(),
    check('water_date', 'water_date is required').not().isEmpty(),
  ],
  calendarController.modifyCalendar
);

router.delete(
  '/',
  [
    check('CherishId', 'CherishId is required').not().isEmpty(),
    check('water_date', 'water_date is required').not().isEmpty(),
  ],
  calendarController.deleteCalendar
);

module.exports = router;
