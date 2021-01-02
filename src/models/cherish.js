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
        allowNull: false,
      },
      cycle_date: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      water_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      postpone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notice_time: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      status_code: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'cherish',
    }
  );
};
