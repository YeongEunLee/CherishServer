const { Cherish, User } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
//const logger = require('../config/winston');

module.exports = {
  getUserDetail: async (req, res) => {
    const { CherishId } = req.body;

    try {

      const cherishDetail = await Cherish.findOne({
        attributes: ['cycle_date', 'notice_time','UserId'],
        where: {
          id: CherishId
        }
      })

      const userDetail = await User.findOne({
        attributes: ['name', 'nickname', 'birth', 'phone'], 
        where: {
          id: cherishDetail.dataValues.UserId
        },
      });
      return res.status(sc.OK).send(
        ut.success(rm.GET_USER_SUCCESS, {
          userDetail,
          cherishDetail
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
