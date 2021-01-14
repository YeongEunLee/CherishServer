module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Plant',
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      modifier: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      explanation: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      flower_meaning: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      thumbnail_image_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      gif: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'plant',
    }
  );
};
