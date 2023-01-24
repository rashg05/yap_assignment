const Sequelize = require('sequelize');
const {
  user, posts, comments,
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
const CommentsModel = comments(sequelize, Sequelize);

UserModel.hasMany(PostsModel, { foreignKey: 'user_id'});
PostsModel.belongsTo(UserModel, { foreignKey: 'user_id' });

UserModel.hasMany(CommentsModel, { foreignKey: 'user_id'});
CommentsModel.belongsTo(UserModel, { foreignKey: 'user_id' });

PostsModel.hasMany(CommentsModel, { foreignKey: 'post_id'});
CommentsModel.belongsTo(PostsModel, { foreignKey: 'post_id' });

module.exports = {
  sequelize,
  UserModel,
  PostsModel,
  CommentsModel,
};
