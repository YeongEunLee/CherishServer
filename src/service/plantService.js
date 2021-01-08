const { Plant_level } = require('../models');

module.exports = {
  getPlantImage: async ({ PlantId, level }) => {
    try {
      const plant = await Plant_level.findOne({
        attributes: ['image_url'],
        where: {
          PlantId,
          level,
        },
      });
      return plant.image_url;
    } catch (err) {
      throw err;
    }
  },
  getPlantLevel: ({ growth }) => {
    try {
      let level;
      if (growth < 3) {
        level = 0;
      } else if (growth < 7) {
        level = 1;
      } else if (gorwth < 12) {
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
