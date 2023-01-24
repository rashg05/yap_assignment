const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object().keys({
  comment: yapValidations.description.required().label("Comment"),
  user_id: yapValidations.id.label("User ID"),
  post_id: yapValidations.id.label("Post ID"),
});