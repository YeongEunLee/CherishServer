const { Cherish } = require('../models');

module.exports = {
  cherishCheck: async ({ CherishId }) => {
    try {
      const alreadyCherish = await Cherish.findOne({
        where: {
          id: CherishId,
        },
      });
      return alreadyCherish;
    } catch (err) {
      throw err;
    }
  },
};
