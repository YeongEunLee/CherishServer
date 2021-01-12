const {
  validationResult
} = require('express-validator');
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

module.exports = {
  /**
   * 최신 연락 키워드 조회하기
   * req.params : CherishId (Cherish id)
   * body: keyword1, keyword2, keyword3
   */
  getNewKeyword: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // req.params 에서 CherishId 가져오기
    const CherishId = req.params.id;
    //
    try {
      const cherish = await Cherish.findOne({
        attributes: ['nickname'],
        where: {
          id: CherishId,
        },
      });

      const nickname = cherish.dataValues.nickname;

      //service 추가

      const water = await Water.findOne({
        attributes: ['id', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
          CherishId: CherishId,
        },
        order: [
          ['water_date', 'DESC']
        ]
      });
      //
      water.dataValues.water_date = dayjs(water.water_date).format('YY-DD-MM');
      //
      return res.status(sc.OK).send(ut.success(rm.CONTACT_KEYWORD_SUCCESS, {
        nickname,
        water
      }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail);
    }
  },


}