module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Plant',
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    
      explanation: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      thumbnail_image_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'plant',
    }
  );
};
