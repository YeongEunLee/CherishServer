const { validationResult } = require('express-validator');

const { User } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const logger = require('../config/winston');

module.exports = {
  /*
   * user 정보 수정 (더보기 뷰)
   **/
  modifyUserNickname: async (req, res) => {
    logger.info('PUT /addview - modifyUserNickname');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(`PUT /addview - Paramaters Error`);
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const userId = req.body.id;
    const { nickname } = req.body;

    try {
      await User.update(
        {
          nickname: nickname,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.status(sc.OK).send(ut.success(rm.OK));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
