const { error, success } = require("@yapsody/lib-handlers");
const { postsService } = require("../services");
const {
  addPostsValidation,
  getListValidation,
  getId,
} = require("../validations");

const addPosts = async (req, res, next) => {
  try {
    const { title, description, user_id } =
      await addPostsValidation.validateAsync(req.body);
    const post = await postsService.addPosts({ title, description, user_id });
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
  const reqData = { ...req.query };
  if (reqData.ids) {
    reqData.ids = reqData.ids.split(";");
  }
  try {
    const { page_no, page_size, sort_by, sort_order, search } =
      await getListValidation.validateAsync(reqData);

    const posts = await postsService.getAllPosts({
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
  try {
    console.log(user_id, "------------->");
    const id = await getId.validateAsync(user_id);
    const posts = await postsService.getPostById({
      id
    });
    return success.handler({ posts }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addPosts,
  getAllPosts,
  getPostById,
};
