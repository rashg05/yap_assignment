const addUserValidation = require('./add-user.validation');
const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const recoveryParamsValidation = require('./recovery-params.validations');
const updateUserValidation = require('./update-user.validation');

module.exports = {
  addUserValidation,
  getListValidation,
  getId,
  recoveryParamsValidation,
  updateUserValidation,
};
