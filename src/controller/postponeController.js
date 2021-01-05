const dayjs = require('dayjs');
const { Cherish, Plant, Water, sequelize } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { check } = require('express-validator');

module.exports = {
  /**
   * 물주는 날짜 미루기
   * req.params : id (Cherish id)
   * body: postpone (미루는 날짜, 1-7사이의 정수로 받음)
   */

  postponeWaterDate: async (req, res) => {
    const CherishId = req.params.id;
    const postpone = req.body.postpone;

    try {
      const waterDate = await Cherish.findOne({
        where: {
          id: CherishId,
        },
        attributes: ['water_date'],
      });
      const date = waterDate.water_date;
      const newDate = dayjs(date).add(postpone, 'day').format('YYYY-MM-DD hh:mm:ss');
      console.log(date);
      console.log(postpone);
      console.log(newDate);

      await Cherish.update(
        {
          water_date: newDate,
        },
        {
          where: {
            id: CherishId,
          },
        }
      );

      return res.status(sc.OK).send(ut.success(rm.OK, newDate));
    } catch (err) {
      console.log(err);
    }
    return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
  },
};
