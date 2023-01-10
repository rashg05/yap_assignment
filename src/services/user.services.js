const { error } = require('@yapsody/lib-handlers');
const yapUtil = require('@yapsody/lib-utils');
const { Op } = require('sequelize');
const { STATUS } = require('../consts');
const { sequelizeManager } = require('../managers');

const { NoteModel } = sequelizeManager;
const { recoveryOptionsUtils: { getDeleteRecoveryOptions } } = require('../utils');

const getListCount = async ({
  account_id, status, search, ids,
}) => {
  const where = {
    account_id,
  };

  if (status) {
    where.status = status;
  }

  if (ids) {
    where.id = ids;
  }

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  return NoteModel.count({
    where,
  });
};

const getList = async ({
  account_id, page_no, page_size, status, sort_by, sort_order, search, ids,
}) => {
  const limit = page_size;
  const offset = (page_no - 1) * limit;

  const where = {
    account_id,
  };

  if (ids) {
    where.id = ids;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const order = [];
  order.push([sort_by, sort_order]);

  return NoteModel.findAll({
    where,
    order,
    offset,
    limit,
  });
};

const getOne = async ({ account_id, id }) => {
  const where = {
    account_id,
    id,
  };

  const item = await NoteModel.findOne({
    where,
  });

  if (!item) {
    return error.throwNotFound({ custom_key: 'NoteNotFound', item: 'Note' });
  }

  return item;
};

const addOne = async ({ account_id, name, description }) => NoteModel.create({
  account_id,
  name,
  description,
});

const enableOne = async ({ id, account_id }) => {
  const item = await getOne({
    id,
    account_id,
  });

  if (item.status !== STATUS.DISABLED) {
    throw error.throwPreconditionFailed({ message: 'Only disabled note can be enabled' });
  }

  item.status = STATUS.ENABLED;
  item.version += 1;
  return item.save();
};

const disableOne = async ({ id, account_id }) => {
  const item = await getOne({
    id,
    account_id,
  });

  if (item.status !== STATUS.ENABLED) {
    throw error.throwPreconditionFailed({ message: 'Only enabled note can be disabled' });
  }

  item.status = STATUS.DISABLED;
  item.version += 1;
  return item.save();
};

const deleteOne = async ({ account_id, id, force_update }) => {
  const item = await getOne({
    account_id,
    id,
  });

  if (force_update) {
    return item.destroy();
  }

  if (item.status === STATUS.ENABLED) {
    return error.throwPreconditionFailed({
      message: 'Enabled note can\'t be deleted',
      recovery: {
        message: 'do you want to force delete?',
        options: getDeleteRecoveryOptions({ noteId: id }, true),
      },
    });
  }

  return item.destroy();
};

const suggestCopyName = async ({ account_id, id, name }) => {
  const where = {
    account_id,
    name: {
      [Op.like]: `${name}%`,
    },
    id: {
      [Op.ne]: id,
    },
  };

  const items = await NoteModel.findAll({
    where,
  });

  const existingNames = items.map((item) => item.name);

  return yapUtil.suggestCopyName({
    name,
    existingNames,
    maxLength: 255,
  });
};

const copyNote = async ({ account_id, id }) => {
  const note = await getOne({ account_id, id });
  const copyName = await suggestCopyName({ account_id, id, name: note.name });
  const copiedNote = await addOne({
    account_id,
    name: copyName,
    description: note.description,
  });

  return copiedNote;
};

module.exports = {
  getListCount,
  getList,
  getOne,
  addOne,
  enableOne,
  disableOne,
  deleteOne,
  suggestCopyName,
  copyNote,
};