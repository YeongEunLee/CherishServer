module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Plant',
    {
      image_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      explanation: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: false,
      tableName: 'plant',
    }
  );
};
