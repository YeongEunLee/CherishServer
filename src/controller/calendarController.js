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

      const future_water_date = dayjs(cherish_water_date.water_date).format('YYYY-MM-DD');
      water.map((item) => {
        let waterDate = item.dataValues.water_date;
        item.dataValues.water_date = dayjs(waterDate).format('YYYY-MM-DD');
      });

      return res
        .status(sc.OK)
        .send(ut.success(rm.CALENDAR_READ_SUCCESS, { water, future_water_date }));
    } catch (error) {
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.CALENDAR_READ_FAIL));
    }
  },

  modifyCalendar: async (req, res) => {
    try {
      const { CherishId, water_date, review, keyword1, keyword2, keyword3 } = req.body;

      const water = await Water.update(
        {
          review: review,
          keyword1: keyword1,
          keyword2: keyword2,
          keyword3: keyword3,
        },
        {
          where: {
            CherishId: CherishId,
            water_date: water_date,
          },
        }
      );
      return res.status(sc.OK).send(ut.success(rm.CALENDAR_MODIFY_SUCCESS));
    } catch (error) {
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.CALENDAR_MODIFY_FAIL));
    }
  },

  deleteCalendar: async (req, res) => {
    try {
      const { CherishId, water_date } = req.body;

      await Water.destroy({
        where: {
          CherishId: CherishId,
          water_date: water_date,
        },
      });
      return res.status(sc.OK).send(ut.success(rm.CALENDAR_DELETE_SUCCESS));
    } catch (error) {
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.CALENDAR_DELETE_FAIL));
    }
  },
};
