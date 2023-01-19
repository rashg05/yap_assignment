module.exports = (sequelize, Sequelize) =>
  sequelize.define('posts', {
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(255),
    },
    user_id: {
        type: Sequelize.STRING(255),
    }
  });
