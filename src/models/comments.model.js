module.exports = (sequelize, Sequelize) =>
  sequelize.define('comments', {
    comment: {
      type: Sequelize.STRING(255),
    },
    user_id: {
      type: Sequelize.STRING(255),
    },
    post_id: {
        type: Sequelize.STRING(255),
    },
    reply: {
      type: Sequelize.STRING(255),
    },
    parent_id: {
      type: Sequelize.STRING(255),
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
