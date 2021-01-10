const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const { User, sequelize } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const userService = require('../service/userService');

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // 1. req.body에서 데이터 가져오기
    const { email, password } = req.body;

    try {
      //2. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
      const alreadyEmail = await userService.emailCheck({
        email,
      });
      if (!alreadyEmail) {
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.NO_USER));
      }
      //3. password(=alreadyPassword)와 일치하면 true, 일치하지 않으면 Miss Match password 반환
      if (password !== alreadyEmail.password) {
        return res.status(sc.BAD_REQUEST).send(ut.fail(rm.MISS_MATCH_PW, password));
      }
      const user = await userService.signin({
        email,
        password,
      });
      const UserId = user.id;
      //4. status: 200 ,message: SIGN_IN_SUCCESS, data: email반환
      return res.status(sc.OK).send(ut.success(rm.SIGN_IN_SUCCESS, { UserId }));
    } catch (error) {
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.SIGN_IN_FAIL));
    }
  },

  signup: async (req, res) => {
    const { email, password, sex, birth, nickname } = req.body;

    if (!email || !password || !sex || !birth || !nickname) {
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
      const user = await userService.signup(email, password, sex, birth, nickname);

      return res.status(sc.OK).send(
        ut.success(rm.SIGN_UP_SUCCESS, {
          nickname: user.nickname,
        })
      );
    } catch (error) {
      console.error(error);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.SIGN_UP_FAIL));
    }
  },
};

/**
 * salt는 일단 뺏읍니다.
 * 1. req.body에서 데이터 가져오기
 * >> models/user의 email, password
 * 2. request data 확인하기, email, password data가 없다면 NullValue 반환
 * 3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
 * 4. 비밀번호 확인하기 - 로그인할 email의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와 암호화
 * 5. 디비에 저장되어있는 password와 일치하면 true, 일치하지 않으면 Miss Match password 반환
 * 6. status: 200 ,message: SIGN_IN_SUCCESS, data: id, email 반환
 */
