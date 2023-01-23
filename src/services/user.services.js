const { error } = require('@yapsody/lib-handlers');
const { sequelizeManager } = require("../managers");
const { STATUS } = require('../consts');
const { UserModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');
const { PostsModel } = require("../managers/sequelize.manager");

const getListCount = async ({ search }) => {
  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  return UserModel.findAll({});
};

const addOne = async ({ firstname, lastname, emailid, password }) =>
  UserModel.create({
    firstname,
    lastname,
    emailid,
    password,
  });

const getList = async ({ page_no, page_size, sort_by, sort_order, search }) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return UserModel.findAll({
    order,
    offset,
    limit,
  });
};

const getOne = async ({ id }) => {
  const where = {
    id,
  };

  const item = await UserModel.findOne({
    where,
  });

  if (!item) {
    return error.throwNotFound({ custom_key: "UserNotFound", item: "User" });
  }

  return item;
};

const deleteOne = async ({ id, force_update }) => {
  const item = await getOne({
    id,
  });

  if (force_update) {
    return item.destroy();
  }

  if (item.status === STATUS.ENABLED) {
    return error.throwPreconditionFailed({
      message: "Enabled user can't be deleted",
      recovery: {
        message: "do you want to force delete?",
        options: getDeleteRecoveryOptions({ userId: id }, true),
      },
    });
  }

  return item.destroy();
};

const enableOne = async ({ id }) => {
  const item = await getOne({
    id,
  });

  if (item.status !== STATUS.DISABLED) {
    throw error.throwPreconditionFailed({ message: 'Only disabled user can be enabled' });
  }

  item.status = STATUS.ENABLED;
  return item.save();
};

const disableOne = async ({ id }) => {
  const item = await getOne({
    id,
  });

  if (item.status !== STATUS.ENABLED) {
    throw error.throwPreconditionFailed({ message: 'Only enabled user can be disabled' });
  }

  item.status = STATUS.DISABLED;
  return item.save();
};

//connect one to many relation between user and posts
const getUserPosts = async ({ id }) => {
  if (id) {
    where.id = {
      [Op.like]: `%${id}%`,
    };
  const data =  await UserModel.findAll({
    include: [{
      model: PostsModel
    }],
    })
  }
  return data;
}

module.exports = {
  addOne,
  getList,
  getListCount,
  getOne,
  deleteOne,
  enableOne,
  disableOne,
  getUserPosts,
};
