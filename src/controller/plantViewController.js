const { validationResult } = require('express-validator');

const { Plant_level, Plant, sequelize } = require('../models');

const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const { NULL_VALUE } = require('../modules/responseMessage');

module.exports = {
  getPlantDetail: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const id = req.params.id;

    try {
      const plantResult = await Plant.findOne({
        attributes: ['modifier', 'flower_meaning', 'explanation'],
        where: {
          id: id,
        },
      });
      const mod = plantResult.dataValues.modifier;
      const modi = mod.split('\n ')[1];
      plantResult.modifier = modi;

      const exp = plantResult.dataValues.explanation;
      const explain = exp.split('\n')[0];
      plantResult.explanation = explain;

      console.log(modi);
      const plantDetail = await Plant_level.findAll({
        attributes: ['level_name', 'description', 'image_url'],
        where: {
          PlantId: id,
        },
      });

      return res
        .status(sc.OK)
        .send(ut.success(rm.PLANT_DERAIL_READ_SUCCESS, { plantResult, plantDetail }));
    } catch (err) {
      console.log(err);
      return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(rm.INTERNAL_SERVER_ERROR));
    }
  },
};
