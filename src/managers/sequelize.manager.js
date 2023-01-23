const Sequelize = require('sequelize');
const {
  user, posts,
} = require('../models');
const config = require('../config');

const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
});

const UserModel = user(sequelize, Sequelize);
const PostsModel = posts(sequelize, Sequelize);

UserModel.hasMany(PostsModel, { foreignKey: 'user_id'});
PostsModel.belongsTo(UserModel, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  UserModel,
  PostsModel,
};
