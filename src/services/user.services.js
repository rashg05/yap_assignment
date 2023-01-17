const { sequelizeManager } = require('../managers');

const { UserModel } = sequelizeManager;

const getListCount = async ({
   search,
}) => {

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  return UserModel.findAll({});
};

const addOne = async ({
  firstname, lastname, emailid, password,
}) => UserModel.create({
  firstname,
  lastname,
  emailid,
  password,
});

const getList = async ({
  page_no, page_size, sort_by, sort_order, search,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return UserModel.findAll({
    order,
    offset,
    limit,
  });
};

const getOne = async ({ id }) => {
  const where = {
    id,
  };

  const item = await UserModel.findOne({
    where
  });

  if (!item) {
    return error.throwNotFound({ custom_key: 'NoteNotFound', item: 'User' });
  }

  return item;
};

module.exports = {
  addOne,
  getList,
  getListCount,
  getOne,
};
