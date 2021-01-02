module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Water',
    {
      water_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      keyword1: {
        type: DataTypes.STRING(10),
      },
      keyword2: {
        type: DataTypes.STRING(10),
      },
      keyword3: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'water',
    }
  );
};
