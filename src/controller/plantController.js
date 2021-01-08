const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { Cherish, Plant, Water, User, sequelize, Plant_level } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { cherishService, plantService } = require('../service');

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
      return res.status(sc.OK).send(
        ut.success(rm.OK, {
          plant,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
  /*
   * cherish 삭제
   **/
  deleteCherish: async (req, res) => {
    const CherishId = req.params.id;

    if (!CherishId) {
      console.log('필요한 값이 없습니다!');
      return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
    }
    try {
      const alreadyCherish = await cherishService.cherishCheck({ CherishId });
      if (!alreadyCherish) {
        console.log('없는 체리쉬 입니다.');
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.OUT_OF_VALUE));
      }

      await Cherish.destroy({
        where: {
          id: CherishId,
        },
      });
      return res.status(sc.OK).send(ut.success(rm.OK));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },

  /*
   * cherish 정보 수정
   **/
  modifyCherish: async (req, res) => {
    const CherishId = req.params.id;
    const { nickname, birth, cycle_date, notice_time, water_notice } = req.body;

    if (!CherishId) {
      console.log('필요한 값이 없습니다!');
      return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
    }
    if (!nickname || !birth || !cycle_date || !notice_time || !water_notice) {
      console.log('필요한 값이 없습니다!');
      return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
    }
    try {
      const alreadyCherish = await cherishService.cherishCheck({ CherishId });
      if (!alreadyCherish) {
        console.log('없는 체리쉬 입니다.');
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.OUT_OF_VALUE));
      }
      await Cherish.update(
        {
          nickname: nickname,
          birth: birth,
          cycle_date: cycle_date,
          notice_time: notice_time,
          water_notice: water_notice,
        },
        { where: { id: CherishId } }
      );
      return res.status(sc.OK).send(ut.success(rm.OK));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },

  getCherishInfo: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { CherishId } = req.query;
    try {
      const cherish = await Cherish.findOne({
        attributes: ['name', 'nickname', 'birth', 'PlantId', 'start_date', 'water_date'],
        where: {
          id: CherishId,
        },
      });
      const result = {};
      result.name = cherish.name;
      result.nickname = cherish.nickname;

      /**
       * birth Format MM.DD로 변경
       * 접근하려면 dataValues로 접근해야 합니다.
       */
      result.birth = dayjs(cherish.birth).format('MM.DD');

      /**
       * start_date로 경과일(duration) 구하기
       */
      const start_date = dayjs(cherish.start_date);
      const now_date = dayjs();
      result.duration = now_date.diff(start_date, 'day');

      /**
       * water_date로 디데이(dDay) 구하기
       */
      const water_date = dayjs(cherish.water_date);
      result.dDay = water_date.diff(now_date, 'day');

      // 식물 이름(plant_name), 식물 썸네일 사진(plant_thumbnail_image_url)
      const plant = await Plant.findOne({
        attributes: ['name', 'thumbnail_image_url'],
        where: {
          id: cherish.dataValues.PlantId,
        },
      });
      console.log(plant);
      result.plant_name = plant.name;
      result.plant_thumbnail_image_url = plant.thumbnail_image_url;

      // 메모(water) 가져오기
      const water = await Water.findAll({
        attributes: ['id', 'review', 'water_date', 'keyword1', 'keyword2', 'keyword3'],
        where: {
          CherishId: CherishId,
        },
        // order: [['id', 'DESC']],
      });
      if (water) {
        result.keyword1 = water[0].keyword1;
        result.keyword2 = water[0].keyword2;
        result.keyword3 = water[0].keyword3;
        water.map((w, i) => {
          water[i].dataValues.water_date = dayjs(w.water_date).format('MM/DD');
        });
        result.reviews = water;
      }
      return res.status(sc.OK).send(ut.success(rm.READ_ALL_CHERISH_BY_ID_SUCCESS, result));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
  getCherishList: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const id = req.params.id;
    try {
      const cherishes = await Cherish.findAll({
        include: [
          {
            model: Plant,
          },
        ],
        where: {
          UserId: id,
        },
      });
      const plant_level = await Plant_level.findAll({});
      const plant_map = new Map();
      plant_level.map(async (plant_info) => {
        const PlantId = plant_info.PlantId;
        const level = plant_info.level;
        plant_map.set(`${PlantId},${level}`, plant_info.image_url);
      });
      const result = [];
      await cherishes.map(async (cherish) => {
        const obj = {};
        const level = await plantService.getPlantLevel({ growth: cherish.growth });
        const PlantId = cherish.PlantId;
        obj.id = cherish.id;
        const water_date = dayjs(cherish.water_date);
        obj.dDay = water_date.diff(dayjs(), 'day');
        obj.nickname = cherish.nickname;
        obj.growth = cherish.growth / 12;
        obj.plant_name = cherish.Plant.name;
        obj.image_url = plant_map.get(`${PlantId},${level}`);
        obj.thumbnail_image_url = cherish.Plant.thumbnail_image_url;
        result.push(obj);
      });
      result.sort((a, b) => {
        return a.dDay - b.dDay;
      });
      return res
        .status(sc.OK)
        .send(ut.success(rm.READ_ALL_CHERISH_SUCCESS, { result, totalCherish: result.length }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
