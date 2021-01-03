const { validationResult } = require('express-validator');

const { Cherish, Plant, sequelize } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');

module.exports = {
  /**
   * body: name, nickname, birth, phone, cycle_date, notice_time
   */
  createPlant: async (req, res) => {
    const { name, nickname, birth, phone, cycle_date, notice_time } = req.body;
    try {
      if (!name || !nickname || !birth || !phone || !cycle_date || !notice_time) {
        console.log('필요한 값이 없습니다.');
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
      }
      const PlantId = 1; //식물 추천해주는 알고리즘 넣으면 대체
      const UserId = 1;
      const cherish = await Cherish.create({
        name,
        nickname,
        birth,
        phone,
        cycle_date,
        notice_time,
        PlantId,
        UserId,
      });
      const plant = await Plant.findOne({
        id: PlantId,
        attributes: ['name', 'explanation', 'thumbnail_image_url'],
      });
      return res.status(sc.OK).send(ut.success(rm.OK, { nickname, plant }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
  getWaterPossible: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { cherish_id } = req.query;
    const t = await sequelize.transaction();
    try {
      const cherish = await Cherish.findOne({
        attributes: ['postpone_number'],
        where: {
          id: cherish_id,
        },
      });
      const is_limit_postpone_number = cherish && cherish.postpone_number >= 3 ? true : false;

      // 이미 미루기 횟수가 초과된 경우
      if (is_limit_postpone_number) {
        return res.status(sc.OK).send(ut.fail(rm.IMPOSSIBLE_WATER_POSTPONE));
      }
      return res.status(sc.OK).send(ut.success(rm.POSSIBLE_WATER_POSTPONE, { cherish }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
