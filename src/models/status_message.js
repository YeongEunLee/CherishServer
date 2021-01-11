module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Status_message',
    {
      day: {
        type: DataTypes.INTEGER,
      },
      message: {
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: true,
      tableName: 'status_message',
    }
  );
};
