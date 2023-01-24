const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object()
  .keys({
    comment: yapValidations.description.label("Comment"),
    enable: yapValidations.enable.label("Enable"),
  })
  .min(1);
