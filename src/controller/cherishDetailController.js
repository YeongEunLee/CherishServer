const { Cherish, User } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const dayjs = require('dayjs');
//const logger = require('../config/winston');

module.exports = {
  getCherishDetail: async (req, res) => {
    const { CherishId } = req.params;

    try {
      const cherishDetail = await Cherish.findOne({
        attributes: ['nickname', 'birth', 'cycle_date', 'notice_time','water_notice'],
        where: {
          id: CherishId
        }
      })

      cherishDetail.dataValues.birth = dayjs(cherishDetail.dataValues.birth).format('YYYY-MM-DD');
      //dayjs(cherish.birth).format('MM.DD');

      return res.status(sc.OK).send(
        ut.success(rm.GET_USER_SUCCESS, {
          cherishDetail
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
