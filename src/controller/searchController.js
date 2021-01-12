const dayjs = require('dayjs');
const {
  Cherish,
  Plant,
  Water,
  sequelize,
  User
} = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const {
  validationResult
} = require('express-validator');

module.exports = {
  /**
   * 물주는 날짜 조회하기
   * req.params : id (Cherish id)
   * body: water_date
   */

  searchWaterDate: async (req, res) => {
    // 1. req.params 에서 CherishId 가져오기
    const CherishId = req.params.id;
    // 2.
    try {
      const cherish = await Cherish.findOne({
        attributes: ['water_date'],
        where: {
          id: CherishId,
        },
      });

      const WaterDate = dayjs(cherish.water_date).format('YY-DD-MM');
      //water.dataValues.water_date;
      return res.status(sc.OK).send(
        ut.success(rm.SEARCH_SUCCESS, {
          WaterDate,
        })
      );
    } catch (error) {
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.SEARCH_FAIL));
    }
  },
};