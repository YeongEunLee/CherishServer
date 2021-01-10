const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { Cherish, Water } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');

module.exports = {
  getCalendar: async (req, res) => {
    // 1. req.params 에서 CherishId 가져오기
    const CherishId = req.params.id;
    // 2.
    try {
      const water = await Water.findAll({
        attributes: ['review', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
          CherishId: CherishId,
        },
      });
      const cherish_water_date = await Cherish.findOne({
        attributes: ['water_date'],
        where: {
          id: CherishId,
        },
      });

      const future_water_date = cherish_water_date.water_date;
      return res
        .status(sc.OK)
        .send(ut.success(rm.CALENDAR_READ_SUCCESS, { water, future_water_date }));
    } catch (error) {
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.CALENDAR_READ_FAIL));
    }
  },
};
