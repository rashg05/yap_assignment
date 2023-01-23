const { error, success } = require("@yapsody/lib-handlers");
const { postsService, userService } = require("../services");
const {
  addPostsValidation,
  getListValidation,
  getId,
  recoveryParamsValidation,
  updatePostValidation,
} = require("../validations");
const { checkChanges } = require('@yapsody/lib-utils');


const addPosts = async (req, res, next) => {
  const { user_id } = req.params;
  console.log(user_id, "---------->");
  try {
    const { title, description } = await addPostsValidation.validateAsync(
      req.body
    );
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });
    const post = await postsService.addPosts({ userId, title, description });
    return success.handler({ post }, req, res, next);
  } catch (err) {
    switch (err.user_id) {
      case "SequelizeUniqueConstraintError":
        err.custom_key = "postsConflict";
        err.message = `user_id ${req.body.user_id} does not exists`;
        break;
      default:
        break;
    }
    return error.handler(err, req, res, next);
  }
};

const getAllPosts = async (req, res, next) => {
  const { user_id } = req.params;
  console.log(user_id, "---------->");
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { page_no, page_size, sort_by, sort_order, search } =
      await getListValidation.validateAsync(reqData);
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });

    const posts = await postsService.getAllPosts({
      userId,
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

const getPostById = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  console.log(user_id, "---------->");
  console.log(post_id, "------->");
  try {
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });
    const id = await getId.validateAsync(post_id);
    const posts = await postsService.getPostById({
      userId,
      id,
    });
    return success.handler({ posts }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const deleteOnePost = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  const { force_update } = req.query;
  console.log(user_id, "---------->");
  console.log(post_id, "------->");
  try {
    await recoveryParamsValidation.validateAsync(force_update);
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });
    const id = await getId.validateAsync(post_id);
    const post = await postsService.deleteOnePost({
      userId,
      id,
      force_update,
    });
    return success.handler({ post }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateOnePost = async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.params;
  const enableFlag = req.query.enable;
  console.log(user_id, "---------->");
  console.log(post_id, "------->");
  try {
    const userId = await getId.validateAsync(user_id);
    await userService.getOne({ id: user_id });
    const id = await getId.validateAsync(post_id);
    const { title, description, enable } =
      await updatePostValidation.validateAsync({
        ...req.body,
        enable: enableFlag,
      });

    if (enable === true) {
      const item = await postsService.enableOnePost({
        userId,
        id,
      });

      return success.handler({ post: item }, req, res, next);
    }

    if (enable === false) {
      const item = await postsService.disableOnePost({
        userId,
        id,
      });
      return success.handler({ post: item }, req, res, next);
    }

    let item = await postsService.getPostById({
      userId,
      id,
    });

    // eslint-disable-next-line no-unused-vars
    const difference = checkChanges(
      {
       title,
       description,
      },
      item
    );

    item.title = title !== undefined ? title : item.title;
    item.description = description !== undefined ? description : item.description;

    item = await item.save();

    return success.handler({ post: item }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addPosts,
  getAllPosts,
  getPostById,
  deleteOnePost,
  updateOnePost,
};
