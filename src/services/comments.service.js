const { sequelizeManager } = require("../managers");
const { CommentsModel } = require("../models");

const addComments = async ({ comment, userId, postId }) => {
  const comments = await CommentsModel.create({
    comment,
    user_id: userId,
    post_id: postId,
  });
  return comments;
};

module.exports = {
  addComments,
};
