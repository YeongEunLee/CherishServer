const {
  Water
} = require('../models');

module.exports = {

  postWater: async (CherishId, review, keyword1, keyword2, keyword3) => {
    try {

      //water_date 구하기
      const moment = require('moment');
      require('moment-timezone');
      moment.tz.setDefault("Asia/Seoul");
      const waterDate = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log('It is ', waterDate);

      const water = await Water.create({
        CherishId,
        review,
        keyword1,
        keyword2,
        keyword3,
        water_date: waterDate
      });



      return water;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};