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
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'water',
    }
  );
};
