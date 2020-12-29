const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Cherish = require('./cherish')(sequelize, Sequelize);
db.Plant = require('./plant')(sequelize, Sequelize);
db.Water = require('./water')(sequelize, Sequelize);
db.Plant_status = require('./plant_status')(sequelize, Sequelize);
db.Keyword = require('./keyword')(sequelize, Sequelize);

/** 1 : N User : Cherish */
db.User.hasMany(db.Cherish);
db.Cherish.belongsTo(db.User);

/** 1 : N Plant : Cherish */
db.Plant.hasMany(db.Cherish);
db.Cherish.belongsTo(db.Plant);

/** 1 : N Cherish : Water */
db.Cherish.hasMany(db.Water);
db.Water.belongsTo(db.Cherish);

module.exports = db;
