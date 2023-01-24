const { sequelizeManager } = require("../managers");
const { CommentsModel } = sequelizeManager;
const { comments } = require("../models");

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
      return error.throwNotFound({ custom_key: "DataNotFound", item: "commentId" });
    }
    return item;
  };

module.exports = {
  addComments,
  getCommentsList,
  getCommentById,
};
