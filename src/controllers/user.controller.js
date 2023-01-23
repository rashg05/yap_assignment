/* eslint-disable no-shadow */
const { error, success } = require("@yapsody/lib-handlers");
const config = require("../config/user.config.json");
const { addUserValidation, getListValidation, getId, recoveryParamsValidation, updateUserValidation } = require("../validations");
const { userService } = require("../services");
const { checkChanges } = require('@yapsody/lib-utils');
const userModel = require("../models/user.model");
const { UserModel } = require("../managers/sequelize.manager");

const getListCount = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { search } = await getListValidation.validateAsync(
      reqData
    );

    const count = await userService.getListCount({
      search,
    });
    return success.handler({ count }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};
// const getListCount = async (req, res) => {
//   const user = await userService.getListCount({})
//   res.status(200).json({data: user})
// }

const addOne = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const { firstname, lastname, emailid, password } =
      await addUserValidation.validateAsync(reqBody);

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
      case "SequelizeUniqueConstraintError":
        err.custom_key = "UserConflict";
        err.message = `User with name ${req.body.name} already exists`;
        break;
      default:
        break;
    }
    return error.handler(err, req, res, next);
  }
};

const getConfig = async (req, res, next) =>
  success.handler({ config }, req, res, next);

const getList = async (req, res, next) => {
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { page_no, page_size, sort_by, sort_order, search } =
      await getListValidation.validateAsync(reqData);

    const users = await userService.getList({
      page_no,
      page_size,
      sort_by,
      sort_order,
      search,
    });
    return success.handler({ users }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const getOne = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const id = await getId.validateAsync(userId);
    const user = await userService.getOne({
      id,
    });
    return success.handler({ user }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const deleteOne = async (req, res, next) => {
  const { userId } = req.params;
  const { force_update } = req.query;
  try {
    await recoveryParamsValidation.validateAsync(force_update);
    const id = await getId.validateAsync(userId);
    const user = await userService.deleteOne({
      id,
      force_update,
    });
    return success.handler({ user }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateOne = async (req, res, next) => {
  const { userId } = req.params;
  const enableFlag = req.query.enable;
  try {
    const id = await getId.validateAsync(userId);
    const {
      firstname,
      lastname,
      emailid,
      password,
      enable,
    } = await updateUserValidation.validateAsync({ ...req.body, enable: enableFlag });

    if (enable === true) {
      const item = await userService.enableOne({
        id,
      });

      return success.handler({ user: item }, req, res, next);
    }

    if (enable === false) {
      const item = await userService.disableOne({
        id,
      });
      return success.handler({ user: item }, req, res, next);
    }

    let item = await userService.getOne({
      id,
    });

    // eslint-disable-next-line no-unused-vars
    const difference = checkChanges({
      firstname,
      lastname,
      emailid,
      password,
    }, item);

    item.firstname = firstname !== undefined ? firstname : item.firstname;
    item.lastname = lastname !== undefined ? lastname : item.lastname;
    item.emailid = emailid !== undefined ? emailid : item.emailid;
    item.password = password !== undefined ? password : item.password;

    item = await item.save();

    return success.handler({ user: item }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  getListCount,
  addOne,
  getList,
  getConfig,
  getOne,
  deleteOne,
  updateOne,
};
