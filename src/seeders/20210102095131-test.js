const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    const users = JSON.parse(fs.readFileSync(`${path.resolve()}/_dummyData/user.json`, 'utf-8'));
    const plant_status = JSON.parse(
      fs.readFileSync(`${path.resolve()}/_dummyData/plant_status.json`, 'utf-8')
    );
    const plant = JSON.parse(fs.readFileSync(`${path.resolve()}/_dummyData/plant.json`, 'utf-8'));
    const cherish = JSON.parse(
      fs.readFileSync(`${path.resolve()}/_dummyData/cherish.json`, 'utf-8')
    );
    const water = JSON.parse(fs.readFileSync(`${path.resolve()}/_dummyData/water.json`, 'utf-8'));

    await queryInterface.bulkInsert('user', users, {});
    await queryInterface.bulkInsert('plant_status', plant_status, {});
    await queryInterface.bulkInsert('plant', plant, {});
    await queryInterface.bulkInsert('cherish', cherish, {});
    await queryInterface.bulkInsert('water', water, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
