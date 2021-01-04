module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Plant_level',
    {
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'plant_level',
    }
  );
};
