module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Water',
    {
      water_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT(200),
        allowNull: true,
      },
      goal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      postpone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      underscored: false,
      tableName: 'water',
    }
  );
};
