const { sequelizeManager } = require("../managers");
const { CommentsModel } = sequelizeManager;
const { comments } = require("../models");
const { STATUS } = require('../consts');


const addComments = async ({ comment, userId, postId }) => {
  const comments = await CommentsModel.create({
    comment,
    user_id: userId,
    post_id: postId,
  });
  return comments;
};

const getCommentsList = async ({
  page_no,
  page_size,
  sort_by,
  sort_order,
  userId,
  postId,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const order = [];
  order.push([sort_by, sort_order]);
  const comments = await CommentsModel.findAll({
    order,
    offset,
    limit,
    where: {
      user_id: userId,
      post_id: postId,
    },
  });

  return comments;
};

const getCommentById = async ({ userId, postId, id }) => {
  const where = {
    user_id: userId,
    post_id: postId,
    id,
  };

  const item = await CommentsModel.findOne({
    where,
  });

  if (!item) {
    return error.throwNotFound({
      custom_key: "DataNotFound",
      item: "commentId",
    });
  }
  return item;
};

const deleteOneComment = async ({ userId, postId, id, force_update }) => {
  const item = await getCommentById({
    userId,
    postId,
    id,
  });

  if (force_update) {
    return item.destroy();
  }

  if (item.status === STATUS.ENABLED) {
    return error.throwPreconditionFailed({
      message: "Enabled comment can't be deleted",
      recovery: {
        message: "do you want to force delete?",
        options: getDeleteRecoveryOptions({ comment_id: id }, true),
      },
    });
  }

  return item.destroy();
};

module.exports = {
  addComments,
  getCommentsList,
  getCommentById,
  deleteOneComment,
};
