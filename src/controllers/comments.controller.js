const { commentsService, postsService, userService } = require("../services");
const {
  addCommentsValidation,
  getId,
  getListValidation,
  recoveryParamsValidation,
  updateCommentValidation,
} = require("../validations");
const { error, success } = require("@yapsody/lib-handlers");
const { checkChanges } = require('@yapsody/lib-utils');

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
    const { page_no, page_size, sort_by, sort_order } =
      await getListValidation.validateAsync(reqData);
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });

    const postId = await getId.validateAsync(post_id);
    await postsService.getPostById({ userId, id: post_id });

    const comments = await commentsService.getCommentsList({
      userId,
      postId,
      page_no,
      page_size,
      sort_by,
      sort_order,
    });
    return success.handler({ comments }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const getCommentById = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  const { comment_id } = req.params;
  console.log(user_id, "-------->");
  console.log(post_id, "-------->");
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });

    const postId = await getId.validateAsync(post_id);
    await postsService.getPostById({ userId, id: post_id });

    const id = await getId.validateAsync(comment_id);
    const comment = await commentsService.getCommentById({
      userId,
      postId,
      id,
    });
    return success.handler({ comment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const deleteOneComment = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  const { comment_id } = req.params;
  const { force_update } = req.query;
  console.log(user_id, "---------->");
  console.log(post_id, "---------->");
  try {
    await recoveryParamsValidation.validateAsync(force_update);
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });
    const postId = await getId.validateAsync(post_id);
    await postsService.getPostById({userId, id: post_id});
    const id = await getId.validateAsync(comment_id);
    const comment = await commentsService.deleteOneComment({
      userId,
      postId,
      id,
      force_update,
    });
    return success.handler({ comment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateOneComment = async (req, res, next) => {
    const { user_id } = req.params;
    const { post_id } = req.params;
    const { comment_id }  = req.params;
    const enableFlag = req.query.enable;
    console.log(user_id, "---------->");
    console.log(post_id, "------->");
    console.log(comment_id, "-------->");
    try {
      const userId = await getId.validateAsync(user_id);
      await userService.getOne({ id: user_id });
      const postId = await getId.validateAsync(post_id);
      await postsService.getPostById({ userId, id: post_id });

      const id = await getId.validateAsync(comment_id);
      const { comment, enable } =
        await updateCommentValidation.validateAsync({
          ...req.body,
          enable: enableFlag,
        });
  
      if (enable === true) {
        const item = await commentsService.enableOneComment({
          userId,
          postId,
          id,
        });
  
        return success.handler({ comment: item }, req, res, next);
      }
  
      if (enable === false) {
        const item = await commentsService.disableOneComment({
          userId,
          postId,
          id,
        });
        return success.handler({ comment: item }, req, res, next);
      }
  
      let item = await commentsService.getCommentById({
        userId,
        postId,
        id,
      });
  
      // eslint-disable-next-line no-unused-vars
      const difference = checkChanges(
        {
         comment,
        },
        item
      );
  
      item.comment = comment !== undefined ? comment : item.comment;
  
      item = await item.save();
  
      return success.handler({ comment: item }, req, res, next);
    } catch (err) {
      return error.handler(err, req, res, next);
    }
  };

module.exports = {
  addComments,
  getCommentsList,
  getCommentById,
  deleteOneComment,
  updateOneComment,
};
