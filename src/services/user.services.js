const { sequelizeManager } = require('../managers');

const { UserModel } = sequelizeManager;

const addOne = async ({
  firstname, lastname, emailid, password,
}) => UserModel.create({
  firstname,
  lastname,
  emailid,
  password,
});

module.exports = {
  addOne,
};
