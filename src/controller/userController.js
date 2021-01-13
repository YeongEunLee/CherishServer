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
  Plant_level,
  User
} = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const {
  cherishService,
  plantService
} = require('../service');
const water = require('../models/water');

module.exports = {
  userMyPage: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      id
    } = req.params;
    try {
      const user = await User.findOne({
        attributes: ['name', 'nickname', 'postpone_count'], // postpone_count
        where: {
          id: id,
        },
      });

      const user_nickname = user.nickname;
      const postponeCount = user.postpone_count;
      const cherishes = await Cherish.findAll({
        where: {
          UserId: id,
        },
        include: [{
          model: Plant,
          include: [{
            model: Plant_level
          }],
        }, ],
        attributes: ['id', 'nickname', 'growth', 'water_date', 'PlantId'],
      });
      const result = [];
      cherishes.map(async (cherish) => {
        const obj = {};
        const level = plantService.getPlantLevel({
          growth: cherish.growth
        });
        obj.id = cherish.id;
        const water_date = dayjs(cherish.water_date);
        obj.dDay = water_date.diff(dayjs(), 'day');
        obj.nickname = cherish.nickname;
        obj.name =
          cherish && cherish.Plant && cherish.Plant.name ? cherish.Plant.name : '이름 없음';
        obj.thumbnail_image_url =
          cherish && cherish.Plant && cherish.Plant.thumbnail_image_url ?
          cherish.Plant.thumbnail_image_url :
          '썸네일 없음';
        obj.level = level;
        obj.PlantId = cherish.PlantId;
        result.push(obj);
      });
      const cherishIdList = cherishes.map((cherish) => cherish.id);
      const cherishCompleteList = cherishes.filter((cherish) => {
        return cherish.growth === 12;
      });
      const totalCherish = cherishes.length;
      const waterCount = await Water.count({
        where: {
          CherishId: cherishIdList
        }
      });
      const completeCount = cherishCompleteList.length;
      return res.status(sc.OK).send(
        ut.success(rm.READ_ALL_CHERISH_MY_PAGE_SUCCESS, {
          user_nickname,
          postponeCount,
          totalCherish,
          waterCount,
          completeCount,
          result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};