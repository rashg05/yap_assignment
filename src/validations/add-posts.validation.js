const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object().keys({
  title: yapValidations.name.required().label("Title"),
  description: yapValidations.description.required().label("Description"),
  user_id: yapValidations.id.label("User ID"),
});