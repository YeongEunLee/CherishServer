const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { Cherish, Water, sequelize } = require('../models');

const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { NULL_VALUE } = require('../modules/responseMessage');

module.exports = {
  /**
<<<<<<< HEAD
   * body: water_date, review, keyword1, keyword2, keyword3, user_id
   */
  postWater: async (req, res) => {
    // 파라미터로 CherishId 가져오기
    const {
      water_date,
      review,
      keyword1,
      keyword2,
      keyword3,
      CherishId
    } = req.body;

    try {

      // water_date 나 CherishId 가 없으면? 나빠요..
      if (!water_date || !CherishId) {
        console.log('필요한 값이 없습니다.')
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE))
=======
   * body: water_date, review, keyword1, keyword2, keyword3, CherishId
   */
  postWater: async (req, res) => {
    const { water_date, review, keyword1, keyword2, keyword3, CherishId } = req.body;

    try {
      if (!water_date) {
        console.log('필요한 값이 없습니다.');
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
>>>>>>> upstream/develop
      }
      //..keyword개수대로 증가하는 줄알고 짠코드 미련 못버림..
      /*
      let keywordList = [keyword1, keyword2, keyword3];

<<<<<<< HEAD

      // 점수 구하는 로직
=======
      let score = 0;
      keywordList.forEach((item) => {
        score += item === undefined ? 0 : 1;
      });
      console.log('%d점 증가했습니다.', score);
      */
>>>>>>> upstream/develop
      let score = 0;
      if (keyword1) {
        score += 1;
      }

<<<<<<< HEAD
=======
      if (review) {
        score += 1;
      }
>>>>>>> upstream/develop

      // models_water에 작성한 내용 생성하기
      const water = await Water.create({
        CherishId,
        water_date,
        review,
        keyword1,
        keyword2,
        keyword3,
<<<<<<< HEAD

=======
        CherishId,
>>>>>>> upstream/develop
      });

      // Cherish에서 growth 받아오기
      const cherishGrowth = await Cherish.findOne({
        attributes: ['growth'],
        where: {
          id: CherishId,
        },
      });

<<<<<<< HEAD
      // cherish table growth 에 score 더해줌
      if (score) {
        //gg.growth += score;
        console.log('>>> 애정도에 score 추가');
=======
      if (score != 0) {
        cherishGrowth.growth += score;
>>>>>>> upstream/develop
      }

      await Cherish.update(
        {
          postpone_number: 0,
        },
        {
          where: {
            id: CherishId,
          },
        }
      );

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

<<<<<<< HEAD
    const {
      CherishId
    } = req.query;
=======
    const { CherishId } = req.query;
>>>>>>> upstream/develop

    try {
      // Water 리뷰 가져오기
      const water = await Water.findAll({
        attributes: ['id', 'review', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
<<<<<<< HEAD
          CherishId: CherishId,
=======
          id: CherishId,
>>>>>>> upstream/develop
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
