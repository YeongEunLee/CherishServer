const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Cherish',
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      growth: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cycle_date: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      water_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      postpone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      notice_time: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      status_code: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : true,
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'cherish',
    }
  );
};
