const { Cherish } = require('../models');

module.exports = {
  cherishCheck: async ({ cherish_id }) => {
    try {
      const alreadyCherish = await Cherish.findOne({
        where: {
          id: cherish_id,
        },
      });
      return alreadyCherish;
    } catch (err) {
      throw err;
    }
  },
};
