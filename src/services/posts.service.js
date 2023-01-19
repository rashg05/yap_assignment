const { sequelizeManager } = require("../managers");
const { PostsModel } = sequelizeManager;
const { error } = require('@yapsody/lib-handlers');


const addPosts = async ({ title, description, user_id }) =>
  PostsModel.create({
    title,
    description,
    user_id,
  });

const getAllPosts = async ({
  page_no,
  page_size,
  sort_by,
  sort_order,
  search,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  if (search) {
    where.user_id = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return PostsModel.findAll({
    order,
    offset,
    limit,
  });
};

const getPostById = async ({ id }) => {
  const where = {
    id,
  };

  const item = await PostsModel.findOne({
    where,
  });

  if (!item) {
    return error.throwNotFound({ custom_key: "DataNotFound", item: "user_id" });
  }
  return item;
};

module.exports = {
  addPosts,
  getAllPosts,
  getPostById,
};
