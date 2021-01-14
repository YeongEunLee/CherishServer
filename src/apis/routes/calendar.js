const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const calendarController = require('../../controller/calendarController');

/**
 * @api {put} /calendar
 * @apiName getCalendar
 * @apiGroup Calendar
 */
router.get('/:id', calendarController.getCalendar);

router.put('/', calendarController.modifyCalendar);

router.delete('/', calendarController.deleteCalendar);

module.exports = router;
