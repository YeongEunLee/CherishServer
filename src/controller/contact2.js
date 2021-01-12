const {
  validationResult
} = require('express-validator');
const dayjs = require('dayjs');

const {
  Cherish,
  Plant,
  Water,
  Plant_status,
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
      // 결과 받을 result 생성
      const result = {};

      const cherish = await Cherish.findOne({
        attributes: ['nickname', 'PlantId'],
        where: {
          id: CherishId,
        },
      });



      result.nickname = cherish.nickname;

      // water에서 키워드 가져오기
      const water = await Water.findAll({
        attributes: ['id', 'review', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
          id: CherishId,
        },
      });
      console.log('~');

      // water값을 가져왔다면, result의 keyword에는 water의 0번째 인덱스의 keyword값을 저장
      if (water) {
        result.keyword1 = water[0].keyword1;
        result.keyword2 = water[0].keyword2;
        result.keyword3 = water[0].keyword3;
        // water_date는 날짜별로 water에 정렬
        water.map((w, i) => {
          water[i].dataValues.water_date = dayjs(w.water_date).format('YY-MM-DD');
        });
        //result의 keywords에 water 값 저장
        result.keywords = water;
      }
      return res.status(sc.OK).send(ut.success(rm.CONTACT_KEYWORD_SUCCESS, result));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail);
    }
  },


}