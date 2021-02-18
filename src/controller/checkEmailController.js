const {
  validationResult
} = require('express-validator');

const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const userService = require('../service/userService');
const logger = require('../config/winston');

module.exports = {
  /* 이메일 입력, 중복확인 */
  checkSameEmail: async (req, res) => {
    const {
      email
    } = req.body;

    if (!email) {
      console.log('필요한 값이 없습니다!');
      return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NULL_VALUE));
    }
    try {
      const alreadyEmail = await userService.emailCheck({
        email,
      });
      if (alreadyEmail) {
        console.log('이미 존재하는 이메일 입니다.');
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.ALREADY_EMAIL));
      }

      const t_email = email;

      return res.status(sc.OK).send(
        ut.success(rm.CHECKED_EMAIL_SUCCESS,
          //{email: t_email,}
        )
      );
    } catch (error) {
      console.error(error);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.CHECKED_EMAIL_FAIL));
    }
  },
};