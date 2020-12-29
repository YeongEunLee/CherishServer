const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = require('./user')(sequelize, Sequelize);
db.Cherish = require('./cherish')(sequelize, Sequelize);
db.Plant = require('./plant')(sequelize, Sequelize);
db.Water = require('./water')(sequelize, Sequelize);

/** 1 : N User : Cherish */
db.User.hasMany(db.Cherish);
db.Cherish.belongsTo(db.User);

/** 1 : N Plant : Cherish */
db.Plant.hasMany(db.Cherish);
db.Cherish.belongsTo(db.Plant);

/** 1 : N Cherish : Water */
db.Cherish.hasMany(db.Water);
db.Water.belongsTo(db.Cherish);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
