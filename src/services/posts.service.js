const { sequelizeManager } = require("../managers");
const { PostsModel } = sequelizeManager;
const { error } = require("@yapsody/lib-handlers");
const { posts } = require("../models");
const { STATUS } = require('../consts');


const addPosts = async ({ title, description, userId }) => {
  const post = await PostsModel.create({
    title,
    description,
    user_id: userId,
  });
  return post;
};

const getAllPosts = async ({
  page_no,
  page_size,
  sort_by,
  sort_order,
  search,
  userId,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  // const id = await PostsModel.findOne({
  //   where: {
  //     user_id: userId,
  //   },
  // });

  // if (search) {
  //   where.id = {
  //     [Op.like]: `%${search}%`,
  //   };
  // }

  const order = [];
  order.push([sort_by, sort_order]);
  const posts = await PostsModel.findAll({
    order,
    offset,
    limit,
    where: {
      user_id: userId,
    },
  });

  return posts;
};

const getPostById = async ({ userId, id }) => {
  const where = {
    user_id: userId,
    id,
  };

  const item = await PostsModel.findOne({
    where,
  });

  if (!item) {
    return error.throwNotFound({ custom_key: "DataNotFound", item: "postId" });
  }
  return item;
};

const deleteOnePost = async ({ userId, id, force_update }) => {
  const item = await getPostById({
    userId,
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
        options: getDeleteRecoveryOptions({ post_id: id }, true),
      },
    });
  }

  return item.destroy();
};

module.exports = {
  addPosts,
  getAllPosts,
  getPostById,
  deleteOnePost,
};
