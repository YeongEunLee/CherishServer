const { Plant_level } = require('../models');

module.exports = {
  getPlantLevel: ({ growth }) => {
    try {
      let level;
      if (growth < 3) {
        level = 0;
      } else if (growth < 7) {
        level = 1;
      } else if (growth < 12) {
        level = 2;
      } else {
        level = 3;
      }
      return level;
    } catch (err) {
      throw err;
    }
  },
};
