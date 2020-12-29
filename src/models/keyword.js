module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Keyword',
    {
      content: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'keyword',
    }
  );
};
