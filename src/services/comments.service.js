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
    search,
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

module.exports = {
  addComments,
  getCommentsList,
};
