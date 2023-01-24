const addUserValidation = require('./add-user.validation');
const getListValidation = require('./get-list.validation');
const getId = require('./get-id.validation');
const recoveryParamsValidation = require('./recovery-params.validations');
const updateUserValidation = require('./update-user.validation');
const addPostsValidation = require('./add-posts.validation');
const updatePostValidation = require('./update-posts.validation');
const addCommentsValidation = require('./add-comments.validation');
const updateCommentValidation = require('./update-comments.validation');

module.exports = {
  addUserValidation,
  getListValidation,
  getId,
  recoveryParamsValidation,
  updateUserValidation,
  addPostsValidation,
  updatePostValidation,
  addCommentsValidation,
  updateCommentValidation,
};
