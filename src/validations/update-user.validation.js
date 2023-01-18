const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object()
  .keys({
    firstname: yapValidations.name.label("First Name"),
    lastname: yapValidations.name.label("Last Name"),
    emailid: yapValidations.email.label("Email ID"),
    password: yapValidations.password.label("Password"),
    enable: yapValidations.enable.label("Enable"),
  })
  .min(1);