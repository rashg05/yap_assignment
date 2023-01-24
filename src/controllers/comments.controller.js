const { commentsService, postsService, userService } = require("../services");
const { addCommentsValidation, getId, getListValidation } = require("../validations");
const { error, success } = require("@yapsody/lib-handlers");

const addComments = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  console.log(user_id, "---------->");
  console.log(post_id, "---------->");
  try {
    const { comment } = await addCommentsValidation.validateAsync(req.body);
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });

    const postId = await getId.validateAsync(post_id);
    await postsService.getPostById({ id: post_id, userId });

    const comments = await commentsService.addComments({
      userId,
      postId,
      comment,
    });
    return success.handler({ comments }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const getCommentsList = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  console.log(user_id, "-------->");
  console.log(post_id, "-------->");
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { page_no, page_size, sort_by, sort_order, search } =
      await getListValidation.validateAsync(reqData);
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });

    const postId = await getId.validateAsync(post_id);
    await postsService.getPostById({userId, id: post_id});

    const posts = await commentsService.getCommentsList({
      userId,
      postId,
      page_no,
      page_size,
      sort_by,
      sort_order,
      search,
    });
    return success.handler({ posts }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addComments,
  getCommentsList,
};
