const { Water } = require('../models');
const dayjs = require('dayjs');

module.exports = {
  postWater: async (CherishId, water_date, review, keyword1, keyword2, keyword3) => {
    try {
      //water_date 구하기
      const waterDate = dayjs(water_date).format('YYYY-MM-DD');

      const water = await Water.create({
        CherishId,
        review,
        keyword1,
        keyword2,
        keyword3,
        water_date: waterDate,
      });

      return water;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
