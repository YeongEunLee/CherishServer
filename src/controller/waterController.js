const {
  validationResult
} = require('express-validator');
const dayjs = require('dayjs');

const {
  Cherish,
  Water,
  sequelize
} = require('../models');

const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');

module.exports = {
  /**
   * body: water_date, review, keyword1, keyword2, keyword3, cherish_id
   */
  postWater: async (req, res) => {
    // 파라미터로 cherish_id 가져오기
    const cherish_id = req.params.id;

    const {
      water_date,
      review,
      keyword1,
      keyword2,
      keyword3,
    } = req.body;


    try {
      // water_date 나 cherish_id 가 없으면? 나빠요..
      if (!water_date) {
        console.log('필요한 값이 없습니다.')
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE))
      }

      // (삭제예정) Cherish에서 cherish_id를 CherishId로 받아오기 
      const cherish = await Cherish.findOne({
        id: cherish_id
      });


      // 점수 구하는 로직
      let score = 0;
      if (review) {
        score += 1;
        console.log('>>> 리뷰작성, score +1');
      }
      // keyword가 keyword1부터 채워지므로
      if (keyword1) {
        score += 1;
        console.log('>>> 키워드작성, score +1');
      }
      // 둘다 없을경우? (필요한가?)
      if (!review && !keyword1) {
        score += 0;
        console.log('>>> 리뷰-키워드작성안함, score 증가 없음');
      }



      // models_water에 작성한 내용 생성하기
      const water = await Water.create({
        water_date,
        review,
        keyword1,
        keyword2,
        keyword3,
        cherish_id
      });

      //await cherish.addPost(water);

      // Cherish에서 growth 받아오기
      const gg = await Cherish.findOne({
        attributes: ['growth'],
        where: {
          id: cherish_id,
        },
      });

      // cherish table growth 에 score 더해줌
      if (score) {
        gg.growth += score;
        console.log('>>> 애정도에 score 추가');
      }



      //오케이~
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
        errors: errors.array()
      });
    }

    const {
      cherish_id
    } = req.query;

    try {
      // Water 리뷰 가져오기
      const water = await Water.findAll({
        attributes: ['id', 'review', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
          cherish_id: cherish_id,
        },
      });

    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};


// Cherish growth(애정도) 계산 
// waterController 가 성공이면, Cherish growth(애정도) +1

// review != 0 이면 Cherish growth(애정도) +1
// keyword1,2,3 중 하나 이상 != 0 이면 Cherish growth(애정도) +1

// review !=0 이고 keyword1,2,3 !=0 이면 0 ?


// keyword는 user가 가지고 있음 , models/user의 user_id로 연결