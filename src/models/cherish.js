module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Cherish',
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      cycle_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notice_time: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'cherish',
    }
  );
};
