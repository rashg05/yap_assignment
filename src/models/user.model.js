module.exports = (sequelize, Sequelize) => sequelize.define('user', {
  firstname: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  emailid: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});
