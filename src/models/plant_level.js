module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Plant_level',
    {
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      level_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(800),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'plant_level',
    }
  );
};
