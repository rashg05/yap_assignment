/* eslint-disable no-shadow */
const { error, success } = require('@yapsody/lib-handlers');
const config = require('../config/user.config.json');
const {
  addUserValidation,
} = require('../validations');
const { userService } = require('../services');

const getConfig = async (req, res, next) => success.handler({ config }, req, res, next);

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const {
      firstname,
      lastname,
      emailid,
      password,
    } = await addUserValidation.validateAsync(reqBody);

    const user = await userService.addOne({
      firstname,
      lastname,
      emailid,
      password,
    });
    return success.handler({ user }, req, res, next);
  } catch (err) {
    console.error(err);
    switch (err.name) {
      case 'SequelizeUniqueConstraintError':
        err.custom_key = 'UserConflict';
        err.message = `User with name ${req.body.name} already exists`;
        break;
      default:
        break;
    }
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addOne,
  getConfig,
};
