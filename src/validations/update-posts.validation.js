const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object()
  .keys({
    title: yapValidations.name.label("Title"),
    description: yapValidations.name.label("Description"),
    enable: yapValidations.enable.label("Enable"),
  })
  .min(1);
