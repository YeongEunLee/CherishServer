const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { Cherish, Water, sequelize } = require('../models');

const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { NULL_VALUE } = require('../modules/responseMessage');

module.exports = {
  /**
   * body: water_date, review, keyword1, keyword2, keyword3, CherishId
   */
  postWater: async (req, res) => {
    // 파라미터로 CherishId 가져오기
    const CherishId = req.params.id;

    const { water_date, review, keyword1, keyword2, keyword3 } = req.body;

    try {
      if (!water_date) {
        console.log('필요한 값이 없습니다.');
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
      }
      //..keyword개수대로 증가하는 줄알고 짠코드 미련 못버림..
      /*
      let keywordList = [keyword1, keyword2, keyword3];

      let score = 0;
      keywordList.forEach((item) => {
        score += item === undefined ? 0 : 1;
      });
      console.log('%d점 증가했습니다.', score);
      */
      let score = 0;
      if (keyword1) {
        score += 1;
        console.log('키워드 작성, score증가');
      }

      if (review) {
        score += 1;
        console.log('리뷰 작성, score증가');
      }

      if (!review && !keyword) {
        console.log('리뷰, 키워드 작성안함, score 증가 없음');
      }

      // models_water에 작성한 내용 생성하기
      const water = await Water.create({
        water_date,
        review,
        keyword1,
        keyword2,
        keyword3,
        CherishId,
      });

      // Cherish에서 growth 받아오기
      const cherishGrowth = await Cherish.findOne({
        attributes: ['growth'],
        where: {
          id: CherishId,
        },
      });

      if (score != 0) {
        cherishGrowth.growth += score;
        console.log('애정도가 %d점 추가되었습니다.', score);
      }

      return res.status(sc.OK).send(ut.success(rm.OK, water));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },

  // CherishId 별 리뷰내용 보기
  getWater: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { CherishId } = req.query;

    try {
      // Water 리뷰 가져오기
      const water = await Water.findAll({
        attributes: ['id', 'review', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
          CherishId: CherishId,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
