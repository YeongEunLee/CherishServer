const dayjs = require('dayjs');
const { Cherish, Plant, Water, sequelize, User } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { validationResult } = require('express-validator');

module.exports = {
  /**
   * 물주는 날짜 미루기
   * req.params : id (Cherish id)
   * body: postpone (미루는 날짜, 1-7사이의 정수로 받음)
   */

  postponeWaterDate: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { id, postpone, is_limit_postpone_number } = req.body;
    const t = await sequelize.transaction();

    try {
      const cherish = await Cherish.findOne({
        where: {
          id: id,
        },
        attributes: ['water_date', 'growth'],
      });
      const date = cherish.water_date;
      const newDate = dayjs(date).add(postpone, 'day').format('YYYY-MM-DD hh:mm:ss');

      await Cherish.update(
        {
          water_date: newDate,
        },
        {
          where: {
            id: id,
          },
        },
        { transaction: t }
      );
      await Cherish.increment({ postpone_number: 1 }, { where: { id: id } }, { transaction: t });

      const user = await Cherish.findOne({
        where: {
          id: id,
        },
        attributes: ['UserId'],
      });

      await User.increment(
        { postpone_count: 1 },
        { where: { id: user.dataValues.UserId } },
        { transaction: t }
      );

      // 성장률이 0이 아니고 is_limit_postpone_number가 true일 때 성장률 -1 감소
      if (cherish.growth != 0 && is_limit_postpone_number) {
        await Cherish.increment({ growth: -1 }, { where: { id: id } }, { transaction: t });
        return res.status(sc.OK).send(ut.success(rm.DOWN_GROWTH));
      }
      t.commit();
      return res.status(sc.OK).send(ut.success(rm.POSTPONE_SUCCESS));
    } catch (err) {
      console.log(err);
      await t.rollback();
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },

  getPostpone: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { CherishId } = req.query;
    try {
      const cherish = await Cherish.findOne({
        attributes: ['water_date', 'postpone_number'],
        where: {
          id: CherishId,
        },
      });
      const is_limit_postpone_number = cherish && cherish.postpone_number >= 3 ? true : false;
      cherish.dataValues.water_date = dayjs(cherish.water_date).format('YY-MM-DD');

      return res
        .status(sc.OK)
        .send(ut.success(rm.GET_WATER_POSTPONE, { cherish, is_limit_postpone_number }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
  getPostponeCount: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { CherishId } = req.query;
    try {
      const cherish = await Cherish.findOne({
        attributes: ['water_date', 'postpone_number'],
        where: {
          id: CherishId,
        },
      });
      const is_limit_postpone_number = cherish && cherish.postpone_number >= 3 ? true : false;

      // 이미 미루기 횟수가 초과된 경우
      if (is_limit_postpone_number) {
        return res.status(sc.OK).send(ut.fail(rm.IMPOSSIBLE_WATER_POSTPONE));
      }
      return res.status(sc.OK).send(
        ut.success(rm.POSSIBLE_WATER_POSTPONE, {
          cherish,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
