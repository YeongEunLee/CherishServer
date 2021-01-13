const dayjs = require('dayjs');
const { App_push_user, sequelize } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { validationResult } = require('express-validator');

module.exports = {
  getPushUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { send_code } = req.params;

    try {
      const pushUser = await App_push_user.findAll({
        where: {
          send_code: send_code,
          send_yn: 'N',
        },
        attributes: [
          'send_code',
          'push_date',
          'mobile_os_type',
          'mobile_device_token',
          'send_yn',
          'title',
          'message',
          'CherishId',
          'UserId',
        ],
      });
      return res.status(sc.OK).send(ut.success(rm.GET_PUSH_USER_SUCCESS, pushUser));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.GET_PUSH_USER_FAIL));
    }
  },
};
