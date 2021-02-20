const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { User } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');


module.exports = {
  /*
   * user 정보 수정 (더보기 뷰)
   **/
  modifyUserNickname: async (req, res) => {
    const UserId = req.body.id;
    const { nickname } = req.body;

    try {
      await User.update(
        {
          nickname: nickname,
        },
        {
          where: {
            id: UserId,
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
