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
        defaultValue: '',
      },
      keyword1: {
        type: DataTypes.STRING(5),
        defaultValue: '',
        allowNull: false,
      },
      keyword2: {
        type: DataTypes.STRING(5),
        defaultValue: '',
        allowNull: false,
      },
      keyword3: {
        type: DataTypes.STRING(5),
        defaultValue: '',
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'water',
    }
  );
};
